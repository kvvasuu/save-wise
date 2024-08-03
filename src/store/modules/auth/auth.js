import actions from "./actions";

const auth = {
  state() {
    return {
      userId: null,
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
    getUserId(state) {
      return state.userId;
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
      state.userId = payload.userId;
    },
    setLoading(state, value) {
      state.loading = value;
    },
  },
  actions: actions,
};

export { auth };
