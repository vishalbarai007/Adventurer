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
## 📂 Project Structure  
```text
Adventurer/
├── frontend.md           # Documentation for UI configuration
├── backend.md            # Documentation for Database & APIs
├── frontend/             # React + TypeScript Client
│   ├── src/
│   │   ├── components/   # Reusable UI elements & Shadcn library
- **GitHub**: [vishalbarai007](https://github.com/vishalbarai007)
- **Project Link**: [https://github.com/vishalbarai007/Adventurer](https://github.com/vishalbarai007/Adventurer)
