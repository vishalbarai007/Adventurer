import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace these placeholders with your actual Web App SDK values from the Firebase Console!
// The firebase_key.json is for your SERVER (Admin SDK), not your client.
// Go to Firebase Console -> Project Settings -> General -> Web App snippet to get these.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "adventurer-65d6a.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "adventurer-65d6a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "adventurer-65d6a.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
