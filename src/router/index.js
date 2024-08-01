import { createRouter, createWebHistory } from "vue-router";
import AppView from "../views/app/AppView.vue";
import DashBoard from "../views/app/DashBoard.vue";
import Settings from "../views/app/Settings.vue";
import RegisterPage from "../views/auth/RegisterPage.vue";
import LoginPage from "../views/auth/LoginPage.vue";
import PasswordReset from "@/views/auth/PasswordReset.vue";
import WelcomeView from "../views/auth/WelcomeView.vue";
import TermsAndConditions from "../views/auth/TermsAndConditions.vue";
import Transactions from "../views/app/Transactions.vue";
import Accounts from "../views/app/Accounts.vue";
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/:pathMatch(.*)*", redirect: "/" },
    {
      path: "/",
      name: "welcome",
      component: WelcomeView,
      meta: { requiresUnauth: true },
      beforeEnter: (to, from) => {
        if (to.meta.requiresUnauth && store.getters.isLoggedIn) {
          router.push("/app");
        } else {
          return true;
        }
      },
      children: [
        {
          path: "",
          name: "login",
          component: LoginPage,
        },
        {
          path: "register",
          name: "register",
          component: RegisterPage,
        },
        {
          path: "passwordReset",
          name: "passwordReset",
          component: PasswordReset,
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
      meta: { requiresAuth: true },
      beforeEnter: (to, from) => {
        if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
          router.push("/");
        } else {
          return true;
        }
      },
      children: [
        {
          path: "",
          name: "Dashboard",
          component: DashBoard,
        },
        {
          path: "transactions",
          name: "Transactions",
          component: Transactions,
        },
        {
          path: "accounts",
          name: "Accounts",
          component: Accounts,
        },
        {
          path: "settings",
          name: "Settings",
          component: Settings,
        },
      ],
    },
  ],
});

export default router;
