<template>
  <div class="widget-container" @click="goToTransactions">
    <div class="no-transactions" v-if="transactions.length <= 0">
      <h3>No transactions yet</h3>
    </div>
    <ul v-else>
      <li v-for="transaction in transactions">
        <div class="icon">
          <div
            class="inner"
            :class="{ expense: transaction.transactionType === 'expense' }"
          >
            <i
              class="fa-solid fa-piggy-bank"
              v-if="transaction.transactionType === 'income'"
            ></i>
            <i class="fa-solid fa-money-check-dollar expense" v-else></i>
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
  .no-transactions {
    opacity: 0.4;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
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
          background-color: $color-green-light;
          border-radius: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          &.expense {
            background-color: $color-red-light;
          }
        }

        i {
          font-size: 1.2rem;
          color: $color-green;
          &.expense {
            color: $color-red;
            background-color: none;
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
