import { createStore } from "vuex";
import { auth } from "./modules/auth/auth";
import { database } from "./modules/database/database";

const store = createStore({
  modules: {
    auth: auth,
    database: database,
  },
  state() {
    return {};
  },
});

export default store;
