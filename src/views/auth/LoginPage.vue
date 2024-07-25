<template>
  <AuthContainer>
    <template #left-column>
      <main>Login page</main>
      <router-link to="/app">Login</router-link>
      <router-link to="/register">Sign up</router-link>
    </template>
    <template #right-column>
      <img src="../../assets/logos/logo-tagline.svg" alt="" />
    </template>
  </AuthContainer>
</template>

<script>
import { RouterLink } from "vue-router";
import AuthContainer from "@/components/containers/AuthContainer.vue";

export default {
  components: {
    AuthContainer,
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
