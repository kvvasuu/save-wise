<template>
  <div class="container" :class="{ reverse: reverse }">
    <div class="column left">
      <slot></slot>
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

<script>
export default {
  props: ["reverse"],
};
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
  box-shadow: 0.3rem 0.3rem 1rem #1e24384f;
  overflow: hidden;
  .column {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &.left {
      background-color: #ffffff;
    }
    &.right {
      background: rgb(100, 133, 255);
      background: url("../../assets/mask.png"),
        linear-gradient(210deg, rgb(190, 172, 255) 0%, rgb(54, 57, 223) 100%);
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
</style>
