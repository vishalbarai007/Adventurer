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
- `role` (String: `traveler`, `organizer`, `vendor`)
- `businessDetails` (Object - Exists if role is organizer/vendor)
  - `companyName`, `gstNumber`, `isVerified`
- `name` (String)
- `profile_picture` (String URL - Fetched from Google Auth)
- `google_auth` (Boolean)
- `created_at` (Timestamp)

### 2. `listings`
Primary product/service collection for multi-tenant organizations.
- `listingId`, `organizerId`
- `type` (`trek`, `villa`, `tour`)
- `title`, `price`
- `location` { latitude, longitude }
- `slots` (Number)

### 3. `posts`
Social feed content collection.
- `postId`, `authorId`, `authorName`
- `mediaUrl`, `caption`
- `locationTag` (String reference to Famous_Place)
- `locationCoords` { latitude, longitude }
- `likes` (Array of userIds)

### 4. `chats` (Parent) & `messages` (Sub-collection)
Real-time messaging architecture.
- `chats/{chatId}/`
  - `participants` (Array of [traveler_uid, organizer_uid])
  - `updatedAt` (Timestamp)
- `chats/{chatId}/messages/{msgId}/`
  - `senderId`, `text`, `timestamp`

---

## 🔗 Key Endpoints & APIs

**Authentication & Roles:** 
- `POST /register`, `POST /login` (supports RBAC persistence)
- `GET /google/login`, `GET /google/callback`

**Business & Listings:**
- `GET /api/my-listings` - Fetches trips scoped to the authenticated Organizer.
- `POST /api/listings` - Creates a new trip/accommodation document.

**Social & Explore:**
- `GET /api/posts` - Retrieve global feed with reverse-chronological ordering.
- `POST /api/posts` - Submit user-generated content with location tagging.
- `POST /api/nearby-spots` - Integrated with `locationRecc.py` to suggest tags.

**Real-Time Communications:**
- Directly handled via **Firebase Web SDK** on the client side using Firestore listeners for lower latency.
