import actions from "./actions";

const auth = {
  state() {
    return {
      user: {},
      token: null,
    };
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
  actions: actions,
};

export { auth };
