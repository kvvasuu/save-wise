<template>
  <div
    class="icon"
    :style="{
      color: color,
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
  width: 100%;
  height: 100%;
  margin: 0;
  border: none;
  outline: none;
  border-radius: 10rem;
}
</style>
