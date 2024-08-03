import { createRouter, createWebHistory } from "vue-router";
import AppView from "../views/app/AppView.vue";
import DashBoard from "../views/app/DashBoard.vue";
import Settings from "../views/app/settings/Settings.vue";
import RegisterPage from "../views/auth/RegisterPage.vue";
import LoginPage from "../views/auth/LoginPage.vue";
import PasswordReset from "@/views/auth/PasswordReset.vue";
import WelcomeView from "../views/auth/WelcomeView.vue";
import TermsAndConditions from "../views/auth/TermsAndConditions.vue";
import Transactions from "../views/app/Transactions.vue";
import Accounts from "../views/app/Accounts.vue";
import EditPreferences from "../views/app/settings/EditPreferences.vue";
import EditProfile from "../views/app/settings/EditProfile.vue";
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/:pathMatch(.*)*", redirect: "/" },
    {
      path: "/",
      name: "Welcome",
      component: WelcomeView,
      meta: { requiresUnauth: true },
      beforeEnter: (to, from, next) => {
        if (to.meta.requiresUnauth && store.getters.isLoggedIn) {
          next("/app");
        } else {
          next();
        }
      },
      children: [
        {
          path: "",
          name: "Login",
          component: LoginPage,
        },
        {
          path: "register",
          name: "Register",
          component: RegisterPage,
        },
        {
          path: "passwordReset",
          name: "PasswordReset",
          component: PasswordReset,
        },
      ],
    },
    {
      path: "/terms",
      name: "Terms",
      component: TermsAndConditions,
    },
    {
      path: "/app",
      name: "App",
      component: AppView,
      meta: { requiresAuth: true, title: "Dashboard" },
      beforeEnter: (to, from, next) => {
        if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
          next("/welcome");
        } else {
          next();
        }
      },
      children: [
        {
          path: "app",
          name: "Dashboard",
          component: DashBoard,
          meta: { title: "Dashboard" },
        },
        {
          path: "transactions",
          name: "Transactions",
          component: Transactions,
          meta: { title: "Transactions" },
        },
        {
          path: "accounts",
          name: "Accounts",
          component: Accounts,
          meta: { title: "Accounts" },
        },
        {
          path: "settings",
          name: "Settings",
          component: Settings,
          meta: { title: "Settings" },
          children: [
            {
              path: "",
              name: "EditProfile",
              component: EditProfile,
            },
            {
              path: "preferences",
              name: "EditPreferences",
              component: EditPreferences,
            },
          ],
        },
      ],
    },
  ],
});

export default router;
