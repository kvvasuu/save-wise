import { createStore } from "vuex";
import { auth } from "./auth";

const store = createStore({
  modules: {
    authe: auth,
  },
  state() {
    return {};
  },
});

export default store;
