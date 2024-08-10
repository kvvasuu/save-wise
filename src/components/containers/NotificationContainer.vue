<template>
  <Teleport to="#center">
    <Transition name="notification">
      <div class="notification" v-if="visible">
        <slot></slot>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    show() {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
.notification {
  position: absolute;
  top: 1rem;
  left: calc(50% - 5rem);
  height: 4rem;
  width: 12rem;
  max-width: 100%;
  min-width: 10rem;
  background-color: $background-color;
  border: $border;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  box-sizing: border-box;
  box-shadow: 0.1rem 0.2rem 0.6rem rgba(128, 128, 128, 0.2);
  font-family: Montserrat;
  font-weight: 600;
  color: $primary-color;
}
</style>
