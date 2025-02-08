from flask import Flask, request, jsonify, session, redirect, abort, url_for
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from config import ApplicationConfig
from models import db, User
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
from google.auth.transport import requests as google_requests
import os
import pathlib
import requests
import json
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# Initialize Firebase
cred = credentials.Certificate('firebase_key.json')
firebase_admin.initialize_app(cred)
db_firebase = firestore.client()

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

clientSecretjson = json.load(open("client_secret.json"))
clientSecretjson_web = clientSecretjson["web"]

# Google OAuth Configuration
GOOGLE_CLIENT_ID = clientSecretjson_web["client_id"]
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"  # Remove this in production

# Initialize Flask extensions
bcrypt = Bcrypt(app)
CORS(app, origins=["http://localhost:*"], supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

# Gemini API Key (Store this in a `.env` file in production)
GEMINI_API_KEY =  os.getenv("GEMINI_API_KEY")
# Gemini API URL for text generation
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText"

@app.route("/chat", methods=["POST"])
def chat_with_gemini():
    user_input = request.json.get("message", "")

    if not user_input:
        return jsonify({"error": "Message cannot be empty"}), 400

    try:
        payload = {
            "prompt": user_input
        }
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {GEMINI_API_KEY}"
        }

        response = requests.post(GEMINI_API_URL, json=payload, headers=headers)
        data = response.json()

        if "candidates" in data and data["candidates"]:
            reply = data["candidates"][0].get("output", "I'm not sure how to respond to that.")
        else:
            reply = "I'm unable to generate a response at the moment."

        return jsonify({"reply": reply})

    except Exception as e:
        print(f"Error in Gemini API call: {e}")
        return jsonify({"error": "Failed to fetch response from Gemini"}), 500

# Firebase helper functions
def save_user_to_firebase(user_data):
    """Save user data to Firebase"""
    users_ref = db_firebase.collection('users')
    users_ref.document(user_data['id']).set({
        'email': user_data['email'],
        'created_at': datetime.now(),
        'last_login': datetime.now()
    })

def update_user_login_time(user_id):
    """Update user's last login time"""
    users_ref = db_firebase.collection('users')
    users_ref.document(user_id).update({
        'last_login': datetime.now()
    })

# Regular email/password routes
@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    # Save to Firebase
    user_data = {
        'id': new_user.id,
        'email': new_user.email
    }
    save_user_to_firebase(user_data)

    session["user_id"] = new_user.id
    return jsonify({"id": new_user.id, "email": new_user.email})

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()
    if user is None or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    update_user_login_time(user.id)

    session["user_id"] = user.id
    return jsonify({"id": user.id, "email": user.email})

# Google OAuth routes
flow = Flow.from_client_secrets_file(
    client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
    redirect_uri="http://localhost:5000/google/callback"
)

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

        user = User.query.filter_by(email=email).first()
        if not user:
            new_user = User(email=email, password=bcrypt.generate_password_hash("GOOGLE_AUTH_USER").decode('utf-8'))
            db.session.add(new_user)
            db.session.commit()
            user = new_user

            user_data = {'id': user.id, 'email': user.email, 'google_auth': True}
            save_user_to_firebase(user_data)
        else:
            update_user_login_time(user.id)

        session["user_id"] = user.id
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
        return jsonify(user_doc.to_dict())
    return jsonify({"error": "User not found"}), 404

@app.route("/api/user/profile", methods=["PUT"])
def update_user_profile():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    update_data = request.json
    db_firebase.collection('users').document(user_id).update(update_data)
    return jsonify({"message": "Profile updated successfully"})

@app.route("/logout", methods=["POST"])
def logout_user():
    user_id = session.get("user_id")
    if user_id:
        db_firebase.collection('users').document(user_id).update({'last_logout': datetime.now()})
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

@app.route('/travelcategories', methods=["GET"])
def get_travel_categories():
    try:
        docs = db_firebase.collection('Travel_Categories').stream()
        return jsonify([doc.to_dict() for doc in docs])
    except Exception as e:
        print(f"Error fetching travel categories: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
