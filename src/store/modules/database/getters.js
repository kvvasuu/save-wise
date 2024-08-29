export default {
  getUserDisplayName(state) {
    if (!!state.user) {
      if (state.user.firstname && state.user.lastname) {
        return `${state.user.firstname} ${state.user.lastname}`;
      } else return state.user.email;
    }
  },
  getUserDatabase(state) {
    if (!!state.user) {
      return state.user;
    }
  },
  getAccountsInfo(state) {
    if (!!state.user && "accounts" in state.user) {
      return state.user.accounts;
    } else return [];
  },
  getAccountsQuantity(state, getters) {
    return getters.getAccountsInfo.length;
  },
  getSingleAccountInfo: (state) => (index) => {
    if (!!state.user && "accounts" in state.user) {
      return state.user.accounts[index];
    }
  },
  getAccountIndex: (state) => (id) => {
    if (!!state.user && "accounts" in state.user) {
      return state.user.accounts.findIndex((el) => {
        return el.accountId === id;
      });
    }
  },
  getTransactions(state) {
    if (!!state.user && "transactions" in state.user) {
      return state.user.transactions;
    } else return {};
  },
  getRecentTransactions(state, getters) {
    if (!!state.user && "transactions" in state.user) {
      const transactionList = Object.values(getters.getTransactions).sort(
        (a, b) => {
          return new Date(b.transactionDate) - new Date(a.transactionDate);
        }
      );
      return transactionList.slice(0, 3);
    } else return [];
  },
  getWeeklyTransactions: (state, getters) => (accountIndex) => {
    if (!!state.user && "transactions" in state.user) {
      let transactionList = Object.values(getters.getTransactions);
      const accountId = getters.getSingleAccountInfo(accountIndex).accountId;

      transactionList = transactionList.filter((el) => {
        return el.accountId === accountId;
      });

      if (transactionList.length === 0) return [];

      const now = new Date();
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(now.getDate() - 6);

      const last7Days = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(sevenDaysAgo);
        date.setDate(sevenDaysAgo.getDate() + i);
        last7Days.push(date.toISOString().split("T")[0]);
      }

      const dailySums = last7Days.map((date) => ({
        day: date,
        income: 0,
        expense: 0,
      }));

      transactionList.forEach((transaction) => {
        const transactionDate = transaction.transactionDate.split("T")[0];
        const found = dailySums.find((el) => el.day === transactionDate);
        if (found) {
          found[transaction.transactionType] += transaction.amount;
        }
      });
      return dailySums;
    } else return [];
  },
  getFavoriteAccountsQuantity(state) {
    if (!!state.user && "accounts" in state.user) {
      return state.user.accounts.filter((el) => el.favorite === true).length;
    }
  },
};
