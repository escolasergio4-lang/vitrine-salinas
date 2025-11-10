import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Suas credenciais do arquivo .env.local
const firebaseConfig = {
  apiKey: "AIzaSyAmfA7FtsY9eH6wFv7sYQekVVhpFTwFkQQ",
  authDomain: "precos-salinas.firebaseapp.com",
  projectId: "precos-salinas",
  storageBucket: "precos-salinas.firebasestorage.app",
  messagingSenderId: "194960227301",
  appId: "1:194960227301:web:a437e83f0bd52a7f344d0c"
};

// Inicializa o Firebase
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
