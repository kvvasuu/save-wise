import actions from "./actions";

const auth = {
  state() {
    return {
      userId: null,
      user: null,
      photoURL: null,
      token: null,
      rememberMe: true,
    };
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token && !!state.user;
    },
    getUserId(state) {
      return state.userId;
    },
    getUser(state) {
      return state.user;
    },
    getRememberMe(state) {
      return state.rememberMe;
    },
    getPhotoUrl(state) {
      if (!!state.user) {
        return state.photoURL;
      }
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
      state.userId = payload.userId;
    },

    setRememberMe(state, value) {
      state.rememberMe = value;
    },
    setPhotoUrl(state, payload) {
      state.photoURL = payload.photoURL;
    },
  },
  actions: actions,
};

export { auth };
