<template>
  <div class="widget-container" @click="goToTransactions">
    <div class="widget-no-data" v-if="transactions.length <= 0">
      <h3>No transactions yet</h3>
    </div>
    <ul v-else>
      <li v-for="transaction in transactions">
        <div class="icon">
          <div class="inner">
            <i :class="displayIcon(transaction)"></i>
          </div>
        </div>
        <div class="description">
          <div class="info">
            <div class="name">{{ transaction.name }}</div>
            <div class="date">
              {{ displayDate(transaction) }}
            </div>
          </div>
        </div>
        <div
          class="amount"
          :class="{ expense: transaction.transactionType === 'expense' }"
        >
          {{ displayAmount(transaction) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { currencyMap } from "@/assets/script";

const store = useStore();
const router = useRouter();

const transactions = computed(() => {
  return store.getters.getRecentTransactions;
});

const goToTransactions = () => {
  router.push("/app/transactions");
};

const displayIcon = (transaction) => {
  if (transaction.transactionType === "expense") {
    switch (transaction.category) {
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
};

const displayDate = (transaction) => {
  return new Date(transaction.transactionDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
};

const currency = (accountId) => {
  return currencyMap[
    store.getters.getSingleAccountInfo(store.getters.getAccountIndex(accountId))
      .currency
  ];
};

const displayAmount = (transaction) => {
  return transaction.transactionType === "expense"
    ? `-${transaction.amount.toFixed(2)} ${currency(transaction.accountId)}`
    : `+${transaction.amount.toFixed(2)} ${currency(transaction.accountId)}`;
};
</script>

<style lang="scss" scoped>
.widget-container {
  height: 14.61rem;
  width: 100%;
  background-color: $background-color;
  border-radius: 1rem;
  position: relative;
  box-shadow: 0.1rem 0.2rem 0.5rem rgba(54, 54, 54, 0.2);
  padding: 1rem 1rem;
  margin: 0.4rem 0;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: translateY(-0.26rem);
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    user-select: none;
    font-family: Montserrat;
    font-weight: 600;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
    width: 100%;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      height: 4rem;
      width: 100%;
      .icon {
        width: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0.8rem 0 0;
        .inner {
          width: 2.6rem;
          height: 2.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
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
      .description {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
        width: 55%;
        .info {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          flex-direction: column;
          width: 100%;
          .name,
          .date {
            text-overflow: ellipsis;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-align: left;
          }
          .date {
            font-size: 0.8rem;
            font-weight: 500;
            color: $font-color-light;
          }
        }
      }
      .amount {
        width: 30%;
        color: $color-green;
        text-align: right;
        margin: 0;
        &.expense {
          color: $color-red;
        }
      }
    }
  }
}
</style>
