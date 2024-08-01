<template>
  <div class="app-view">
    <div class="sidebar-outer"><Sidebar></Sidebar></div>
    <div class="center">
      <router-view v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </router-view>
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import Sidebar from "../../components/Sidebar.vue";
import RightBar from "../../components/RightBar.vue";

export default {
  components: {
    Sidebar,
    RightBar,
  },
  data() {
    return {};
  },
  methods: {
    handleBeforeUnload(event) {
      const message = "Are you sure you want to leave?";
      event.preventDefault();
      return message;
    },
  },
  mounted() {
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },
};
</script>

<style lang="scss" scoped>
.app-view {
  width: 100vw;
  height: 100dvh;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.sidebar-outer {
  width: 14rem;
  height: 100%;
}
.center {
  height: 100%;
}
</style>
