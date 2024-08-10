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
    getAccountInfo(state) {
      if (!!state.user) {
        setTimeout(() => {
          return state.user.accounts;
        }, 3000);
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
