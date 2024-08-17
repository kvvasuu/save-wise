<template>
  <Transition name="notification">
    <div class="outer" v-if="visible">
      <div class="notification" :class="{ red: !type }">
        <span>{{ message }}</span>
        <i class="fa-solid fa-check" v-if="type"></i>
        <i class="fa-solid fa-xmark" v-else></i>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  computed: {
    visible() {
      return this.$store.getters.getNotificationState.state;
    },
    message() {
      return this.$store.getters.getNotificationState.message;
    },
    type() {
      return this.$store.getters.getNotificationState.type;
    },
  },
};
</script>

<style lang="scss" scoped>
.outer {
  width: 100%;
  position: absolute;
  top: 1rem;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  .notification {
    width: fit-content;
    background-color: $background-color;
    border: $border;
    border-radius: 1.6rem;
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
    z-index: 99;
    i {
      margin: 0.6rem 0 0 0;
      font-size: 1.2rem;
    }
    &.red {
      color: $color-red;
    }
  }
}
</style>
