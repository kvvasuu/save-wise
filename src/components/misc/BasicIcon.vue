<template>
  <div
    class="icon"
    :style="{
      color: color,
      backgroundColor: background,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["background", "color"],
};
</script>

<style lang="scss" scoped>
.icon {
  padding: 1rem;
  margin: 0;
  border: none;
  outline: none;
  border-radius: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
</style>
