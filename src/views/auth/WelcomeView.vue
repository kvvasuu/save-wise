<template>
  <div class="welcome-view">
    <RouterView v-slot="{ Component }">
      <transition mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
</script>

<style lang="scss" scoped>
.welcome-view {
  width: 100vw;
  height: 100dvh;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
</style>
