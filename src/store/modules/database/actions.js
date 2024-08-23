import { firebaseDatabase } from "../../firebase";
import {
  ref,
  set,
  get,
  onValue,
  update,
  remove,
  query,
  orderByChild,
  equalTo,
  push,
} from "firebase/database";
import { generateTimestampID } from "@/assets/script";

export default {
  setInitialUserData(context, payload) {
    const accountId = generateTimestampID();
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
          accountId: accountId,
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
        context.dispatch("showNotification", {
          message: "Something went wrong",
          type: false,
        });
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
        context.dispatch("showNotification", {
          message: "Something went wrong",
          type: false,
        });
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
        context.dispatch("showNotification", {
          message: "Something went wrong",
          type: false,
        });
      });
  },
  addNewAccount(context, payload) {
    const userId = context.getters.getUserId;
    const accountIndex = (context.state.user.accounts || []).length;
    const accountId = generateTimestampID();
    if (accountIndex >= 4) {
      return;
    }

    set(ref(firebaseDatabase, `users/${userId}/accounts/${accountIndex}`), {
      accountId: accountId,
      accountName: payload.accountName,
      currency: payload.currency,
      balance: 0,
      color: payload.color,
      favorite: false,
    })
      .then(() => {
        console.log("Added new account");
        context.dispatch("showNotification", {
          message: "Added new account",
        });
      })
      .catch((error) => {
        console.error("Error updating values:", error);
        context.dispatch("showNotification", {
          message: "Something went wrong",
          type: false,
        });
      });
  },
  deleteAccount(context, payload) {
    const userId = context.getters.getUserId;
    const accountId = Number(payload.id);
    const transactionsQuery = query(
      ref(firebaseDatabase, `users/${userId}/transactions`),
      orderByChild("accountId"),
      equalTo(accountId)
    );

    get(transactionsQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const numberOfTransactions = Object.keys(snapshot.val()).length;
          snapshot.forEach((childSnapshot) => {
            remove(
              ref(
                firebaseDatabase,
                `users/${userId}/transactions/${childSnapshot.key}`
              )
            );
          });
          console.log(`${numberOfTransactions} transactions deleted`);
        } else {
          console.log("No transactions to delete");
        }
      })
      .catch((error) => {
        console.error("Error while deleting transactions:", error);
      });

    get(ref(firebaseDatabase, `users/${userId}/accounts`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const accounts = snapshot.val();

          accounts.splice(accountId, 1);

          let newArray = {};
          accounts.forEach((item, index) => {
            newArray[index] = item;
          });

          set(ref(firebaseDatabase, `users/${userId}/accounts`), newArray).then(
            () => {
              console.log(`Account deleted successfully`);
              context.dispatch("showNotification", {
                message: "Account deleted successfully",
              });
            }
          );
        }
      })
      .catch((error) => {
        console.error("Error while deleting account:", error);
        context.dispatch("showNotification", {
          message: "Something went wrong",
          type: false,
        });
      });
  },
  setFavorite(context, payload) {
    const updates = {};
    const userId = context.getters.getUserId;

    const account = context.getters.getSingleAccountInfo(payload.id);
    let message = `${account.accountName} set as favorite`;
    if (!payload.favorite)
      message = `${account.accountName} is removed from favorites`;

    updates[`users/${userId}/accounts/${payload.id}/favorite`] =
      payload.favorite;

    update(ref(firebaseDatabase), updates)
      .then(() => {
        context.commit("setFavorite", {
          id: payload.id,
          favorite: payload.favorite,
        });
        console.log(message);
        context.dispatch("showNotification", {
          message: message,
        });
      })
      .catch((error) => {
        console.error("Error setting account favorite:", error);
        context.dispatch("showNotification", {
          message: "Something went wrong",
          type: false,
        });
      });
  },
  quickDeposit(context, payload) {
    return new Promise((resolve, reject) => {
      const updates = {};
      const userId = context.getters.getUserId;

      const account = context.getters.getSingleAccountInfo(payload.id);

      const balance = Number(account.balance) + payload.amount;

      updates[`users/${userId}/accounts/${payload.id}/balance`] = balance;

      update(ref(firebaseDatabase), updates)
        .then(() => {
          context
            .dispatch("addTransactionRecord", {
              accountId: account.accountId,
              amount: payload.amount,
              balance: balance,
              name: "Quick deposit",
              transactionType: "income",
            })
            .then(() => {
              console.log("Operation complete");
              context.dispatch("showNotification", {
                message: "Operation complete",
              });
              resolve();
            });
        })
        .catch((error) => {
          console.error("Error setting account favorite:", error);
          context.dispatch("showNotification", {
            message: "Something went wrong",
            type: false,
          });
          reject();
        });
    });
  },
  addTransactionRecord(context, payload) {
    const userId = context.getters.getUserId;
    let name = payload.name;
    let category = payload.category || "";
    if (name === undefined || name === "") name = "Operation";

    const currentDate = new Date().toISOString();

    const newTransactionRef = push(
      ref(firebaseDatabase, `users/${userId}/transactions`)
    );

    set(newTransactionRef, {
      accountId: payload.accountId,
      amount: payload.amount,
      balance: payload.balance,
      name: name,
      transactionDate: currentDate,
      transactionType: payload.transactionType,
      category: category,
    })
      .then(() => {
        console.log("Added new transaction");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};
