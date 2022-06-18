// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO2XFVFjiTcruw59ZeASdmzwqLbh_GvIs",
  authDomain: "todo-71c86.firebaseapp.com",
  projectId: "todo-71c86",
  storageBucket: "todo-71c86.appspot.com",
  messagingSenderId: "856990069859",
  appId: "1:856990069859:web:2d9c529b0ce5f24848f456",
  measurementId: "G-14GQBVM87T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);