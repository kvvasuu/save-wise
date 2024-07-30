import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBD0IskgXbaRzAk9VhnJBMQqp30SP_GB0s",
  authDomain: "save-wise.firebaseapp.com",
  projectId: "save-wise",
  storageBucket: "save-wise.appspot.com",
  messagingSenderId: "384378802392",
  appId: "1:384378802392:web:b44c786f1be2f0c15307ad",
  measurementId: "G-SLD9BRJFFV",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

export { firebaseAuth, firebaseApp };
