from flask import Flask, request, jsonify, session, redirect, abort
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from config import ApplicationConfig
from models import db, User
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
import os
import pathlib
import requests
import json

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
app.secret_key = "Adventurer"  # Make sure this is secure in production

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
    scopes=["https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "openid"],
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
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return jsonify({"url": authorization_url})

@app.route("/google/callback")
def google_callback():
    flow.fetch_token(authorization_response=request.url)

    if not session["state"] == request.args["state"]:
        abort(500)

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    # Check if user exists, if not create new user
    email = id_info.get("email")
    user = User.query.filter_by(email=email).first()

    if not user:
        # Create new user with Google info
        new_user = User(
            email=email,
            password=None  # Google authenticated users don't need a password
        )
        db.session.add(new_user)
        db.session.commit()
        user = new_user

    session["user_id"] = user.id
    return redirect("http://localhost:3000/post-login-homepage")

@app.route("/logout", methods=["POST"])
def logout_user():
    session.clear()
    return "200"

if __name__ == "__main__":
    app.run(debug=True)
