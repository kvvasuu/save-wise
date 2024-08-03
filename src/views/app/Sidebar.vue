<template>
  <div class="sidebar-background">
    <div class="sidebar">
      <div class="top-section">
        <div class="logo">
          <img src="../../assets/logos/logo-horizontal.svg" alt="SaveWise" />
        </div>
        <div class="list">
          <ul>
            <RouterLink to="/app" exact-active-class="router-active">
              <div class="list-item-inner">
                <i class="fa-solid fa-house"></i><span>Dashboard</span>
              </div>
            </RouterLink>
            <RouterLink to="/app/transactions" active-class="router-active">
              <div class="list-item-inner">
                <i class="fa-solid fa-file-invoice"></i
                ><span>Transactions</span>
              </div>
            </RouterLink>
            <RouterLink to="/app/accounts" active-class="router-active">
              <div class="list-item-inner">
                <i class="fa-solid fa-user"></i><span>Accounts</span>
              </div>
            </RouterLink>
            <RouterLink to="/app/settings" active-class="router-active">
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
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-background {
  height: 100%;
  width: 100%;
  background: rgb(100, 133, 255);
  background: url("../../assets/mask-long.png"),
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
    backdrop-filter: blur(4px);
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
  padding: 0 1rem;
  height: 5.6rem;
  img {
    width: 90%;
  }
}

.router-active {
  .list-item-inner {
    color: #ffcb3d !important;
  }
  &:hover {
    background-color: transparent !important;
  }

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
    color: #fff5d9;
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
  width: 100%;
  i {
    transform: rotate(180deg);
    margin: 0 0.3rem;
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
</style>
