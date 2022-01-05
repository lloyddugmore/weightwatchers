// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "weightwatcher-8bad9.firebaseapp.com",
  databaseURL: "https://weightwatcher-8bad9-default-rtdb.firebaseio.com",
  projectId: "weightwatcher-8bad9",
  storageBucket: "weightwatcher-8bad9.appspot.com",
  messagingSenderId: "1002137492330",
  appId: "1:1002137492330:web:43743b24be6278e371e313",
  measurementId: "G-S2WYCSX3PQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;