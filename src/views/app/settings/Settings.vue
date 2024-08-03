<template>
  <main>
    <div class="navbar">
      <ul>
        <RouterLink :to="{ name: 'EditProfile' }">
          <div class="list-item-inner">Edit Profile</div>
        </RouterLink>
        <RouterLink :to="{ name: 'EditPreferences' }">
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
      transition: 0.3s ease;
      .list-item-inner {
        color: #828a9e;
        padding: 0.8rem 1.6rem;
        display: flex;
        align-items: center;
        transition: 0.3s ease;
        font-family: Montserrat;
        font-weight: 600;
        font-size: 0.9rem;
        text-align: center;
        &.active {
          color: #6485ff;
        }
      }
    }
  }
}
</style>
