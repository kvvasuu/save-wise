import { createRouter, createWebHistory } from "vue-router";
import AppView from "../views/app/AppView.vue";
import HomeView from "../views/app/HomeView.vue";
import Settings from "../views/app/Settings.vue";
import RegisterPage from "../views/auth/RegisterPage.vue";
import LoginPage from "../views/auth/LoginPage.vue";
import WelcomeView from "../views/auth/WelcomeView.vue";
import TermsAndConditions from "../views/auth/TermsAndConditions.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/:pathMatch(.*)*", redirect: "/" },
    {
      path: "/",
      name: "welcome",
      component: WelcomeView,
      children: [
        {
          path: "",
          name: "login",
          component: LoginPage,
        },
        {
          path: "/register",
          name: "register",
          component: RegisterPage,
        },
      ],
    },
    {
      path: "/terms",
      name: "terms",
      component: TermsAndConditions,
    },
    {
      path: "/app",
      name: "app",
      component: AppView,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "/app/settings",
          name: "settings",
          component: Settings,
        },
      ],
    },
  ],
});

export default router;
