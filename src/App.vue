<template>
  <basic-spinner v-if="$store.getters.isLoading"></basic-spinner>
  <RouterView v-else></RouterView>
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
  created() {
    this.$store.dispatch("autoLogin");
  },
};
</script>

<style lang="scss" scoped></style>
