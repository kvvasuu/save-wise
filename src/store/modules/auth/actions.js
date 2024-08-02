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
            onAuthStateChanged(firebaseAuth, (user) => {
              if (user) {
                context.commit("setUser", {
                  user: user.uid,
                  token: user.accessToken,
                });

                const tokenExpiration =
                  +user.stsTokenManager.expirationTime * 1000;
                const tokenExpirationTime =
                  new Date().getTime() + tokenExpiration;

                localStorage.setItem("userId", user.uid);
                localStorage.setItem("token", user.accessToken);
                localStorage.setItem(
                  "tokenExpirationTime",
                  tokenExpirationTime
                );
                router.replace("/app");
                console.log("login");
              } else {
                console.log("logout");

                context.commit("setUser", {
                  user: null,
                  token: null,
                });
              }
            });
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
          router.replace("/");
          localStorage.removeItem("userId");
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpirationTime");
          context.commit("setUser", {
            user: null,
            token: null,
          });
          resolve();
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
  async autoLogin(context) {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const expiresIn =
      +localStorage.getItem("tokenExpirationTime") - new Date().getTime();

    if (expiresIn < 100000) {
      return;
    }

    if (userId && token) {
      context.commit("setUser", {
        user: userId,
        token: token,
      });
    }
  },
};
