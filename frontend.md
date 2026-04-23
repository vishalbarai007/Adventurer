# Frontend Architecture - Adventurer
## 🏗️ Technology Stack
- **Core:** React 18, Vite (for ultra-fast HMR and bundling), TypeScript
- **State Management:** Zustand, React Context API (e.g., `LocationProvider`)
- **Styling:** Tailwind CSS, custom custom-scrollbar CSS.
- **Animations:** Framer Motion (for chat & complex UI transitions), AOS (Animate on Scroll)
- **UI Components:** Shadcn/ui, Radix UI Primitives (Accessible UI patterns), React-Icons, Tabler Icons, Lucide React
- **Routing:** React Router DOM (v6)
- **Maps:** React Leaflet
- **Data Fetching:** Axios, Firebase Web SDK (v10+)
## 📂 Directory Structure
```text
frontend/
├── .env                 # Firebase Client Credentials (API Key, Project ID, etc.)
├── src/
│   ├── firebaseConfig.ts # Firebase Initialization and Exported DB handles
│   ├── assets/          # Static assets like images and brand logos
│   ├── components/      
│   │   ├── features/    # Complex widgets (e.g., ChatBot, Infinite Moving Cards, Embla Carousel)
│   │   └── ui/          # Granular, reusable atomic UI components (Buttons, Dialogs, Cards, Inputs)
│   ├── hooks/           # Custom React hooks (e.g., useCurrentLocation)
│   ├── pages/           # Route-level views (Dashboard, ChatPage, Profile, TrekDetails)
│   ├── services/        # Centralized HTTP Clients
│   ├── styles/          # Global styles (index.css, custom-scrollbar.css)
│   ├── App.tsx          # Defines Context providers and lazy-loads all routes inside <Suspense>
│   └── main.tsx         # React DOM mount point
├── package.json         # Project dependencies and script commands
├── tailwind.config.js   # Custom theming and variants for Tailwind
└── vite.config.ts       # Vite builder configuration
```
## 🚀 Architectural Design Patterns
### 1. Code Splitting & Lazy Loading
The `App.tsx` actively uses `React.lazy()` for all route views (e.g. `const BusinessDashboard = lazy(() => import("./pages/BusinessDashboard"));`). This limits the initial JS payload, reducing loading times significantly.

### 2. Real-Time Data Synchronization
The application utilizes **Firestore Real-time Listeners** (`onSnapshot`) for the 1:1 Chat system. This ensures that UI updates (like new messages) occur instantly across clients without requiring manual polling or page refreshes.

### 3. Contextual State & Geolocation
Global state regarding the user’s real-time geographic location is maintained via a `LocationContext`. The system uses browser geolocation to power the "Nearby Places" tagging feature during post creation, interfacing with the backend `locationRecc.py`.

### 4. Premium Animation Orchestration
Using `framer-motion`, the chat system implements high-fidelity spring physics for message bubbles. The `AnimatePresence` wrapper ensures smooth entry/exit transitions, providing a native-app feel for web interactions.
