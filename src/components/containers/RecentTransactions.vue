<template>
  <div class="widget-container" @click="goToTransactions">
    <div class="no-transactions" v-if="transactions.length <= 0">
      <h3>No transactions yet</h3>
    </div>
    <ul v-else>
      <li v-for="transaction in transactions">
        <div class="description">
          <div class="icon">
            <i
              class="fa-solid fa-piggy-bank"
              v-if="transaction.transactionType === 'income'"
            ></i>
            <i class="fa-solid fa-money-check-dollar expense" v-else></i>
          </div>
          {{ transaction.name }}
        </div>
        <div class="amount"></div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const goToTransactions = () => {
  router.push("/app/transactions");
};

const transactions = computed(() => {
  return store.getters.getRecentTransactions;
});

console.log(transactions.value);

/* export default {
  methods: {
    displayAccountName() {
      return this.$store.getters.getSingleAccountInfo(this.accountIndex)
        .accountName;
    },
    accountIndex() {
      return this.$store.getters.getAccountIndex(this.transaction.accountId);
    },
    displayTransactionType() {
      return this.transaction.transactionType === "income"
        ? "Income"
        : "Expense";
    },
    displayDate() {
      return new Date(this.transaction.transactionDate).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        }
      );
    },
    currency() {
      return currencyMap[
        this.$store.getters.getSingleAccountInfo(this.accountIndex).currency
      ];
    },
    displayAmount() {
      return this.transaction.transactionType === "expense"
        ? `-${this.transaction.amount.toFixed(2)} ${this.currency}`
        : `+${this.transaction.amount.toFixed(2)} ${this.currency}`;
    },
    displayBalance() {
      return "balance" in this.transaction
        ? `${this.transaction.balance.toFixed(2)} ${this.currency}`
        : "-";
    },
  },
}; */
</script>

<style lang="scss" scoped>
.widget-container {
  min-width: 22rem;
  height: 14.61rem;
  background-color: $background-color;
  cursor: pointer;
  border-radius: 1rem;
  position: relative;
  box-shadow: 0.1rem 0.2rem 0.5rem rgba(54, 54, 54, 0.2);
  padding: 1rem;
  margin: 0.4rem 0;
  box-sizing: border-box;
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
      justify-content: flex-start;
      flex-direction: row;
      height: 4rem;
      width: 100%;
      border-bottom: 1px solid $details-color;
      &:last-of-type {
        border-bottom: none;
      }
      .description {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
      }
      .icon {
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0.6rem 0 0;
        i {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: $color-green;
          &.expense {
            color: $color-red;
          }
        }
      }
    }
  }
}
</style>
