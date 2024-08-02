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
  actions: actions,
};

export { auth };
