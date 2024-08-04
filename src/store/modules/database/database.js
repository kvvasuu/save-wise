import actions from "./actions";

const database = {
  state() {
    return {
      user: null,
      token: null,
      loading: true,
    };
  },
  getters: {
    getUserDisplayName(state) {
      console.log(state.user);
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

export { database };
