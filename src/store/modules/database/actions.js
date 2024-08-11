import { firebaseDatabase } from "../../firebase";
import { ref, set, onValue, update } from "firebase/database";

export default {
  setInitialUserData(context, payload) {
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
  getUserData(context, payload) {
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
  setAccountInformation(context, payload) {
    const updates = {};
    const userId = context.getters.getUserId;

    updates[`users/${userId}/accounts/${payload.id}/accountName`] =
      context.state.user.accounts[payload.id].accountName;
    updates[`users/${userId}/accounts/${payload.id}/color`] =
      context.state.user.accounts[payload.id].color;
    updates[`users/${userId}/accounts/${payload.id}/currency`] =
      context.state.user.accounts[payload.id].currency;

    update(ref(firebaseDatabase), updates)
      .then(() => {
        console.log("Values updated successfully");
      })
      .catch((error) => {
        console.error("Error updating values:", error);
      });
  },
  addNewAccount(context, payload) {
    const userId = context.getters.getUserId;
    const accountID = context.state.user.accounts.length;

    if (accountID >= 4) {
      return;
    }

    set(ref(firebaseDatabase, `users/${userId}/accounts/${accountID}`), {
      accountName: payload.accountName,
      currency: payload.currency,
      balance: 0,
      color: payload.color,
    })
      .then(() => {
        console.log("Values updated successfully");
      })
      .catch((error) => {
        console.error("Error updating values:", error);
      });
  },
};
