
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, doc } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9CzyY_Cim8ZHfT3oQyxy8qZZFFTTgTlw",
  authDomain: "quizz-one.firebaseapp.com",
  projectId: "quizz-one",
  storageBucket: "quizz-one.appspot.com",
  messagingSenderId: "1008687560913",
  appId: "1:1008687560913:web:a5ab7ca901c3ebf9d52df0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize Firebase authentification
export const auth = getAuth(app);
export const db = getFirestore();

export const user = uid => doc(db, `users/${uid}`);

