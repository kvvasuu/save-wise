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
      beforeEnter: (to, from) => {
        if (to.meta.requiresUnauth && store.getters.isLoggedIn) {
          router.push({ name: "App" });
        } else {
          return true;
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
      meta: { requiresAuth: true },
      beforeEnter: (to, from) => {
        if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
          router.push({ name: "Welcome" });
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
