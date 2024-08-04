import { firebaseDatabase } from "../../firebase";
import { ref, set, onValue, update } from "firebase/database";

export default {
  async setInitialUserData(context, payload) {
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
    context.commit("setLoading", true);
    return new Promise((resolve, reject) => {
      onValue(
        ref(firebaseDatabase, "users/" + context.getters.getUserId),
        (snapshot) => {
          const data = snapshot.val();
          context.commit("setUserDatabase", { user: data });
          context.commit("setLoading", false);
          resolve(data);
        }
      );
    });
  },
  async setProfileInformation(context, payload) {
    const updates = {};
    const userId = context.getters.getUserId;

    updates[`users/${userId}/firstname`] = payload.firstname;
    updates[`users/${userId}/lastname`] = payload.lastname;
    updates[`users/${userId}/city`] = payload.city;
    updates[`users/${userId}/country`] = payload.country;

    update(ref(firebaseDatabase), updates)
      .then(() => {
        console.log("Values updated successfully");
      })
      .catch((error) => {
        console.error("Error updating values:", error);
      });
  },
};
