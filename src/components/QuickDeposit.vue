<template>
  <div class="widget-container" ref="containerRef">
    <BasicSpinner v-if="loading"></BasicSpinner>
    <div class="widget-no-data" v-else-if="accounts.length === 0">
      <h3>No accounts</h3>
    </div>
    <div class="inner" v-else>
      <div class="account-select">
        <div
          class="account"
          v-for="(account, index) in accounts"
          @click="selectAccount(index, account)"
          :key="index"
          :class="{
            selected: selectedAccountIndex === index,
            'not-selected':
              selectedAccountIndex !== null && selectedAccountIndex !== index,
          }"
          :title="account.accountName"
        >
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
      <div class="inputs">
        <span>Amount:</span>
        <input
          type="number"
          v-model="amount"
          min="1"
          max="9999999"
          @blur="formatInput"
          @keydown.enter="sendMoney"
        />
        <div class="currency" v-if="selectedAccountIndex !== null">
          {{ selectedAccountCurrency }}
        </div>
        <BasicButton
          @click="sendMoney"
          :disabled="selectedAccountIndex === null"
          :class="{ disabled: selectedAccountIndex === null }"
          >Send<i class="fa-solid fa-piggy-bank"></i
        ></BasicButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { gradientMap, currencyMap } from "@/assets/script";
import { onBeforeRouteLeave } from "vue-router";

const store = useStore();
const loading = ref(false);

const amount = ref(5);

const formatInput = () => {
  if (amount.value > 999999) {
    amount.value = 999999;
  } else if (amount.value < 0.01) {
    amount.value = 0.01;
  }
};

const sendMoney = () => {
  if (selectedAccountIndex.value === null) return;
  loading.value = true;

  store
    .dispatch("deposit", {
      id: selectedAccountIndex.value,
      amount: amount.value,
    })
    .finally(() => {
      loading.value = false;
    });
};

let containerRef = ref(null);
let selectedAccountIndex = ref(null);
let selectedAccountCurrency = ref(null);

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

const selectAccount = (index, account) => {
  selectedAccountCurrency.value = currencyMap[account.currency];
  selectedAccountIndex.value = index;
};

const handleClickOutside = (event) => {
  const path = event.composedPath();
  if (!path.includes(containerRef.value)) {
    selectedAccountIndex.value = null;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

onBeforeRouteLeave((to, from) => {
  if (loading.value) {
    const answer = window.confirm(
      "Do you really want to leave? You have unsaved changes!"
    );
    return !!answer;
  }
});
</script>

<style lang="scss" scoped>
.inner {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.account-select {
  height: 10rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .account {
    width: 25%;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0.8rem 0.4rem 0.6rem 0.4rem;
    margin: 0 0.1rem;
    cursor: pointer;
    background-color: none;
    transition: all 0.2s ease;
    border-radius: 1rem;
    box-sizing: border-box;
    &:hover {
      transform: translateY(-2px);
      background-color: $details-color;
    }
    &.selected {
      transform: translateY(-2px);
      background-color: $details-color;
    }
    &.not-selected {
      filter: grayscale(0.8);
    }
    .image {
      width: 3.8rem;
      height: 3.8rem;
      border-radius: 10rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      box-shadow: 0.08rem 0.08rem 0.4rem rgba(54, 54, 54, 0.1);
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
  width: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  span {
    font-size: 0.9rem;
    font-family: Montserrat;
    font-weight: 600;
    color: $font-color-light;
  }
  input {
    height: 2.2rem;
    width: 6rem;
    margin: 0 0 0 0.5rem;
    border: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &:focus {
      outline: none;
    }
  }
  .currency {
    display: flex;
    align-items: center;
    height: 2.5rem;
    position: absolute;
    top: 0;
    right: 7rem;
    color: $font-color-light;
    user-select: none;
    pointer-events: none;
  }
  button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    height: 2.2rem;
    width: 5rem;
    margin: 0;
    padding: 0 0.3rem 0 0;
    font-size: 0.9rem;
    &:hover {
      transform: none;
    }
    i {
      margin: 0 0 0 0.3rem;
    }
  }
}
@media (max-width: 704px) {
  .small-container {
    height: 18.5rem;
    width: 100%;
    max-width: 60rem;
    min-width: 22rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
}
</style>
