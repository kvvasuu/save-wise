<template>
  <div class="app-view">
    <div class="sidebar-outer"><Sidebar></Sidebar></div>

    <div class="center">
      <div class="navbar">
        <div class="title">
          <h2>{{ $route.name }}</h2>
        </div>
        <div class="other">
          <div class="buttons">
            <div class="button">
              <basic-icon :color="'red'"
                ><i class="fa-solid fa-gear"></i
              ></basic-icon>
            </div>
          </div>
          <div class="avatar-wrapper"><user-avatar></user-avatar></div>
        </div>
      </div>
      <div class="app-container">
        <router-view v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import Sidebar from "../../components/Sidebar.vue";
import RightBar from "../../components/RightBar.vue";
import UserAvatar from "@/components/misc/UserAvatar.vue";

export default {
  components: {
    Sidebar,
    RightBar,
    UserAvatar,
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
  width: calc(100% - 14rem);
  .navbar {
    height: 5.6rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    box-sizing: border-box;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      h1 {
        font-weight: 700;
      }
    }
    .other {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 30%;
      .buttons {
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        .button {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .avatar-wrapper {
        height: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .app-container {
    background-color: #f5f6fa;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    height: calc(100% - 5.6rem);
    width: 100%;
  }
}
</style>
