<template>
  <div class="outer-modal" @click="closeModal">
    <div class="inner-modal" @click.stop="">
      <div class="title" v-if="$slots.title">
        <h1><slot name="title"></slot></h1>
      </div>
      <div class="content"><slot></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["preventClose"],
  emits: ["close"],
  methods: {
    closeModal() {
      return this.preventClose ? "" : this.$emit("close");
    },
  },
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
    height: 40rem;
    width: 60rem;
    max-width: 100%;
    min-width: 20rem;
    background-color: #fff;
    border: none;
    border-radius: 2rem;
    margin: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 6rem;
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
    }
  }
}
</style>
