<template>
  <div class="container" :class="{ reverse: reverse }">
    <div class="column left">
      <slot name="left-column"></slot>
    </div>

    <div class="column right">
      <slot name="right-column"></slot>
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
  border-radius: 2rem;
  margin: 2rem;
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
        linear-gradient(210deg, rgb(185, 166, 255) 0%, rgb(37, 68, 206) 100%);
      background-blend-mode: soft-light;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  &.reverse {
    flex-direction: row-reverse;
  }
}
</style>
