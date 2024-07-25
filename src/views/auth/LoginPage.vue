<template>
  <AuthContainer>
    <template #left-column>
      <main>Login page</main>
      <router-link to="/app">Login</router-link>
      <router-link to="/register">Sign up</router-link>
    </template>
    <template #right-column> </template>
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

<style lang="scss" scoped></style>
