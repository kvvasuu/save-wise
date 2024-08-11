import actions from "./actions";

const database = {
  state() {
    return {
      user: null,
    };
  },
  getters: {
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
      if (!!state.user) {
        return state.user.accounts;
      }
    },
    getAccountsInfo(state) {
      if (!!state.user) {
        return state.user.accounts;
      }
    },
    getSingleAccountInfo: (state) => (id) => {
      if (!!state.user) {
        return state.user.accounts[id];
      }
    },
    getTransactions(state) {
      if (!!state.user) {
        return state.user.transactions;
      }
    },
  },
  mutations: {
    setUserDatabase(state, payload) {
      state.user = payload.user;
    },
    setAccountInformation(state, payload) {
      state.user.accounts[payload.id].accountName = payload.accountName;
      state.user.accounts[payload.id].currency = payload.currency;
      state.user.accounts[payload.id].color = payload.color;
    },
  },
  actions: actions,
};

export { database };
