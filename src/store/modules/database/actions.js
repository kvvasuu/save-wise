import { firebaseDatabase } from "../../firebase";
import { ref, set, onValue } from "firebase/database";

export default {
  async setUserData(context, payload) {
    set(ref(firebaseDatabase, "users/" + payload.userId), {
      firstname: payload.firstname ?? "",
      lastname: payload.lastname ?? "",
      email: payload.email,
      city: payload.city ?? "",
      country: payload.country ?? "",
      settings: {
        defaultCurrency: payload.defaultCurrency ?? "USD",
        notifications: true,
      },
      accounts: [
        {
          accountNumber: "",
          accountName: payload.accountName ?? "Default account",
          currency: payload.currency ?? "USD",
        },
      ],
      transactionHistory: {},
    });
  },
  async getUserData(context, payload) {
    return new Promise((resolve, reject) => {
      onValue(ref(firebaseDatabase, "users/" + payload.userId), (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      });
    });
  },
};
