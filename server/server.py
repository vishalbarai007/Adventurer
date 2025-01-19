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
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
server_session = Session(app)
db.init_app(app)

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

with app.app_context():
    db.create_all()

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

    session["user_id"] = new_user.id
    return jsonify({"id": new_user.id, "email": new_user.email})

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()
    if user is None or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id
    return jsonify({"id": user.id, "email": user.email})

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

        # Check if user exists, if not create new user
        user = User.query.filter_by(email=email).first()
        if not user:
            # Create new user with Google info
            new_user = User(
                email=email,
                # Use a placeholder password for Google authenticated users
                password=bcrypt.generate_password_hash("GOOGLE_AUTH_USER").decode('utf-8')
            )
            db.session.add(new_user)
            db.session.commit()
            user = new_user

        session["user_id"] = user.id
        return redirect("http://localhost:5173/post-login-homepage")

    except Exception as e:
        print(f"Google OAuth error: {str(e)}")
        return redirect("http://localhost:3000/login?error=google_auth_failed")

@app.route("/me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id", None)
    return "200"

if __name__ == "__main__":
    app.run(debug=True)
