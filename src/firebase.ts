// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    serverTimestamp, 
    getDocs, 
    updateDoc, 
    DocumentData
  } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArDZ_C7ctuUAPCJKsb6zr3xiSpckLQa8w",
  authDomain: "blinqpay-f036f.firebaseapp.com",
  projectId: "blinqpay-f036f",
  storageBucket: "blinqpay-f036f.appspot.com",
  messagingSenderId: "719798361899",
  appId: "1:719798361899:web:d41518d190a63560f76f6e",
  measurementId: "G-JLFMHFXYZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
  // Initialize Firestore Database
export const db = getFirestore(app);