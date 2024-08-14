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
          favorite: true,
        },
      ],
      transactionHistory: {},
    }).then(() => {
      console.log("User created");
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
        console.log("Profile information updated");
        context.dispatch("showNotification", {
          message: "Profile information updated",
        });
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
        console.log("Profile preferences updated");
        context.dispatch("showNotification", {
          message: "Profile preferences updated",
        });
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
        console.log("Account information updated");
        context.dispatch("showNotification", {
          message: "Account information updated",
        });
      })
      .catch((error) => {
        console.error("Error updating values:", error);
      });
  },
  addNewAccount(context, payload) {
    const userId = context.getters.getUserId;
    const accountID = context.state.user.accounts.length;
    let isFavorite = false;
    if (accountID >= 4) {
      return;
    }

    accountID >= 2 ? (isFavorite = false) : (isFavorite = true);

    set(ref(firebaseDatabase, `users/${userId}/accounts/${accountID}`), {
      accountName: payload.accountName,
      currency: payload.currency,
      balance: 0,
      color: payload.color,
      favorite: isFavorite,
    })
      .then(() => {
        console.log("Added new account");
        context.dispatch("showNotification", {
          message: "Added new account",
        });
      })
      .catch((error) => {
        console.error("Error updating values:", error);
      });
  },
  deleteAccount(context, payload) {
    const userId = context.getters.getUserId;

    remove(ref(firebaseDatabase, `users/${userId}/accounts/${payload.id}`))
      .then(() => {
        console.log(`Account deleted successfully`);
        context.dispatch("showNotification", {
          message: "Account deleted successfully",
        });
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  },
  setFavorite(context, payload) {
    const updates = {};
    const userId = context.getters.getUserId;

    updates[`users/${userId}/accounts/${payload.id}/favorite`] =
      payload.favorite;

    update(ref(firebaseDatabase), updates)
      .then(() => {
        context.commit("setFavorite", {
          id: payload.id,
          favorite: payload.favorite,
        });
        console.log(`Account ${payload.id} set as favorite`);
        context.dispatch("showNotification", {
          message: `Account ${payload.id} set as favorite`,
        });
      })
      .catch((error) => {
        console.error("Error setting account favorite:", error);
      });
  },
};
