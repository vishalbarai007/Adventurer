# Adventurer - Travel & Tourism Platform 🌍

**Adventurer** is a comprehensive, full-stack tour, travel, and trekking platform designed to provide detailed information, interactive tools, and engaging content for adventure enthusiasts. Plan your destination with ease!

---

## ✨ Features  

1. **Interactive Map**: Explore trekking routes and nearby points of interest using dynamic maps.  
2. **AI-Powered Chatbot**: Get quick answers and trip recommendations via our integrated AI assistant.
3. **Rich Travel Blogs**: Read experiences from fellow travelers, complete with large media galleries.
4. **Smart Itineraries & Destinations**: Discover seasonal destinations and curated recommendations based on your preferences.  
5. **Weather & Packing Tips**: Dedicated sections covering tips for specific configurations and activities (trekking, hiking, stargazing).
6. **Authentication System**: Secure user registration, sign-in, and seamless Google OAuth integration.
7. **Profile Ecosystem**: Save posts, view tagged photos, and navigate personal travel histories.
8. **Responsive Design**: Polished, motion-rich, and mobile-friendly UI built on modern best practices.

---

## 🛠️ Tech Stack  

### Frontend
- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Framer Motion for advanced animations.
- **Language**: TypeScript for robust and scalable frontend code.
- **UI Components**: Employs [shadcn/ui](https://ui.shadcn.dev/) and Radix UI primitives for accessible design.
- **Maps**: React Leaflet to render interactive travel trails.

### Backend
- **Framework**: [Flask](https://flask.palletsprojects.com/) (Python)
- **Database / Auth**: Firebase Admin SDK for database management and secure backend auth logic.
- **Integration**: Google OAuth capabilities built directly over `client_secret.json`.
- **AI/ML Scripting**: Integrated `.py` modules (`locationRecc.py`) for smart recommendations logic.

---

## 🚀 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18+)
- [Python 3.8+](https://www.python.org/)
- Firebase Service Account Key & Google OAuth Credentials

### 1. Clone the repository
```bash
git clone https://github.com/vishalbarai007/Adventurer.git
cd Adventurer
```

### 2. Backend Setup (Flask Server)
```bash
cd server
# Create a virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install requirements
pip install -r requirements.txt
```
**Environment Variables:**
Ensure you place your `firebase_key.json` and `client_secret.json` in the `/server` directory. Configure your `.env` file for backend keys.
```env
FLASK_APP=server.py
FLASK_ENV=development
```
**Run Server:**
```bash
python server.py
# The server will run on http://localhost:5000
```

### 3. Frontend Setup (Vite React App)
Open a new terminal tab from the root repository folder:
```bash
cd frontend
npm install
```
**Run Frontend:**
```bash
npm run dev
# The app will run on http://localhost:5173
```

---

## 📂 Project Structure  

```text
Adventurer/
├── frontend/             # React + TypeScript Client
│   ├── src/
│   │   ├── components/   # Reusable UI elements & Shadcn library
│   │   ├── pages/        # Main route views (Map, Login, Blogs, etc.)
│   │   ├── services/     # Axios API requests architecture
│   │   ├── styles/       # Global CSS & Tailwind setups
│   │   ├── assets/       # Static assets, local videos, images
│   │   └── App.tsx       # Routing logic map (Code-split via React.lazy)
│   ├── vite.config.ts    
│   └── package.json      
├── server/               # Python Flask Backend
│   ├── server.py         # Main Flask API endpoints
│   ├── locationRecc.py   # Recommendation logic scripts
│   ├── requirements.txt  # Python dependencies
│   ├── .env              # Secrets configuration
│   └── *_key.json        # Service accounts & OAuth secrets
└── README.md
```  

---

## 📜 Available Scripts (Frontend)

- `npm run dev`: Starts the Vite development server.  
- `npm run build`: Type-checks (`tsc -b`) and bundles the project chunks for production.  
- `npm run lint`: Analyzes codebase for ESLint constraint violations.
- `npm run preview`: Hosts a lightweight local server to preview the production build output.  

---

## 🤝 Contributing  

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License  

This project is licensed under the [MIT License](./LICENSE).  

---

## 📬 Contact  

- **Author**: Vishal Barai
- **GitHub**: [vishalbarai007](https://github.com/vishalbarai007)
- **Project Link**: [https://github.com/vishalbarai007/Adventurer](https://github.com/vishalbarai007/Adventurer)
