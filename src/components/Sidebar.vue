<template>
  <div class="sidebar">
    <div class="logo">
      <img src="../assets/logos/logo-horizontal.png" alt="SaveWise" />
    </div>
    <div class="list">
      <ul>
        <RouterLink to="/app" class="list-item">
          <div class="list-item-inner">
            <i class="fa-solid fa-house"></i><span> Dashboard </span>
          </div>
        </RouterLink>
        <RouterLink to="/app/settings" class="list-item">
          <div class="list-item-inner">
            <i class="fa-solid fa-gear"></i><span> Settings</span>
          </div>
        </RouterLink>
      </ul>
    </div>
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
  border-right: 1px solid rgb(228, 228, 228);
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
  padding: 0.3rem 3.6rem 0.3rem 0;
  img {
    width: 100%;
  }
}

.router-link-exact-active {
  .list-item-inner {
    color: #6485ff !important;
  }
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 6%;
    background-color: #6485ff;
    width: 0.3rem;
    height: 88%;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    transition: 0.6s ease;
  }
}

a {
  .list-item-inner {
    color: #6f7ca1;
  }
  &::before {
    content: "";
    background-color: #6486ff00;
  }
}

.list-item {
  width: 100%;
  position: relative;
  .list-item-inner {
    padding: 1rem;
    color: #6f7ca1;
    display: flex;
    align-items: center;
    transition: 0.6s ease;
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
</style>
