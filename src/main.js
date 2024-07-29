import "./assets/style/main.scss";

import { createApp } from "vue";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(router);
app.use(store);

router.isReady().then(() => app.mount("#app"));
