<template>
  <div class="outer">
    <BasicSpinner v-if="!accounts || loading"></BasicSpinner>
    <div class="inner" v-else>
      <div class="account-select">
        <h3
          :class="{
            'not-selected': selectAccountModal,
          }"
        >
          Select account
        </h3>
        <div
          class="current-account"
          :class="{
            'not-selected': selectAccountModal,
          }"
          @click="showSelectAccountModal"
        >
          <div
            class="image"
            :style="{
              background: gradientMap[selectedAccount.color],
            }"
          >
            <span>{{ getAccountInitials(selectedAccount.name) }}</span>
          </div>
          <div class="name">
            {{ selectedAccount.name }}
          </div>
          <div class="currency">
            {{ selectedAccount.currency }}
          </div>
        </div>
        <Transition name="fade-scale">
          <div class="account-select-modal" v-show="selectAccountModal">
            <div
              class="account"
              v-for="(account, index) in accounts"
              @click="selectAccount(index, account)"
              :key="index"
              :title="account.accountName"
              ref="containerRef"
              :class="{
                'no-selected': selectedAccountIndex !== index,
              }"
              :style="getCircleItemStyle(index)"
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
        </Transition>
      </div>
      <div class="form"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onUnmounted, ref } from "vue";
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
  /*
  store
    .dispatch("quickDeposit", {
      id: selectedAccountIndex.value,
      amount: amount.value,
    })
    .finally(() => {
      loading.value = false;
    }); */
};

const containerRef = ref(null);

const selectedAccountIndex = ref(0);
const selectedAccountCurrency = ref(null);
const selectAccountModal = ref(false);

const showSelectAccountModal = () => {
  selectAccountModal.value = true;
  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 500);
};

const hideSelectAccountModal = () => {
  selectAccountModal.value = false;
  document.removeEventListener("click", handleClickOutside);
};

const accounts = computed(() => {
  return store.getters.getAccountsInfo || [];
});

const selectedAccount = computed(() => {
  const account = accounts.value[selectedAccountIndex.value];
  return account
    ? {
        name: account.accountName,
        color: account.color,
        currency: account.currency,
      }
    : {};
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
  hideSelectAccountModal();
};

const getCircleItemStyle = (index) => {
  let angle;
  let translate;
  switch (Object.keys(accounts.value).length) {
    case 3:
      angle = index === 0 ? 90 : index === 1 ? 210 : 330;
      translate = `translate(-50%, -60%)`;
      break;
    default:
      translate = `translate(-50%, -50%)`;
      angle = (360 / Object.keys(accounts.value).length) * index;
  }

  return {
    transform: `${translate} rotate(${angle}deg) translate(8rem) rotate(-${angle}deg)`,
  };
};

const handleClickOutside = (event) => {
  let clickedOutside = true;

  containerRef.value.forEach((container) => {
    if (container && container.contains(event.target)) {
      clickedOutside = false;
    }
  });

  if (clickedOutside) {
    hideSelectAccountModal();
  }
};

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
.outer {
  height: 40rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 3rem 2rem 2rem 2rem;
  box-sizing: border-box;
}

.account-select {
  height: 16rem;
  width: 16rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  h3 {
    transition: all 0.5s ease;
  }
  .not-selected {
    cursor: default;
    opacity: 0.5;
    filter: grayscale(0.9) blur(10px);
  }
  .current-account {
    width: 12rem;
    height: 12rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    background-color: none;
    border-radius: 20rem;
    box-sizing: border-box;
    transition: all 0.5s ease;
    &:hover:not(.not-selected) {
      .image {
        scale: 1.02;
        transform: translateY(-2px);
        box-shadow: 0 0 0.6rem rgba(54, 54, 54, 0.3);
      }
    }

    .image {
      width: 70%;
      height: 70%;
      border-radius: 10rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      box-shadow: 0.08rem 0.08rem 0.4rem rgba(54, 54, 54, 0.1);
      color: rgba(255, 255, 255, 0.836);
      span {
        font-size: 3rem;
        font-family: Montserrat;
        font-weight: 900;
      }
    }
    .name,
    .currency {
      font-size: 1rem;
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
      font-size: 0.8rem;
    }
  }
}

.form {
  width: 70%;
}
.account-select-modal {
  width: 20rem;
  height: 20rem;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -44%;
  .account {
    height: 7rem;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    background-color: none;
    transition: all 0.2s ease;
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    padding: 0.5rem;
    &.no-selected {
      opacity: 0.9;
      filter: grayscale(0.9);
      &:hover {
        opacity: 1;
        filter: grayscale(0);
      }
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

.group {
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 0.8rem;
  color: $font-color-dark;
  margin: 0 0 0.2rem 0;
  .select {
    appearance: none;
    outline: 0;
    color: #828a9e;
    width: 7rem;
    height: 1.8rem;
    padding-left: 1rem;
    background: url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg)
        no-repeat right 0.5rem center / 1rem,
      linear-gradient(to left, $primary-color 2rem, $background-color-dark 2rem);
    border: none;
    border-right: 1px solid $primary-color;
    border-radius: 0.6rem;
    cursor: pointer;
    &::-ms-expand {
      display: none;
    }
    &:focus {
      border: 1px solid $primary-color;
    }
    option {
      color: inherit;
    }
  }
}

form {
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

@media (max-width: 600px) {
  .inner {
    align-items: center;
    flex-direction: column;
  }
}
</style>
