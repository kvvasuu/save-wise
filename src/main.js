import "./assets/style/main.scss";

import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import BasicSpinner from "./components/misc/BasicSpinner.vue";
import BasicButton from "./components/misc/BasicButton.vue";

const app = createApp(App);

app.use(router);
app.use(store);
app
  .component("BasicSpinner", BasicSpinner)
  .component("BasicButton", BasicButton);

router.isReady().then(() => app.mount("#app"));
