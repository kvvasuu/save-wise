import "./assets/style/main.scss";

import { createApp } from "vue";
import vueCountryRegionSelect from "vue3-country-region-select";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import BasicSpinner from "./components/misc/BasicSpinner.vue";
import BasicButton from "./components/misc/BasicButton.vue";
import BasicIcon from "./components/misc/BasicIcon.vue";
import ModalContainer from "./components/containers/ModalContainer.vue";
import NotificationContainer from "./components/containers/NotificationContainer.vue";
import Card from "./components/misc/Card.vue";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vueCountryRegionSelect);
app
  .component("BasicSpinner", BasicSpinner)
  .component("BasicButton", BasicButton)
  .component("BasicIcon", BasicIcon)
  .component("ModalContainer", ModalContainer)
  .component("NotificationContainer", NotificationContainer)
  .component("Card", Card);

router.isReady().then(() => app.mount("#app"));
