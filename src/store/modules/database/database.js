import actions from "./actions";
import getters from "./getters";

const database = {
  state() {
    return {
      user: null,
    };
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
    setFavorite(state, payload) {
      state.user.accounts[payload.id].favorite = payload.favorite;
    },
  },
  getters: getters,
  actions: actions,
};

export { database };
