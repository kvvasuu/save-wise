<template>
  <main>
    <div class="navbar">
      <ul>
        <RouterLink to="/app/settings" exact-active-class="router-active">
          <div class="list-item-inner">Edit Profile</div>
        </RouterLink>
        <RouterLink to="/app/settings/preferences" active-class="router-active">
          <div class="list-item-inner">Preferences</div>
        </RouterLink>
      </ul>
    </div>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </main>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
</script>

<style lang="scss" scoped>
main {
  height: 100%;
  width: 100%;
  background-color: #fff;
  border: none;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
  box-shadow: 0.3rem 0.4rem 0.6rem rgba(128, 128, 128, 0.2);
}

.navbar {
  height: 4rem;
  width: 100%;
  ul {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
    width: 100%;
    a {
      list-style: none;
      cursor: pointer;
      position: relative;
      .list-item-inner {
        color: #828a9e;
        padding: 0.8rem 1.6rem;
        display: flex;
        align-items: center;
        transition: 0.4s ease;
        font-family: Montserrat;
        font-weight: 600;
        font-size: 0.9rem;
        text-align: center;
      }
    }
    .router-active {
      .list-item-inner {
        color: #6485ff;
      }
      &:hover {
        background-color: transparent !important;
      }
      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        background-color: #6485ff;
        height: 0.2rem;
        width: 0%;
        border-top-right-radius: 1rem;
        border-top-left-radius: 1rem;
        animation: linkAppear 0.4s ease forwards;
      }
    }
  }
}

@keyframes linkAppear {
  0% {
    width: 0%;
    left: 50%;
    bottom: 0;
  }
  100% {
    left: 6%;
    width: 88%;
    bottom: 0;
  }
}
</style>
