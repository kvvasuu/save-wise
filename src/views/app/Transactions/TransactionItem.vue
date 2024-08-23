<template>
  <div class="transaction">
    <div
      class="transaction-info"
      @click="expandListItem"
      :class="{ expanded: isExpanded }"
    >
      <div class="description text">
        <div class="icon">
          <i :class="displayIcon"></i>
        </div>
        {{ transaction.name }}
      </div>
      <div class="type text">
        {{ displayTransactionType }}
      </div>
      <div class="account text">
        {{ displayAccountName }}
      </div>
      <div
        class="amount text"
        :class="{ expense: transaction.transactionType === 'expense' }"
      >
        {{ displayAmount }}
      </div>
      <div class="button">
        <i class="fa-solid fa-angle-down" :class="{ rotate: isExpanded }"></i>
      </div>
    </div>
    <Transition name="transaction-slide">
      <div class="transaction-expanded" v-if="isExpanded">
        <div class="column left">
          <div class="group">
            <div class="label">Title</div>
            <div class="content">{{ transaction.name }}</div>
          </div>
          <div class="group">
            <div class="label">Amount</div>
            <div
              class="content amount-expanded"
              :class="{ expense: transaction.transactionType === 'expense' }"
            >
              {{ displayAmount }}
            </div>
          </div>
          <div class="group">
            <div class="label">Balance after operation</div>
            <div class="content">{{ displayBalance }}</div>
          </div>
        </div>
        <div class="column right">
          <div class="group">
            <div class="label">Account</div>
            <div class="content">{{ displayAccountName }}</div>
          </div>
          <div class="group">
            <div class="label">Type</div>
            <div class="content">
              {{ displayTransactionType }}
            </div>
          </div>
          <div class="group">
            <div class="label">Date</div>
            <div class="content">{{ displayDate }}</div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { currencyMap } from "@/assets/script";
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps(["transaction"]);

const hasCategory = !!props.transaction.category || false;

const isExpanded = ref(false);

const expandListItem = () => {
  isExpanded.value = !isExpanded.value;
};

const displayAccountName = computed(() => {
  return store.getters.getSingleAccountInfo(accountIndex.value).accountName;
});

const accountIndex = computed(() => {
  return store.getters.getAccountIndex(props.transaction.accountId);
});

const displayTransactionType = computed(() => {
  let type = "";
  if (hasCategory) {
    type = props.transaction.category;
  } else {
    type = props.transaction.transactionType;
  }
  return type.charAt(0).toUpperCase() + type.slice(1);
});

const displayIcon = computed(() => {
  if (props.transaction.transactionType === "expense") {
    switch (props.transaction.category) {
      case "entertainment":
        return `fa-solid fa-music`;
      case "bills":
        return `fa-solid fa-money-bills`;
      case "investment":
        return `fa-solid fa-hand-holding-dollar`;
      default:
        return `fa-solid fa-arrow-up`;
    }
  }
  return `fa-solid fa-arrow-down`;
});

const displayDate = computed(() => {
  return new Date(props.transaction.transactionDate).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    }
  );
});

const currency = computed(() => {
  return currencyMap[
    store.getters.getSingleAccountInfo(accountIndex.value).currency
  ];
});

const displayAmount = computed(() => {
  return props.transaction.transactionType === "expense"
    ? `-${props.transaction.amount.toFixed(2)} ${currency.value}`
    : `+${props.transaction.amount.toFixed(2)} ${currency.value}`;
});

const displayBalance = computed(() => {
  return "balance" in props.transaction
    ? `${props.transaction.balance.toFixed(2)} ${currency.value}`
    : "-";
});
</script>

<style lang="scss" scoped>
.transaction {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid $details-color;
  &:last-of-type {
    border-bottom: none;
    border-radius: 1rem;
  }
  .transaction-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 4rem;
    width: 100%;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 0.9rem;
    color: $font-color-dark;
    padding: 0 0.6rem;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      background-color: $background-color-dark;
      + .transaction-expanded::after {
        background-color: $background-color-dark;
      }
    }
  }
  .transaction-expanded {
    box-shadow: inset 0 1rem 1rem -1rem rgba(111, 124, 161, 0.2);
    display: flex;
    align-items: flex-start;
    height: 14rem;
    width: 100%;
    background-color: $background-color-dark;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      background-color: $background-color;
      transform: rotate(-45deg);
      width: 16px;
      height: 16px;
      top: -10px;
      left: 6rem;
      box-shadow: -0.1rem 0.1rem 0.9rem rgba(111, 124, 161, 0.2);
    }
    .column {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      top: 0;
      width: 50%;
      height: 14rem;
      padding: 1rem 1.6rem;
      box-sizing: border-box;
      &.left {
        left: 0;
      }
      &.right {
        right: 0;
      }
      .group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        height: 30%;
        width: 100%;
        font-family: Montserrat;
        text-align: left;
        .label {
          font-size: 0.8rem;
          font-weight: 500;
          color: $font-color-light;
          margin: 0 0 0.4rem 0;
        }
        .content {
          font-size: 1rem;
          font-weight: 600;
          color: $font-color-dark;
          &.amount-expanded {
            color: $color-green;
            &.expense {
              color: $color-red;
            }
          }
        }
      }
    }
  }

  .text {
    text-align: left;
    overflow: hidden;
    margin: 0 1rem 0 0;
  }
  .amount {
    color: $color-green;
    text-align: right;
    margin: 0;
    &.expense {
      color: $color-red;
    }
  }
}
.description {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  .icon {
    width: 2.6rem;
    height: 2.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1rem 0 0;
    i {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2rem;
      width: 100%;
      height: 100%;
      font-size: 1.2rem;
    }
  }
}
.type {
  width: 15%;
  font-weight: 500;
}
.account {
  width: 25%;
  font-weight: 500;
}
.amount {
  width: 15%;
  text-align: right;
}
.button {
  color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  width: 2rem;
  height: 2rem;
  margin: 0 0 0 1rem;
  i {
    transition: all 0.6s ease;
    width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &.rotate {
      transform: rotate(180deg);
    }
  }
}

@media (max-width: 1000px) {
  .transaction {
    font-size: 0.8rem;
  }
  .type {
    display: none;
  }
  .amount {
    width: 20%;
  }
  .description {
    width: 45%;
  }
}

@media (max-width: 600px) {
  .amount {
    width: 30%;
  }
  .description {
    width: 70%;
  }
  .account {
    display: none;
  }
}

.transaction-slide-enter-active {
  animation: slide 0.6s ease;
}

.transaction-slide-leave-active {
  animation: slide 0.6s ease reverse;
}

@keyframes slide {
  0% {
    height: 0;
  }
  100% {
    height: 14rem;
  }
}
</style>
