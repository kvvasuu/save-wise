import { createRouter, createWebHistory } from "vue-router";
import AppView from "@/views/app/AppView.vue";
import RegisterPage from "@/views/auth/RegisterPage.vue";
import LoginPage from "@/views/auth/LoginPage.vue";
import PasswordReset from "@/views/auth/PasswordReset.vue";
import EditPreferences from "@/views/app/settings/EditPreferences.vue";
import EditProfile from "@/views/app/settings/EditProfile.vue";
import DashBoard from "@/views/app/DashBoard.vue";
import store from "@/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/:pathMatch(.*)*", redirect: "/" },
    {
      path: "/",
      name: "Welcome",
      component: () => import("@/views/auth/WelcomeView.vue"),
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
        {
          path: "terms",
          name: "Terms",
          component: () => import("@/views/auth/TermsAndConditions.vue"),
        },
      ],
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
          path: "",
          name: "Dashboard",
          component: DashBoard,
          meta: { title: "Dashboard" },
        },
        {
          path: "transactions",
          name: "Transactions",
          component: () => import("@/views/app/Transactions.vue"),
          meta: { title: "Transactions" },
        },
        {
          path: "accounts/:id?",
          name: "Accounts",
          component: () => import("@/views/app/Accounts/Accounts.vue"),
          meta: { title: "Accounts" },
          children: [
            {
              path: "",
              name: "Info",
              component: () => import("@/views/app/Accounts/AccountInfo.vue"),
            },
            {
              path: "new_account",
              name: "NewAccount",
              component: () => import("@/views/app/Accounts/NewAccount.vue"),
            },
          ],
        },
        {
          path: "settings",
          name: "Settings",
          component: () => import("@/views/app/settings/Settings.vue"),
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
