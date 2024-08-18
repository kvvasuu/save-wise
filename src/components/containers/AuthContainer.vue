<template>
  <div class="container" :class="{ reverse: reverse }">
    <div class="column left">
      <div class="inner-container">
        <slot></slot>
      </div>
    </div>
    <div class="column right">
      <div class="inner">
        <div class="logo">
          <img
            src="../../assets/logos/logo-tagline-horizontal.svg"
            alt="SaveWise"
            draggable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["reverse"]);
</script>

<style lang="scss" scoped>
.container {
  width: 60rem;
  aspect-ratio: 6 / 4;
  border-radius: 1.6rem;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  box-shadow: 0.3rem 0.3rem 1rem rgba(128, 128, 128, 0.2);
  overflow: hidden;
  .column {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &.left {
      background-color: $background-color;
    }
    &.right {
      background: $primary-color;
      background: url("../../assets/mask.png"),
        linear-gradient(210deg, $primary-color 0%, $primary-color-dark 100%);
      background-blend-mode: soft-light;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  &.reverse {
    flex-direction: row-reverse;
  }
  .inner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 2rem;
    width: 100%;
    height: 100%;
  }
  .logo {
    padding: 2rem;
    img {
      height: 100%;
      width: 100%;
    }
  }
}

@media (max-width: 600px) {
  .container {
    width: 40rem;
    height: 90%;
    aspect-ratio: auto;
    margin: 1rem;
    flex-direction: column-reverse;
    &.reverse {
      flex-direction: column-reverse;
    }
    .column {
      width: 100%;
      height: 50%;
      justify-content: center;
      &.left {
        background-color: $background-color;
        height: 70%;
        display: flex;
        align-items: start;
        justify-content: center;
      }
      &.right {
        background: $primary-color;
        background: url("../../assets/mask.png"),
          linear-gradient(210deg, $primary-color 0%, $primary-color-dark 100%);
        background-blend-mode: soft-light;
        background-repeat: no-repeat;
        background-size: cover;
        height: 30%;
      }
    }
  }
}
</style>
