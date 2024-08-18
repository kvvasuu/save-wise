<template>
  <div class="outer-modal" @click="cancel">
    <div class="inner-modal" @click.stop="">
      <div class="title" v-if="$slots.title">
        <h1><slot name="title"></slot></h1>
      </div>
      <div class="content"><slot></slot></div>
      <div class="buttons">
        <basic-button class="red" @click="cancel">Cancel</basic-button>
        <basic-button class="green" @click="confirm">Confirm</basic-button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["cancel", "confirm"]);

const confirm = () => {
  emit("confirm");
};

const cancel = () => {
  emit("cancel");
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
    max-height: 100%;
    height: 20rem;
    min-height: 10rem;
    width: 30rem;
    max-width: 100%;
    min-width: 20rem;
    background-color: $background-color;
    border: none;
    border-radius: 2rem;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    box-sizing: border-box;
    box-shadow: 0.3rem 0.4rem 0.6rem rgba(128, 128, 128, 0.2);
    .title {
      height: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h1 {
        font-weight: 800;
      }
    }
    .content {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
}
button {
  margin: 0.5rem;
}
</style>
