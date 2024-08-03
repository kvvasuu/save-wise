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
            console.log(userCredential);

            localStorage.setItem("userId", userCredential.user.uid);
            localStorage.setItem("token", userCredential.user.accessToken);
            localStorage.setItem(
              "tokenExpirationTime",
              userCredential.user.stsTokenManager.expirationTime
            );
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
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        context.commit("setUser", {
          user: user.uid,
          token: user.accessToken,
        });

        router.replace({ name: "App" });
      } else {
        context.commit("setUser", {
          user: null,
          token: null,
        });
        router.replace({ name: "Welcome" });

        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpirationTime");
      }
    });
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const expiresIn =
      +localStorage.getItem("tokenExpirationTime") - new Date().getTime();

    if (expiresIn < 3600) {
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
