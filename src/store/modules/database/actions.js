import { firebaseDatabase } from "../../firebase";
import { ref, set, onValue, update } from "firebase/database";

export default {
  async setInitialUserData(context, payload) {
    set(ref(firebaseDatabase, "users/" + payload.userId), {
      firstname: "",
      lastname: "",
      email: payload.email,
      city: "",
      country: "",
      settings: {
        defaultCurrency: "USD",
        notifications: true,
      },
      accounts: [
        {
          accountName: "Main account",
          currency: "USD",
          balance: 0,
          color: "black",
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
  setProfileInformation(context, payload) {
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
  setProfilePreferences(context, payload) {
    const updates = {};
    const userId = context.getters.getUserId;

    updates[`users/${userId}/settings/defaultCurrency`] =
      payload.defaultCurrency;
    updates[`users/${userId}/settings/notifications`] = payload.notifications;

    update(ref(firebaseDatabase), updates)
      .then(() => {
        console.log("Values updated successfully");
      })
      .catch((error) => {
        console.error("Error updating values:", error);
      });
  },
};
