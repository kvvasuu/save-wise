import { firebaseAuth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import router from "../../../router";

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
    signOut(firebaseAuth).catch((error) => {
      console.log(error);
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
  async autoLogin(context) {
    context.commit("setLoading", true);

    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        context.commit("setUser", {
          user: user,
          token: user.accessToken,
          userId: user.uid,
        });
        router.push("/app");
        context.commit("setLoading", false);
      } else {
        context.commit("setUser", {
          user: null,
          token: null,
          userId: null,
        });
        router.push("/");
        context.commit("setLoading", false);
      }
    });
  },
};
