// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGyqLAXEaskDHLDS0YLKSaTznPOpTQv1s",
  authDomain: "freedrops-9d6df.firebaseapp.com",
  projectId: "freedrops-9d6df",
  storageBucket: "freedrops-9d6df.appspot.com",
  messagingSenderId: "474535428855",
  appId: "1:474535428855:web:831b63547e747fbcc2c9f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { db };
