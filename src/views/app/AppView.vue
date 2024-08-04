<template>
  <div class="app-view">
    <div class="sidebar-outer"><Sidebar></Sidebar></div>
    <div class="center">
      <div class="navbar">
        <div class="title">
          <h2>{{ $route.meta.title }}</h2>
        </div>
        <div class="user">
          <div class="username">
            <h4>{{ displayName }}</h4>
          </div>
          <div class="avatar-wrapper"><user-avatar></user-avatar></div>
        </div>
      </div>
      <div class="app-container">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </div>
    <Transition name="fade">
      <modal-container v-if="welcomeScreen">
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
        this.$router.push("app/settings");
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
    padding: 2rem;
    box-sizing: border-box;
  }
}

.content {
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
  }
}
</style>
