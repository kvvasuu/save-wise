<template>
  <div class="sidebar">
    <div class="logo">
      <img src="../assets/logos/logo-horizontal.png" alt="SaveWise" />
    </div>
    <div class="list">
      <ul>
        <RouterLink to="/app">Home</RouterLink>
        <RouterLink to="/app/settings">Settings</RouterLink>
      </ul>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  width: 100%;
  border-right: 1px solid rgb(228, 228, 228);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
}
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
ul {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2eeff;
  border: none;
  border-radius: 3rem;
  margin: 1rem;
  padding: 0.3rem 1.8rem;
  img {
    width: 100%;
  }
}
</style>
