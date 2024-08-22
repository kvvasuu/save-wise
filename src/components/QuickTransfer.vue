<template>
  <div class="widget-container">
    <BasicSpinner v-if="loading"></BasicSpinner>
    <div class="inner" v-else>
      <div class="account-select">
        <div class="account" v-for="account in accounts" ref="accountsRef">
          <div
            class="image"
            :style="{ background: gradientMap[account.color] }"
          >
            <span>{{ getAccountInitials(account.accountName) }}</span>
          </div>
          <div class="name">{{ account.accountName }}</div>
          <div class="currency">{{ account.currency }}</div>
        </div>
      </div>
      <div class="inputs"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { gradientMap } from "@/assets/script";
import BasicSpinner from "./misc/BasicSpinner.vue";

const store = useStore();
const loading = false;

const accountsRef = ref([]);

const accounts = computed(() => {
  return store.getters.getAccountsInfo;
});

const getAccountInitials = (accountName) => {
  return accountName
    .split(" ")
    .map((el) => el.split("")[0].toUpperCase())
    .slice(0, 2)
    .join("");
};
console.log(accountsRef);
</script>

<style lang="scss" scoped>
.widget-container {
  height: 100%;
  width: 100%;
  background-color: $background-color;
  border-radius: 1rem;
  position: relative;
  box-shadow: 0.08rem 0.8rem 0.4rem rgba(54, 54, 54, 0.1);
  padding: 1rem 1rem;
  margin: 0.4rem 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inner {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.account-select {
  height: 10rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .account {
    height: 100%;
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 0.6rem;
    cursor: pointer;
    background-color: none;
    &:hover .image {
      background-color: $details-color;
      transform: translateY(-2px);
      color: rgba(223, 223, 223, 0.836);
    }
    .image {
      width: 3.8rem;
      height: 3.8rem;
      border-radius: 10rem;
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
    .name,
    .currency {
      font-size: 0.6rem;
      font-family: Montserrat;
      font-weight: 600;
    }
    .name {
      margin: 0.6rem 0 0.2rem 0;
      width: 100%;
      text-overflow: ellipsis;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
    }
    .currency {
      color: $font-color-light;
    }
  }
}

.inputs {
  height: 2.5rem;
  width: 100%;
}
</style>
