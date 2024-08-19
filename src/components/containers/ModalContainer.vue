<template>
  <div class="outer-modal" @click="closeModal">
    <div class="inner-modal" @click.stop="">
      <div class="title" v-if="$slots.title">
        <h1><slot name="title"></slot></h1>
      </div>
      <div class="content"><slot></slot></div>
      <div class="close-button" @click="closeModal" v-if="!preventClose">
        <i class="fa-solid fa-xmark"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["preventClose"]);
const emit = defineEmits(["close"]);

const closeModal = () => {
  return props.preventClose ? "" : emit("close");
};
</script>

<style lang="scss" scoped>
.outer-modal {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
  .inner-modal {
    min-height: 40rem;
    width: 60rem;
    max-width: 100%;
    min-width: 20rem;
    background-color: $background-color;
    border: none;
    border-radius: 2rem;
    margin: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 6rem;
    box-sizing: border-box;
    position: relative;
    .title {
      height: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;
      h1 {
        font-weight: 800;
        text-align: center;
      }
    }
    .content {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .close-button {
      position: absolute;
      height: 3.4rem;
      width: 3.4rem;
      right: 2rem;
      top: 2rem;
      background-color: none;
      cursor: pointer;
      text-align: center;
      border-radius: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      &:hover {
        background-color: $details-color;
      }
      i {
        font-size: 3rem;
        color: $font-color-dark;
      }
    }
  }
}
</style>
