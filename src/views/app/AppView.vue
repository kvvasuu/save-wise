<template>
  <div class="app-view">
    <div class="sidebar-outer" :class="{ 'show-sidebar': sidebarVisible }">
      <Sidebar
        @hide-sidebar="hideSidebar"
        :sidebarVisible="sidebarVisible"
      ></Sidebar>
    </div>
    <div class="center" id="center" :class="{ 'show-sidebar': sidebarVisible }">
      <notification-container>
        <span>{{ notificationMessage }}</span>
      </notification-container>
      <div class="navbar">
        <div class="menu-button" @click="showSidebar">
          <i class="fa-solid fa-bars"></i>
        </div>
        <div class="title">
          <h2>{{ $route.meta.title }}</h2>
        </div>
        <div class="user">
          <Transition name="slide-vertical" mode="out-in">
            <div class="username" :key="displayName">
              <h4>{{ displayName }}</h4>
            </div>
          </Transition>
          <div class="avatar-wrapper" @click="goToSettings">
            <user-avatar></user-avatar>
          </div>
        </div>
      </div>
      <div class="app-container">
        <router-view v-slot="{ Component }">
          <Transition name="slide-appcontainer" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </div>
    <Transition name="fade">
      <modal-container v-if="welcomeScreen" :preventClose="true">
        <template #title>Welcome to SaveWise!</template>
        <p>
          We're excited to have you on board. To get the most out of SaveWise,
          we recommend you complete your profile information in the "Settings"
          panel.
        </p>

        <ul>
          <p>By doing so, you'll be able to:</p>
          <li>Set personalized saving goals</li>
          <li>Receive tailored insights and recommendations</li>
          <li>Enhance your overall experience</li>
        </ul>

        <p>Ready to get started?</p>
        <div class="button">
          <basic-button @click="toggleWelcomeScreen">
            Go to Settings
          </basic-button>
        </div>
      </modal-container>
    </Transition>
  </div>
</template>

<script>
import { RouterView, RouterLink } from "vue-router";
import Sidebar from "./Sidebar.vue";
import UserAvatar from "@/components/misc/UserAvatar.vue";

export default {
  components: {
    Sidebar,
    UserAvatar,
  },
  data() {
    return {
      sidebarVisible: false,
      welcomeScreen: false,
    };
  },
  computed: {
    displayName() {
      return this.$store.getters.getUserDisplayName;
    },
  },
  methods: {
    createInitialDatabaseRecord(data) {
      const userId = this.$store.getters.getUserId;
      const email = this.$store.getters.getUser.email;

      if (data === null) {
        this.$store
          .dispatch("setInitialUserData", {
            userId: userId,
            email: email,
          })
          .then(() => {
            this.toggleWelcomeScreen();
          });
      }
    },
    toggleWelcomeScreen() {
      this.welcomeScreen = !this.welcomeScreen;
      if (!this.welcomeScreen) {
        this.goToSettings();
      }
    },
    handleBeforeUnload(event) {
      if (!this.$store.getters.getRememberMe) {
        event.preventDefault();
        this.$store.dispatch("logout").then(() => {
          return "";
        });
      }
    },
    showSidebar() {
      this.sidebarVisible = true;
    },
    hideSidebar() {
      this.sidebarVisible = false;
    },
    goToSettings() {
      this.$router.replace("/app/settings");
    },
  },
  mounted() {
    this.$store
      .dispatch("getUserData")
      .then((data) => this.createInitialDatabaseRecord(data));
  },
  created() {
    if (!this.$store.getters.getRememberMe) {
      window.addEventListener("beforeunload", this.handleBeforeUnload);
    }
  },
  beforeDestroy() {
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
  position: relative;
  overflow-x: hidden;
}

.sidebar-outer {
  width: 14rem;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  transition: all 0.6s ease;
}
.center {
  position: absolute;
  top: 0;
  left: 14rem;
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
    z-index: 9;
    overflow: hidden;
    border-bottom: $border;
    .menu-button {
      display: none;
      cursor: pointer;
      i {
        font-size: 2rem;
      }
    }
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      user-select: none;
      h1 {
        font-weight: 700;
      }
    }
    .user {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .username {
        margin: 0 1rem;
      }
      .avatar-wrapper {
        height: 3rem;
        width: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
  .app-container {
    background-color: $background-color-dark;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    min-height: calc(100% - 5.6rem);
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;
  }
}

@media (max-width: 1024px) {
  .sidebar-outer {
    left: -30rem;
    &.show-sidebar {
      left: 0;
    }
  }
  .center {
    left: 0;
    width: 100%;

    .navbar {
      padding: 0 2rem 0 0;
      .menu-button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 6rem;
      }
      .title {
        &.show-sidebar {
          display: none;
        }
      }
      .user {
        .username {
          display: none;
        }
      }
    }
  }
}
</style>
