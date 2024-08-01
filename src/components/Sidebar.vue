<template>
  <div class="sidebar-background">
    <div class="sidebar">
      <div class="top-section">
        <div class="logo">
          <img src="../assets/logos/logo-horizontal.svg" alt="SaveWise" />
        </div>
        <div class="list">
          <ul>
            <RouterLink to="/app" class="list-item">
              <div class="list-item-inner">
                <i class="fa-solid fa-house"></i><span>Dashboard</span>
              </div>
            </RouterLink>
            <RouterLink to="/app/settings" class="list-item">
              <div class="list-item-inner">
                <i class="fa-solid fa-file-invoice"></i
                ><span>Transactions</span>
              </div>
            </RouterLink>
            <RouterLink to="/app/settings" class="list-item">
              <div class="list-item-inner">
                <i class="fa-solid fa-user"></i><span>Accounts</span>
              </div>
            </RouterLink>
            <RouterLink to="/app/settings" class="list-item">
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
          >Logout</basic-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => this.$router.replace({ path: "/" }));
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-background {
  height: 100%;
  width: 100%;
  background: rgb(100, 133, 255);
  background: url("../assets/mask-long.png"),
    linear-gradient(35deg, rgb(190, 172, 255) 0%, rgb(54, 57, 223) 100%);
  background-blend-mode: soft-light;
  background-repeat: no-repeat;
  background-size: cover;

  .sidebar {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: rgba(97, 97, 97, 0.4);
    backdrop-filter: blur(6px);
  }
}
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 3rem 0;
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
  margin: 1rem;
  img {
    width: 90%;
  }
}

.router-link-exact-active {
  .list-item-inner {
    color: #ffcb3d !important;
  }
  &:hover {
    background-color: transparent !important;
  }
  cursor: default;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 6%;
    background-color: #ffcb3d;
    width: 0.3rem;
    height: 88%;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    transition: 0.3s ease;
  }
}

.list-item {
  width: 100%;
  position: relative;
  transition: 0.3s ease;
  &:hover {
    background-color: rgba(187, 187, 187, 0.2);
  }
  .list-item-inner {
    margin: 0 0 0 1rem;
    padding: 1rem;
    color: #fff5d9;
    display: flex;
    align-items: center;
    transition: 0.3s ease;
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
  width: 100%;
  i {
    transform: rotate(180deg);
    margin: 0 0.3rem;
  }
}
</style>
