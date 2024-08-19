<template>
  <div class="sidebar-background">
    <div class="sidebar">
      <div class="top-section">
        <div class="logo" @click="goToDashboard">
          <img
            src="../../assets/logos/logo-horizontal.png"
            alt="SaveWise"
            draggable="false"
          />
        </div>
        <div class="list">
          <ul>
            <RouterLink
              to="/app"
              exact-active-class="router-active"
              @click="hideSidebar"
              draggable="false"
            >
              <div class="list-item-inner">
                <i class="fa-solid fa-house"></i><span>Dashboard</span>
              </div>
            </RouterLink>
            <RouterLink
              to="/app/accounts"
              @click="hideSidebar"
              draggable="false"
              :class="{ 'router-active': isRouteActive }"
            >
              <div class="list-item-inner">
                <i class="fa-solid fa-user"></i><span>Accounts</span>
              </div>
            </RouterLink>
            <RouterLink
              to="/app/transactions"
              active-class="router-active"
              @click="hideSidebar"
              draggable="false"
            >
              <div class="list-item-inner">
                <i class="fa-solid fa-file-invoice"></i
                ><span>Transactions</span>
              </div>
            </RouterLink>
            <RouterLink
              to="/app/settings"
              active-class="router-active"
              @click="hideSidebar"
              draggable="false"
            >
              <div class="list-item-inner">
                <i class="fa-solid fa-gear"></i><span>Settings</span>
              </div>
            </RouterLink>
          </ul>
        </div>
      </div>
      <div class="footer">
        <basic-button @click="logout"
          ><i class="fa-solid fa-arrow-right-from-bracket"></i
          ><span>Logout</span></basic-button
        >
      </div>
    </div>
    <div class="sidebar-modal" @click="hideSidebar" v-if="sidebarVisible"></div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import {} from "vue-router";
import { computed } from "vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

const emits = defineEmits(["hideSidebar"]);
const props = defineProps(["sidebarVisible"]);

const logout = () => {
  store.dispatch("logout").finally(() => {
    router.replace("/");
  });
};

const hideSidebar = () => {
  emits("hideSidebar");
};

const goToDashboard = () => {
  hideSidebar();
  router.push("/app");
};

const isRouteActive = computed(() => {
  return route.path.startsWith("/app/accounts");
});
</script>

<style lang="scss" scoped>
.sidebar-background {
  height: 100%;
  width: 100%;
  background-color: $background-color-darker;
  position: relative;
  .sidebar-modal {
    position: absolute;
    height: 100%;
    width: 100vw;
    top: 0;
    left: 100%;
  }
  .sidebar {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    overflow-y: auto;
  }
}
.top-section {
  width: 100%;
  margin: 0 0 3rem 0;
}
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 3rem 0 0 0;
  user-select: none;
}
ul {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  width: 100%;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  height: 5.6rem;
  cursor: pointer;
  img {
    width: 90%;
  }
}

.router-active {
  .list-item-inner {
    color: $primary-color !important;
  }
  &:hover {
    background-color: transparent !important;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 6%;
    background-color: $primary-color;
    width: 0.3rem;
    height: 88%;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    animation: linkAppear 0.4s ease forwards;
  }
}

a {
  width: 100%;
  position: relative;
  transition: 0.3s ease;
  &:hover {
    background-color: rgba(187, 187, 187, 0.2);
  }
  .list-item-inner {
    margin: 0 0 0 1rem;
    padding: 1rem;
    color: $background-color-dark;
    display: flex;
    align-items: center;
    transition: 0.4s ease;
    i {
      font-size: 1.6rem;
      margin: 0 1rem 0 0.2rem;
      width: 2rem;
      text-align: center;
    }
    span {
      font-family: Montserrat;
      font-weight: 600;
    }
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  i {
    transform: rotate(180deg);
    margin: 0 0.3rem 0 0;
  }
}

@keyframes linkAppear {
  0% {
    height: 0%;
    top: 50%;
    left: 0;
  }
  100% {
    top: 6%;
    height: 88%;
    left: 0;
  }
}

@media (max-height: 460px) {
  .list {
    margin: 0;
  }
  .footer {
    button {
      margin: 0 0 2rem 0;
    }
  }
}
</style>
