# Backend Architecture - Adventurer

## 🛠️ Technology Stack

- **Core Framework:** Python Flask
- **Database:** Google Firebase Admin SDK (Firestore document database)
- **Authentication:** Google OAuth (`google-auth`, `google-auth-oauthlib`), Flask-Bcrypt, Flask-Session
- **Artificial Intelligence:** Google Generative AI (`gemini-2.0-flash`)
- **Geo-Location:** Geopy (`Nominatim`, `geodesic`), IP-based lookup (`ipapi.co`)
- **CORS Management:** Flask-CORS

## 📂 Application Structure

The backend rests inside the `server/` directory and encapsulates two primary files:

1. **`server.py`:**
   - Initializes Flask, CORS, Firebase, and routes.
   - Manages all endpoints for user authentication, OAuth callbacks, database retrieval, chatbot AI completions, and contact mechanisms.
2. **`locationRecc.py`:**
   - Defines a `LocationRecommender` class.
   - Handles the robust resolution of a user’s geographic coordinates (either from the browser payload or IP-fallback).
   - Computes minimum straight-line geodesic distances to query the `Famous_Places` list and return nearby tourist spots.

## 🗄️ Database Schema (Firestore)

The backend interacts with several key collections in Cloud Firestore:

### 1. `users`
Tracks both locally registered users via Email/PW and standard OAuth accounts.
- `id` (String - Document ID)
- `email` (String)
- `password` (String - Bcrypt Hashed)
- `name` (String)
- `profile_picture` (String URL - Fetched from Google Auth)
- `google_auth` (Boolean)
- `created_at` (Timestamp)
- `last_login` / `last_logout` (Timestamp)

### 2. `Famous_Places`
Maintains geographical and contextual data about destinations for algorithmic recommendation.
- `Place_Name` (String)
- `Description` (String)
- `latitude` (Float)
- `longitude` (Float)
- `rating` (Number)

### 3. `contact_submissions`
Store metrics submitted via the application's support forms.
- `firstName`, `lastName`, `email`, `message` (Strings)
- `submitted_at` (Timestamp)

### 4. `Blogs`
Stores rich text, visual URIs, and metadata for user-created / curated travel blog content.

## 🔗 Key Endpoints & APIs

**Authentication:** 
- `POST /register`, `POST /login`, `POST /logout`
- `GET /google/login`, `GET /google/callback`
- `GET /me`

**Profile API:**
- `GET /api/user/profile`
- `PUT /api/user/profile`

**Recommender Tools & AI:**
- `POST /api/nearby-spots` 
  - Submits coordinates payload for computing geodesic spatial bounds relative to destination points.
- `POST /chatbot`
  - Passes the input `message` inside a JSON body to the `gemini-2.0-flash` generative model and pipes the text candidate directly to the React frontend.
