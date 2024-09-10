// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAHYQy_6FiPGFpZLylHbklZLnM7PVM4FY",
  authDomain: "store-61531.firebaseapp.com",
  databaseURL: "https://store-61531-default-rtdb.firebaseio.com",
  projectId: "store-61531",
  storageBucket: "store-61531.appspot.com",
  messagingSenderId: "845967636848",
  appId: "1:845967636848:web:abf592af6f5cef3991f7b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);