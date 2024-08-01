import { firebaseAuth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";

export default {
  async register(context, payload) {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(
        firebaseAuth,
        payload.email,
        payload.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          sendEmailVerification(firebaseAuth.currentUser).then(() => {
            resolve();
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          reject(errorCode);
        });
    });
  },
  async login(context, payload) {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
        .then((userCredential) => {
          if (userCredential.user.emailVerified) {
            context.dispatch("authStateChange");
            resolve();
          } else {
            context.dispatch("logout");
            reject("notverified");
          }
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
          context.dispatch("authStateChange");
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
        context.state.user = user;
        context.state.token = user.accessToken;
      } else {
        context.state.token = null;
        console.log("User is not logged in");
      }
    });
  },
};
