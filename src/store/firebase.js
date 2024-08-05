import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBD0IskgXbaRzAk9VhnJBMQqp30SP_GB0s",
  authDomain: "save-wise.firebaseapp.com",
  databaseURL: "https://save-wise-default-rtdb.firebaseio.com",
  projectId: "save-wise",
  storageBucket: "save-wise.appspot.com",
  messagingSenderId: "384378802392",
  appId: "1:384378802392:web:b44c786f1be2f0c15307ad",
  measurementId: "G-SLD9BRJFFV",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDatabase = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);
export { firebaseAuth, firebaseApp, firebaseDatabase, storage };
