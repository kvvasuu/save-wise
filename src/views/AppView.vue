<template>
  <div class="sidebar-left"><Sidebar></Sidebar></div>
  <div class="center"><RouterView /></div>
  <div class="sidebar-right"><RightBar></RightBar></div>
</template>

<script>
import { RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import RightBar from "./components/RightBar.vue";

export default {
  components: {
    Sidebar,
    RightBar,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.sidebar-left {
  grid-area: 1 / 1 / 2 / 2;
}
.center {
  grid-area: 1 / 2 / 2 / 3;
}
.sidebar-right {
  grid-area: 1 / 3 / 2 / 4;
}
</style>
