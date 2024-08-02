import actions from "./actions";

const auth = {
  state() {
    return {
      user: null,
      token: null,
    };
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token && !!state.user;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
    },
  },
  actions: actions,
};

export { auth };
