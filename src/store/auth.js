import { firebaseAuth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";

const auth = {
  state() {
    return {
      user: {},
    };
  },
  actions: {
    async register(context, payload) {
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(
          firebaseAuth,
          payload.email,
          payload.password
        )
          .then((userCredential) => {
            const user = userCredential.user;
            sendEmailVerification(user);
            resolve();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(errorMessage);
          });
      });
    },
    async login(context, payload) {
      return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(
          firebaseAuth,
          payload.email,
          payload.password
        )
          .then((userCredential) => {
            context.state.user = userCredential.user;
            context.dispatch("authStateChange");
            resolve();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(errorMessage);
          });
      });
    },
    async logout(context, payload) {
      return new Promise((resolve, reject) => {
        signOut(firebaseAuth)
          .then(() => {
            console.log("User signed out");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    async passwordReset(context, payload) {
      return new Promise((resolve, reject) => {
        sendPasswordResetEmail(firebaseAuth, payload.email)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(errorMessage);
          });
      });
    },
    async authStateChange(context) {
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          const uid = user.uid;
        } else {
          console.log("User signed out");
        }
      });
    },
  },
};

export { auth };
