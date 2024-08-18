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
  getSingleAccountInfo: (state) => (id) => {
    if (!!state.user && "accounts" in state.user) {
      return state.user.accounts[id];
    }
  },
  getTransactions(state) {
    if (!!state.user && "transactions" in state.user) {
      return state.user.transactions;
    } else return {};
  },
  getFavoriteAccountsQuantity(state) {
    if (!!state.user && "accounts" in state.user) {
      return state.user.accounts.filter((el) => el.favorite === true).length;
    }
  },
};
