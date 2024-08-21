<template>
  <div class="widget-container">
    <div class="account-select">
      <div class="account" v-for="account in accounts">
        <div class="image">
          <span>MA</span>
        </div>
        <div class="name"></div>
        <div class="currency"></div>
      </div>
    </div>
    <div class="inputs"></div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const accounts = computed(() => {
  return store.getters.getAccountsInfo;
});

console.log(accounts.value);
</script>

<style lang="scss" scoped>
.widget-container {
  height: 100%;
  width: 100%;
  background-color: $background-color;
  border-radius: 1rem;
  position: relative;
  box-shadow: 0.1rem 0.2rem 0.5rem rgba(54, 54, 54, 0.2);
  padding: 1rem 1rem;
  margin: 0.4rem 0;
  box-sizing: border-box;
}

.account-select {
  height: 10rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .account {
    height: 100%;
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 0.8rem;
    cursor: pointer;
    background-color: none;
    &:hover .image {
      background-color: $details-color;
      transform: translateY(-2px);
      color: rgba(114, 114, 114, 0.836);
    }
    .image {
      width: 4rem;
      height: 4rem;
      border-radius: 10rem;
      background-color: red;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      box-shadow: 0.1rem 0.2rem 0.5rem rgba(54, 54, 54, 0.2);
      color: rgba(255, 255, 255, 0.836);
      span {
        font-size: 1.5rem;
        font-family: Montserrat;
        font-weight: 900;
      }
    }
  }
}

.inputs {
  height: 2.5rem;
  width: 100%;
}
</style>
