<template>
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from "vue-router";
import LoginPage from "./views/auth/LoginPage.vue";
import RegisterPage from "./views/auth/RegisterPage.vue";

export default {
  components: {
    LoginPage,
    RegisterPage,
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("autoLogin").then(() => {
      this.$router.replace("/app");
    });
  },
};
</script>

<style lang="scss" scoped></style>
