import { createStore } from "vuex";
import { auth } from "./modules/auth/auth";
import { database } from "./modules/database/database";
import { notifications } from "./modules/notifications/notifications";

const store = createStore({
  modules: {
    auth: auth,
    database: database,
    notifications: notifications,
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
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
});

export default store;
