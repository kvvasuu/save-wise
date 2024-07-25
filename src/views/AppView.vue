<template>
  <div class="app-view">
    <div class="sidebar-left"><Sidebar></Sidebar></div>
    <div class="center"><RouterView /></div>
    <div class="sidebar-right"><RightBar></RightBar></div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import Sidebar from "../components/Sidebar.vue";
import RightBar from "../components/RightBar.vue";

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
.app-view {
  min-width: 100vw;
  min-height: 100dvh;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 15fr 70fr 20fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0;
  grid-row-gap: 0;
}

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
