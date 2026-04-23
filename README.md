# Adventurer - Travel & Tourism Platform 🌍
**Adventurer** is a comprehensive, full-stack tour, travel, and trekking platform designed to provide detailed information, interactive tools, and engaging content for adventure enthusiasts. Plan your destination with ease!
---
## 📚 Technical Documentations
- 🖥️ [**Frontend Architecture Guide** (`frontend.md`)](./frontend.md)
- ⚙️ [**Backend Architecture & Database Guide** (`backend.md`)](./backend.md)
---
## 🛠️ Tech Stack  
### Frontend
---
## 🚀 Installation & Setup
## 🚀 Installation & Complete Setup
To ensure you can successfully test the app locally, closely follow these step-by-step instructions.
### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18+)
- [Python 3.8+](https://www.python.org/)
- Firebase Service Account Key & Google OAuth Credentials
- [Node.js](https://nodejs.org/en/) (v18+) and `npm`
- [Python 3.9+](https://www.python.org/)
- **API Keys / Secrets Required**:
  - `firebase_key.json` (Firebase Admin SDK Service Account credentials)
  - `client_secret.json` (Google OAuth 2.0 Web Client credentials)
  - Gemini AI API Key (Set in a local `.env`)
### 1. Clone the repository
```bash
git clone https://github.com/vishalbarai007/Adventurer.git
cd Adventurer
```
### 2. Backend Setup (Flask Server)
### 2. Backend Setup (Flask Server & Firebase)
You must spin up the Python server before the frontend otherwise network calls and auth logic will crash. 
The backend connects directly to Firestore and Google APIs.
```bash
cd server
# Create a virtual environment
# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
# Install requirements
# Install all backend dependencies
pip install -r requirements.txt
```
**Environment Variables:**
Ensure you place your `firebase_key.json` and `client_secret.json` in the `/server` directory. Configure your `.env` file for backend keys.
```env
FLASK_APP=server.py
FLASK_ENV=development
**Environment Variables & Secrets Layout:**
Inside your `server/` directory, ensure you have meticulously placed the required API secrets.
```text
server/
├── .env                  # Containing SECRET_KEY=... and GEMINI API keys
├── firebase_key.json     # From Firebase Console -> Project Settings -> Service Accounts -> Generate New Private Key
└── client_secret.json    # Installed from Google Cloud Console under APIs & Services (OAuth IDs)
```
**Run Server:**
```bash
python server.py
# The server will run on http://localhost:5000
# The server will initiate at http://localhost:5000 (proxied by the frontend)
```
### 3. Frontend Setup (Vite React App)
Open a new terminal tab from the root repository folder:
Once your backend is running independently, open a **new terminal tab** from your root project folder:
```bash
cd frontend
npm install
```
**Run Frontend:**
```bash
# Install all required React and Vite dependencies
npm install 
# If you experience dependency mismatch issues (unlikely with Vite), verify legacy peer dependencies setup via npm config
npm run dev
# The app will run on http://localhost:5173
```
**Running Locally:**
After compilation, the system provides a localhost link. Visit `http://localhost:5173` to interact with your frontend app.
---
## ✨ New Features & Key Functionalities
The platform has recently been expanded to include enterprise-grade features for multi-tenant interactions and real-time social engagement:

### 💼 Multi-Tenant Backbone & Dashboard
- **Role-Based Access Control (RBAC)**: Support for `traveler`, `organizer`, and `vendor` roles.
- **Business Dashboard**: A centralized hub for organizers/vendors to manage their trip listings and communicate with customers.
- **Listing Management**: CRUD operations for treks and property listings directly from the UI.
- **Route**: [`/dashboard`](http://localhost:5173/dashboard)

### 💬 Real-Time 1:1 Chat System
- **Live Messaging**: Fully synchronized 1:1 chat powered by Firestore `onSnapshot`.
- **Premium UI/UX**: Animated message bubbles with spring physics using `framer-motion`.
- **Inquiry Handshake**: Seamless transition from viewing a trek to contacting the organizer.
- **Route**: [`/chat/:chatId`](http://localhost:5173/chat/example_chat_id)

### 📸 Social Explore & Location Tagging
- **Dynamic Feed**: Toggle between standard list view and a sleek Instagram-style Explore grid.
- **Deep Location Integration**: Suggests nearby "Famous Places" using browser geolocation and custom recommendation logic.
- **Map Modal**: Click on any explore tile to view the photo along with an interactive OpenStreetMap popup centering on the location.
- **Viral Share**: Integrated Web Share API for native mobile/desktop sharing of posts and trips.
- **Route**: [`/`](http://localhost:5173/) (Posts section)

### 🗺️ Trek Details & Inquiries
- **Direct Handshake**: New immersive detail view for trips with a high-conversion inquiry button.
- **Route**: [`/destinations/dummy-trek`](http://localhost:5173/destinations/dummy-trek)

---
## 📂 Project Structure  
```text
Adventurer/
├── frontend.md           # Documentation for UI configuration
├── backend.md            # Documentation for Database & APIs
├── frontend/             # React + TypeScript Client
│   ├── src/
│   │   ├── components/   # Reusable UI elements & Page components
│   │   ├── pages/        # Main application views (Dashboard, Chat, etc.)
│   │   ├── services/     # API interaction helpers
│   │   └── firebaseConfig.ts # Client-side Firebase initialization
├── server/               # Flask + Firebase Admin SDK Backend
│   ├── server.py         # Main API server and route handlers
│   ├── locationRecc.py   # Geo-location recommendation logic
│   └── firebase_key.json # Backend service account (KEEP PRIVATE)
```

- **GitHub**: [vishalbarai007](https://github.com/vishalbarai007)
- **Project Link**: [https://github.com/vishalbarai007/Adventurer](https://github.com/vishalbarai007/Adventurer)
