<template>
  <div class="sidebar">
    <div class="logo">LOGO</div>
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
  border-left: 2px solid rgb(228, 228, 228);
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
</style>
