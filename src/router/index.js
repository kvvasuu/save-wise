import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Settings from "../views/Settings.vue";
import RegisterPage from "../views/auth/RegisterPage.vue";
import LoginPage from "../views/auth/LoginPage.vue";
import AppView from "../views/AppView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
    },
    {
      path: "/app",
      name: "app",
      component: AppView,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/settings",
          name: "settings",
          component: Settings,
        },
      ],
    },
  ],
});

export default router;
