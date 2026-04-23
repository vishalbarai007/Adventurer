# Frontend Architecture - Adventurer
## 🏗️ Technology Stack
- **Core:** React 18, Vite (for ultra-fast HMR and bundling), TypeScript
- **State Management:** Zustand, React Context API (e.g., `LocationProvider`)
- **Styling:** Tailwind CSS, custom custom-scrollbar CSS.
- **Animations:** Framer Motion, AOS (Animate on Scroll)
- **UI Components:** Shadcn/ui, Radix UI Primitives (Accessible UI patterns), React-Icons, Tabler Icons, Lucide React
- **Routing:** React Router DOM (v6)
- **Maps:** React Leaflet
- **Data Fetching:** Axios
## 📂 Directory Structure
```text
frontend/
├── src/
│   ├── assets/          # Static assets like images and brand logos
│   ├── components/      
│   │   ├── features/    # Complex widgets (e.g., ChatBot, Infinite Moving Cards, Embla Carousel)
│   │   └── ui/          # Granular, reusable atomic UI components (Buttons, Dialogs, Cards, Inputs)
│   ├── hooks/           # Custom React hooks (e.g., useCurrentLocation)
│   ├── pages/           # Route-level views (LoginPage, Maps, Blogs, Profile, Destinations)
│   ├── styles/          # Global styles (index.css, custom-scrollbar.css)
│   ├── App.tsx          # Defines Context providers and lazy-loads all routes inside <Suspense>
│   └── main.tsx         # React DOM mount point
├── package.json         # Project dependencies and script commands
├── tailwind.config.js   # Custom theming and variants for Tailwind
└── vite.config.ts       # Vite builder configuration
```
## 🚀 Architectural Design Patterns
### 1. Code Splitting & Lazy Loading
The `App.tsx` actively uses `React.lazy()` for all route views (e.g. `const SplashScreen = lazy(() => import("@/components/features/SplashScreen"));`). This limits the initial JS payload, reducing loading times significantly. The fallback state is handled using a custom `LargeSuccessLoader` within `<Suspense>`.
### 2. Contextual State & Geolocation
Global state regarding the user’s real-time geographic location is maintained via a `LocationContext`. The custom hook `useCurrentLocation()` queries the browser's Geolocation API. If unavailable, it degrades gracefully so the backend can instead attempt IP-based fallback logic.
### 3. Modular UI 
The application fully adopts atomic design with Radix UI + Tailwind via `shadcn/ui`. Fundamental blocks are exported from `/components/ui/` and abstracted into larger combinations under `/components/features/`.
