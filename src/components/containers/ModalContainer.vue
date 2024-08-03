<template>
  <div class="outer-modal">
    <div class="inner-modal">
      <div class="title" v-if="$slots.title">
        <h1><slot name="title"></slot></h1>
      </div>
      <div class="content"><slot></slot></div>
    </div>
  </div>
</template>

<script></script>

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
  .inner-modal {
    height: 40rem;
    width: 60rem;
    background-color: #fff;
    border: none;
    border-radius: 2rem;
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
      height: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
