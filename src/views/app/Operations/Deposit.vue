<template>
  <div class="outer">
    <div class="inner">
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
          <div class="account-select-modal" v-if="selectAccountModal">
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

      <div class="form spinner" v-if="!accounts || loading">
        <BasicSpinner></BasicSpinner>
      </div>
      <div class="form" v-else>
        <form>
          <div class="group">
            <label for="title">Title<span>(optional)</span></label>
            <input
              type="text"
              class="input"
              id="title"
              v-model="title"
              placeholder="Deposit"
              maxlength="40"
            />
          </div>
          <div class="group">
            <label for="amount">Amount</label>
            <input
              type="number"
              class="input"
              id="amount"
              v-model="amount"
              @change="formatAmount"
              @keyup="validateForm"
            />
            <div class="currency">
              {{ selectedAccount.currency }}
            </div>
          </div>
        </form>
        <div class="button">
          <BasicButton
            @click="sendMoney"
            :disabled="!isFormValid"
            :class="{ disabled: selectedAccountIndex === null }"
            >Send<i class="fa-solid fa-piggy-bank"></i
          ></BasicButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { gradientMap, currencyMap } from "@/assets/script";
import { onBeforeRouteLeave } from "vue-router";

const store = useStore();
const loading = ref(false);

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

const amount = ref(null);
const title = ref("");
const isFormValid = ref(false);

const formatAmount = () => {
  if (amount.value > 999999) {
    amount.value = 999999;
  } else if (amount.value < 0.01) {
    amount.value = null;
  }
};

const formatTitle = () => {
  if (title.value === "") title.value = "Deposit";
};

const validateForm = () => {
  if (amount.value <= 999999 && amount.value >= 0.01) {
    amount.value = Math.round(amount.value * 1e2) / 1e2;
    isFormValid.value = true;
  } else isFormValid.value = false;
};

const sendMoney = () => {
  if (!amount.value) return;
  loading.value = true;
  formatAmount();
  formatTitle();
  store
    .dispatch("deposit", {
      id: selectedAccountIndex.value,
      amount: Math.round(amount.value * 1e2) / 1e2,
      name: title.value,
    })
    .finally(() => {
      amount.value = null;
      title.value = "";
      loading.value = false;
    });
};
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
  margin: 0 0 2rem 0;
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
      opacity: 0.7;
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
  font-size: 0.9rem;
  color: $font-color-dark;
  margin: 0 1rem 0.6rem 1rem;
  width: 20rem;
  height: 5rem;
  label {
    span {
      font-size: 0.7rem;
      margin: 0 0 0 0.2rem;
      color: $font-color-light;
    }
  }
  .input {
    width: 100%;
    height: 3rem;
    padding: 0 1rem;
    border: 1px solid #eeeeee;
    border-radius: 0.8rem;
    outline: none;
    background-color: $background-color-blue;
    color: $font-color-light;
    margin: 0.4rem 0;
    box-sizing: border-box;
    &:focus {
      outline: 2px solid $primary-color;
    }
    &:disabled {
      cursor: default;
      filter: grayscale(1);
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  .currency {
    display: flex;
    align-items: center;
    height: 2.5rem;
    position: absolute;
    top: 1.8rem;
    right: 1rem;
    color: $font-color-light;
    user-select: none;
    pointer-events: none;
  }
}

.form {
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  &.spinner {
    height: 16rem;
    justify-content: center;
  }
  form {
    margin: 1.4rem 0 0 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
  }
  button {
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
