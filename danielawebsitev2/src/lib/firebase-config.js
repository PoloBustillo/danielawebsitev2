// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSghawB4Sdi4gUEi6j1NPrHLPWqFF_M8E",
  authDomain: "pisc-cms.firebaseapp.com",
  projectId: "pisc-cms",
  storageBucket: "pisc-cms.appspot.com",
  messagingSenderId: "270454145850",
  appId: "1:270454145850:web:40303bb3b6bd804390c603",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
