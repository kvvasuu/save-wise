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
  getFavoriteAccountsQuantity(state) {
    if (!!state.user && "accounts" in state.user) {
      return state.user.accounts.filter((el) => el.favorite === true).length;
    }
  },
};
