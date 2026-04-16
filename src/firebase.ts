// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3XB1fu5wcEh0u14Z-A8rOG9yl56e8758",
  authDomain: "ben-jamb-utme-simulator.firebaseapp.com",
  projectId: "ben-jamb-utme-simulator",
  storageBucket: "ben-jamb-utme-simulator.firebasestorage.app",
  messagingSenderId: "678927163808",
  appId: "1:678927163808:web:e8561bb4a25c90488f04c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);