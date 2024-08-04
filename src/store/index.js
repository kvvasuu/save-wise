import { createStore } from "vuex";
import { auth } from "./modules/auth/auth";
import { database } from "./modules/database/database";

const store = createStore({
  modules: {
    auth: auth,
    database: database,
  },
  state() {
    return {
      loading: true,
    };
  },
  getters: {
    isLoading(state) {
      return state.loading;
    },
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
  },
});

export default store;
