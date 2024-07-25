<template>
  <AuthContainer :reverse="true">
    <div class="container"></div>
    <main>Sign up</main>
    <router-link to="/">Login</router-link>
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
