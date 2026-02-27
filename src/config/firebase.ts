import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// Firebase config - use env vars in production; fallback for dev
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? 'AIzaSyCinq4PvZUmfyKVHtqbxdr4uNGY5ujrXvI',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? 'expo-todo-poc.firebaseapp.com',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? 'expo-todo-poc',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? 'expo-todo-poc.firebasestorage.app',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '361483998001',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? '1:361483998001:web:8980597661c2d3d8265610',
};

// Initialize Firebase (skip Analytics - web only, not supported in React Native)
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth: Auth = getAuth(app);
export default app;
