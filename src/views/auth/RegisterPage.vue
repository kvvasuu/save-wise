<template>
  <AuthContainer :reverse="true">
    <main>Register page</main>
    <router-link to="/">Register</router-link>
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
