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
  },
  mutations: {
    setUserDatabase(state, payload) {
      state.user = payload.user;
    },
  },
  actions: actions,
};

export { database };
