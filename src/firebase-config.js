// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD0ZiYmxVpigOJqEHMJfawia9xiNpJxeBk",
  authDomain: "reactnativejs-a69ad.firebaseapp.com",
  projectId: "reactnativejs-a69ad",
  storageBucket: "reactnativejs-a69ad.appspot.com",
  messagingSenderId: "1053167858856",
  appId: "1:1053167858856:web:ac0dbd107a2bc5cfa87e9d",
  measurementId: "G-56L9V7CP34"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}