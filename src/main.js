import "./assets/style/main.scss";

import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import Spinner from "./components/misc/Spinner.vue";

const app = createApp(App);

app.use(router);
app.use(store);
app.component("Spinner", Spinner);

router.isReady().then(() => app.mount("#app"));
