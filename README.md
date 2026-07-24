# Adventurer - Travel & Tourism Platform 🌍

**Adventurer** is a comprehensive, full-stack tour, travel, and trekking platform designed to provide detailed information, interactive tools, and engaging content for adventure enthusiasts. Built as a multi-tenant application, it caters to Travelers, Organizers, and Tour Guides.

---

## 🛠️ Tech Stack

### Frontend
* **Core:** React, TypeScript, Vite
* **Styling:** CSS variables, Tailwind CSS, Framer Motion (for spring animations)
* **Routing & State:** React Router DOM, Zustand
* **Maps & Geo:** Geolocation APIs, Leaflet / OpenStreetMap

### Backend
* **Core:** Node.js, Express, TypeScript (running via `ts-node-dev`)
* **Database & Auth:** Firebase Admin SDK (Firestore), Google OAuth 2.0
* **AI Engine:** Gemini AI API (for travel recommendations/assistant)
* **Media Storage:** Cloudinary integration (for post/trip image uploads)
* **Payments:** Razorpay integration (pre-configured)
* **Utilities:** Nodemailer (for emails), Multer (file parsing), JSON Web Tokens (JWT), BcryptJS

---

## ✨ Features & Key Functionalities

### 💼 Multi-Tenant Backbone & Dashboard
* **Role-Based Access Control (RBAC):** Distinct interfaces and metrics for `traveler`, `organizer`, and `guide` roles.
* **Business Dashboard:** Organizers and guides can view, create, update, and manage trip listings, and view bookings.
* **Listing Management:** Seamless CRUD operations for treks, category tagging, and pricing models directly from the UI.
* **Route:** `/dashboard`

### 💬 Real-Time 1:1 Chat System
* **Live Messaging:** Fully synchronized chat powered by Firestore client-side `onSnapshot` real-time listeners.
* **Premium UI/UX:** Interactive and animated message bubbles with spring physics using `framer-motion`.
* **Inquiry Handshake:** Allows travelers to start a conversation with the organizer directly from a trek page.
* **Route:** `/chat/:chatId`

### 📸 Social Explore & Location Tagging
* **Dynamic Feed:** Supports standard post view and a sleek grid-based Explore page.
* **Location Recommender:** Suggests nearby "Famous Places" using geolib recommendation algorithms and browser geolocation.
* **Map Modals:** Interactive popup maps centering on post locations using OpenStreetMap.
* **Native Share:** Integrated Web Share API support to easily share posts and trips.

---

## 📂 Project Structure

```text
Adventurer/
├── frontend/             # Vite + React + TypeScript Client
│   ├── src/
│   │   ├── components/   # Reusable UI elements, auth forms, and layout wrappers
│   │   ├── pages/        # Main pages (Explore, Dashboard, TravelTips, Settings, etc.)
│   │   ├── services/     # API request clients (axios wrapper with authorization headers)
│   │   └── firebaseConfig.ts # Client-side Firebase App init
│   └── package.json
│
├── backend/              # Express + Node + TypeScript Server
│   ├── src/
│   │   ├── config/       # Firebase admin credentials & cloud configurations
│   │   ├── controllers/  # Route handler controllers (auth, chat, posts, profile)
│   │   ├── middleware/   # JWT authentication, file upload interceptors
│   │   └── index.ts      # Server entry point
│   ├── firebase_key.json # Private Firebase Service Account credential (git-ignored)
│   ├── client_secret.json# Google Client credentials for auth (git-ignored)
│   └── package.json
```

---

## 🚀 Installation & Complete Setup

### Prerequisites
* **Node.js** (v18+) and `npm`
* **Firebase Project** (Firestore enabled)
* **Google Cloud Console OAuth Web Credentials**
* **Cloudinary Developer Account**

### 1. Clone the Repository
```bash
git clone https://github.com/vishalbarai007/Adventurer.git
cd Adventurer
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the server dependencies:
   ```bash
   npm install
   ```
3. Setup credentials:
   - Place your Firebase service account key in `/backend/firebase_key.json`.
   - Place your Google OAuth JSON client secret in `/backend/client_secret.json`.
4. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   SECRET_KEY="your-jwt-signing-secret"
   GEMINI_API_KEY="your-gemini-ai-api-key"
   CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
   CLOUDINARY_API_KEY="your-cloudinary-api-key"
   CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
   ```
5. Start the backend in development mode:
   ```bash
   npm run dev
   # Backend starts at http://localhost:5000
   ```

### 3. Frontend Setup
1. In a new terminal window, navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your production or dev API environment variable (optional, defaults to `http://localhost:5000` via VITE proxy configuration):
   - You can configure custom endpoints by adding a `.env` in `frontend/` containing `VITE_API_BASE_URL=http://localhost:5000`.
4. Start the frontend development server:
   ```bash
   npm run dev
   # Access application at http://localhost:5173
   ```

---

## 🤝 How to Contribute

Adventurer is open source, and we welcome contributions from developers, designers, and documenters of all skill levels!

### Contribution Workflow

1. **Fork** the repository to your own account.
2. **Clone** your fork to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Adventurer.git
   ```
3. Create a descriptive **feature branch**:
   ```bash
   git checkout -b feature/my-amazing-feature
   # For bug fixes: git checkout -b fix/issue-name
   ```
4. Make your changes, ensuring code matches existing style guidelines and format.
5. Make sure the code builds successfully:
   ```bash
   # In frontend
   npm run build
   # In backend
   npm run build
   ```
6. **Commit** your changes following our Commit Conventions (see below).
7. **Push** your branch to your GitHub fork:
   ```bash
   git push origin feature/my-amazing-feature
   ```
8. Open a **Pull Request (PR)** from your branch to the `main` branch of the original repository.

---

## 📝 Commit Conventions & Rules

To keep the project history readable, uniform, and professional, we strictly adhere to Conventional Commits. Your commits must use one of the following prefixes depending on the work done:

* **`feat:`** Introducing a new feature.
  * *Example:* `feat: add Google One-Tap Login flow`
* **`fix:`** Fixing a bug or an issue.
  * *Example:* `fix: make login page role-card selector responsive`
* **`refactor:`** Modifying code structure without changing its behavior.
  * *Example:* `refactor: extract user validation rules to middleware`
* **`docs:`** Changing documentation files or READMEs.
  * *Example:* `docs: update setup instructions for Express backend`
* **`style:`** Changes that do not affect the meaning of the code (formatting, white-space, missing semi-colons, etc.).
  * *Example:* `style: run lint and format codebase`
* **`perf:`** A code change that improves performance.
  * *Example:* `perf: load explore images lazily to improve initial render speed`
* **`test:`** Adding missing tests or correcting existing tests.
  * *Example:* `test: add unit test for location recommendation calculator`
* **`chore:`** Updating dependencies, configuration files, build scripts, etc.
  * *Example:* `chore: upgrade express-admin library to next version`

---

## 📄 License

This project is licensed under the **MIT License**. 

```text
MIT License

Copyright (c) 2026 Adventurer Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
