import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Suas credenciais do arquivo .env.local
const firebaseConfig = {
  apiKey: process.env.AIzaSyAmfA7FtsY9eH6wFv7sYQekVVhpFTwFkQQ,
  authDomain: process.env.precos-salinas.firebaseapp.com,
  projectId: process.env.precos-salinas,
  storageBucket: process.env.precos-salinas.firebasestorage.app,
  messagingSenderId: process.env.194960227301,
  appId: process.env.1:194960227301:web:a437e83f0bd52a7f344d0c,
};

// Inicializa o Firebase
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
