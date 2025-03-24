from flask import Flask, request, jsonify, session, redirect, abort, render_template
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.generativeai as genai
import google.auth.transport.requests
from google.auth.transport import requests as google_requests
import os
import pathlib
import requests
import json
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
from locationRecc import LocationRecommender, create_flask_routes

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]

cred = credentials.Certificate('firebase_key.json')
firebase_admin.initialize_app(cred)
db_firebase = firestore.client()

location_recommender = LocationRecommender(db_firebase)
create_flask_routes(app, db_firebase)

clientSecretjson = json.load(open("client_secret.json"))
clientSecretjson_web = clientSecretjson["web"]
GOOGLE_CLIENT_ID = clientSecretjson_web["client_id"]
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"  # Remove this in production

bcrypt = Bcrypt(app)
CORS(app, origins=["http://localhost:*"], supports_credentials=True)

# Initialize Google OAuth flow
flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid"
    ],
    redirect_uri="http://localhost:5000/google/callback"
)

def save_user_to_firebase(user_data):
    """Save user data to Firebase"""
    users_ref = db_firebase.collection('users')
    users_ref.document(user_data['id']).set({
        'email': user_data['email'],
        'password': user_data['password'],  # Store hashed password
        'created_at': datetime.now(),
        'last_login': datetime.now()
    })

def update_user_login_time(user_id):
    """Update user's last login time"""
    users_ref = db_firebase.collection('users')
    users_ref.document(user_id).update({
        'last_login': datetime.now()
    })

def get_user_by_email(email):
    """Retrieve user by email from Firebase"""
    users_ref = db_firebase.collection('users')
    query = users_ref.where('email', '==', email).limit(1).stream()

    for doc in query:
        user_data = doc.to_dict()
        user_data['id'] = doc.id  # Add the document ID to the user data
        return user_data

    return None  # Return None if no user is found

# Regular email/password routes
@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    # Check if user already exists
    user_exists = get_user_by_email(email)
    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    # Hash password and save user to Firebase
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user_data = {
        'id': str(hash(email)),  # Generate a unique ID (you can use UUID if preferred)
        'email': email,
        'password': hashed_password
    }
    save_user_to_firebase(user_data)

    session["user_id"] = user_data['id']
    return jsonify({"id": user_data['id'], "email": user_data['email']})

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    # Retrieve user from Firebase
    user = get_user_by_email(email)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    # Check if the password matches
    if not bcrypt.check_password_hash(user['password'], password):
        return jsonify({"error": "Unauthorized"}), 401

    # Update last login time in Firebase
    update_user_login_time(user['id'])

    session["user_id"] = user['id']
    return jsonify({"id": user['id'], "email": user['email']})

# Google OAuth routes
@app.route("/google/login")
def google_login():
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true',
        prompt='consent'
    )
    session["state"] = state
    return jsonify({"url": authorization_url})

@app.route("/google/callback")
def google_callback():
    try:
        flow.fetch_token(authorization_response=request.url)

        if not session.get("state") == request.args.get("state", None):
            abort(500, "State mismatch in OAuth callback")

        credentials = flow.credentials
        request_session = requests.session()
        cached_session = cachecontrol.CacheControl(request_session)
        token_request = google_requests.Request(session=cached_session)

        id_info = id_token.verify_oauth2_token(
            id_token=credentials._id_token,
            request=token_request,
            audience=GOOGLE_CLIENT_ID
        )

        email = id_info.get("email")
        if not email:
            abort(400, "Email not provided by Google")

        user = get_user_by_email(email)
        if not user:
            hashed_password = bcrypt.generate_password_hash("GOOGLE_AUTH_USER").decode('utf-8')
            user_data = {
                'id': str(hash(email)),  # Generate a unique ID
                'email': email,
                'password': hashed_password,
                'google_auth': True
            }
            save_user_to_firebase(user_data)
            user = user_data
        else:
            update_user_login_time(user['id'])

        session["user_id"] = user['id']
        return redirect("http://localhost:5173/post-login-homepage")

    except Exception as e:
        print(f"Google OAuth error: {str(e)}")
        return redirect("http://localhost:5173/login?error=google_auth_failed")

@app.route("/api/user/profile", methods=["GET"])
def get_user_profile():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user_doc = db_firebase.collection('users').document(user_id).get()
    if user_doc.exists:
        user_data = user_doc.to_dict()
        return jsonify(user_data)
    return jsonify({"error": "User not found"}), 404

@app.route("/api/user/profile", methods=["PUT"])
def update_user_profile():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    update_data = request.json

    users_ref = db_firebase.collection('users')
    users_ref.document(user_id).update(update_data)

    return jsonify({"message": "Profile updated successfully"})

@app.route("/me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user_doc = db_firebase.collection('users').document(user_id).get()
    if user_doc.exists:
        user_data = user_doc.to_dict()
        return jsonify({
            "id": user_data['id'],
            "email": user_data['email']
        })
    return jsonify({"error": "User not found"}), 404

@app.route("/logout", methods=["POST"])
def logout_user():
    user_id = session.get("user_id")
    if user_id:
        users_ref = db_firebase.collection('users')
        users_ref.document(user_id).update({
            'last_logout': datetime.now()
        })

    session.clear()
    return "200"

@app.route('/blog', methods=["GET"])
def get_data():
    try:
        docs = db_firebase.collection('Blogs').stream()
        return jsonify({doc.id: doc.to_dict() for doc in docs})
    except Exception as e:
        print(f"Error fetching data: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/chatbot", methods=["POST"])
def chatbot():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(user_input)

        bot_reply = None
        if hasattr(response, "text"):
            bot_reply = response.text
        elif hasattr(response, "candidates") and response.candidates:
            bot_reply = response.candidates[0].content.parts[0].text
        else:
            bot_reply = "I couldn't understand."

        return jsonify({"response": bot_reply})

    except Exception as e:
        print(f"Chatbot error: {str(e)}")
        return jsonify({"error": "AI service error"}), 500

@app.route("/contact", methods=["POST"])
def submit_contact_form():
    try:
        form_data = request.json

        form_data['submitted_at'] = datetime.now()

        contact_ref = db_firebase.collection('contact_submissions')
        contact_ref.add({
            'firstName': form_data.get('firstName'),
            'lastName': form_data.get('lastName'),
            'email': form_data.get('email'),
            'message': form_data.get('message'),
            'submitted_at': form_data.get('submitted_at')
        })

        return jsonify({"message": "Form submitted successfully"}), 200

    except Exception as e:
        print(f"Error saving contact form: {str(e)}")
        return jsonify({"error": "Failed to submit form"}), 500

import threading
import time

def display_nearby_locations():
    """Display recommended locations in the terminal every 10 seconds"""
    while True:
        try:
            # Use a default location if needed
            default_location = {'latitude': 28.6139, 'longitude': 77.2090}  # Delhi, India (closer to your sample data)

            all_spots = location_recommender.get_tourist_spots()
            print(f"\nNumber of spots in database: {len(all_spots)}")

            spots = location_recommender.find_nearby_spots(default_location)

            print("\n--- Recommended Locations ---")
            if not spots:
                print("No nearby spots found.")
            else:
                for i, spot in enumerate(spots, 1):
                    print(f"{i}. {spot.get('name', 'Unnamed Location')} ({spot.get('location', 'Unknown location')})")

            time.sleep(10)  # Wait for 10 seconds
        except Exception as e:
            print(f"Error displaying locations: {str(e)}")
            time.sleep(10)  # Wait even if there's an error

# Start the background thread after app initialization
location_display_thread = threading.Thread(target=display_nearby_locations, daemon=True)
location_display_thread.start()

if __name__ == "__main__":
    app.run(debug=True)
