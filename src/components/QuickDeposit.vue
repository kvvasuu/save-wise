<template>
  <div class="widget-container" ref="containerRef">
    <BasicSpinner v-if="loading"></BasicSpinner>
    <div class="inner" v-else>
      <div class="account-select">
        <div
          class="account"
          v-for="(account, index) in accounts"
          @click="selectAccount(index)"
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
        />
        <BasicButton
          @click="sendMoney"
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
import { gradientMap } from "@/assets/script";
import BasicSpinner from "./misc/BasicSpinner.vue";

const store = useStore();
const loading = ref(false);

const amount = ref(5);

const formatInput = () => {
  if (amount.value > 999999) {
    amount.value = 999999;
  } else if (amount.value < 1) {
    amount.value = 1;
  }
};

const sendMoney = () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 2000);
};

let containerRef = ref(null);
let selectedAccountIndex = ref(null);

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

const selectAccount = (index) => {
  selectedAccountIndex.value = index;
};

const handleClickOutside = (event) => {
  if (!containerRef.value.contains(event.target)) {
    selectedAccountIndex.value = null;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
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
  display: flex;
  align-items: center;
  justify-content: center;
}
.inner {
  height: 100%;
  width: 100%;
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    height: 2.2rem;
    width: 5rem;
    margin: 0;
    padding: 0 0.3rem 0 0;
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
