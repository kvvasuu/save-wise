import { firebaseAuth, firebaseApp } from "./firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = createStore({
  state() {
    return {};
  },
  actions: {
    async register(context, payload) {
      await createUserWithEmailAndPassword(
        firebaseAuth,
        payload.email,
        payload.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
    test(context, payload) {
      console.log(payload);
    },
  },
});

export { auth };
