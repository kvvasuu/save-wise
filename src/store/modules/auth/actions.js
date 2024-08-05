import { firebaseAuth, storage } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
            context.dispatch("logout");
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
            context.commit("setRememberMe", payload.rememberMe);
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
  autoLogin(context) {
    context.commit("setLoading", true);

    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        context.commit("setUser", {
          user: user,
          token: user.accessToken,
          userId: user.uid,
        });
        if (user.emailVerified) {
          router.replace("/app");
        }
        context.commit("setLoading", false);
      } else {
        context.commit("setUser", {
          user: null,
          token: null,
          userId: null,
        });
        context.commit("setRememberMe", false);
        router.replace("/");
        context.commit("setLoading", false);
      }
    });
  },
  setPhotoURL(context, payload) {
    const storageRef = ref(storage, `images/${context.getters.getUserId}`);
    return new Promise((resolve, reject) => {
      uploadBytes(storageRef, payload.file)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
          getDownloadURL(storageRef)
            .then((url) => {
              updateProfile(firebaseAuth.currentUser, {
                photoURL: url,
              })
                .then(() => {
                  context.commit("setPhotoUrl", { photoURL: url });
                  resolve();
                })
                .catch((error) => {
                  console.log(error);
                  reject();
                });
            })
            .catch((error) => {
              console.log(error);
              reject();
            });
        })
        .catch((error) => {
          console.log(error);
          reject();
        });
    });
  },
};
