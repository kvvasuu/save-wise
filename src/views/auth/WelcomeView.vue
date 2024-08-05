<template>
  <div class="welcome-view">
    <RouterView v-slot="{ Component }">
      <transition name="flip" mode="out-in">
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
  perspective: 100rem;
  overflow: hidden;
  background-color: $background-color-dark;
}

.flip-enter-active {
  transition: all 0.3s ease-out;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
.flip-leave-active {
  transition: all 0.3s ease-in;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.flip-leave-from {
  transform: rotateY(0deg);
}
.flip-enter-to {
  transform: rotateY(0deg);
}

.flip-enter-from {
  transform: rotateY(-90deg);
}
.flip-leave-to {
  transform: rotateY(90deg);
}
</style>
