import { createStore } from "vuex";
import { auth } from "./auth";

const store = createStore({
  modules: {
    auth: auth,
  },
  state() {
    return {};
  },
});

export default store;
