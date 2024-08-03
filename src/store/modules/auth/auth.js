import actions from "./actions";

const auth = {
  state() {
    return {
      user: null,
      token: null,
      loading: true,
    };
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token && !!state.user;
    },
    isLoading(state) {
      return state.loading;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
    },
    setLoading(state, value) {
      state.loading = value;
    },
  },
  actions: actions,
};

export { auth };
