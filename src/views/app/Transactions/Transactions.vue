<template>
  <main>
    <div class="navbar">
      <ul>
        <a
          :class="{ active: !incomeOnly && !expenseOnly }"
          @click="changePage('all')"
          ><div class="list-item-inner">All</div></a
        >
        <a
          :class="{ active: incomeOnly && !expenseOnly }"
          @click="changePage('income')"
          ><div class="list-item-inner">Income</div></a
        >
        <a
          :class="{ active: !incomeOnly && expenseOnly }"
          @click="changePage('expense')"
          ><div class="list-item-inner">Expense</div></a
        >
      </ul>
    </div>

    <div class="transaction-list">
      <basic-spinner v-if="loading"></basic-spinner>
      <div class="no-transactions" v-else-if="noTransactionHistory && !loading">
        <h2>No transactions history</h2>
      </div>
      <ul v-else>
        <div class="top-bar">
          <div class="description">Description</div>
          <div class="type">Type</div>
          <div class="account">Account</div>
          <div class="amount">Amount</div>
        </div>
        <transaction-item
          v-for="transaction in paginatedTransactions"
          :key="transaction"
          :transaction="transaction"
        ></transaction-item>
      </ul>
    </div>
  </main>
</template>

<script>
import TransactionItem from "./TransactionItem.vue";
import { currencyMap } from "@/assets/script";

export default {
  components: {
    TransactionItem,
  },
  data() {
    return {
      loading: false,
      noTransactionHistory: false,
      incomeOnly: false,
      expenseOnly: false,
      transactionList: [],
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  methods: {
    changePage(pageName) {
      switch (pageName) {
        case "all":
          this.incomeOnly = false;
          this.expenseOnly = false;
          this.getTransactions();
          break;
        case "income":
          this.incomeOnly = true;
          this.expenseOnly = false;
          this.getTransactions();
          break;
        case "expense":
          this.incomeOnly = false;
          this.expenseOnly = true;
          this.getTransactions();
          break;
      }
    },
    getTransactions() {
      const array = this.$store.getters.getTransactions;

      if (!this.incomeOnly && !this.expenseOnly) {
        this.transactionList = array;
      } else if (this.incomeOnly && !this.expenseOnly) {
        this.transactionList = array.filter(
          (el) => el.transactionType === "income"
        );
      } else if (!this.incomeOnly && this.expenseOnly) {
        this.transactionList = array.filter(
          (el) => el.transactionType === "expense"
        );
      }
    },
  },
  computed: {
    paginatedTransactions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.transactionList.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.transactionList.length / this.itemsPerPage);
    },
  },
  created() {
    this.getTransactions();
  },
};
</script>

<style lang="scss" scoped>
main {
  height: 100%;
  width: 80rem;
  max-width: 100%;
  min-width: 20rem;
  background-color: $background-color;
  border: none;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  box-sizing: border-box;
  box-shadow: 0.2rem 0.3rem 0.6rem rgba(190, 190, 190, 0.2);
}

.navbar {
  height: 3rem;
  width: 100%;
  border-bottom: $border;
  box-sizing: border-box;
  ul {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    a {
      list-style: none;
      cursor: pointer;
      position: relative;
      &:hover .list-item-inner {
        transform: translateY(-0.13rem);
      }
      .list-item-inner {
        color: $font-color-light;
        padding: 0.8rem 1.6rem;
        display: flex;
        align-items: center;
        transition: 0.4s ease;
        font-family: Montserrat;
        font-weight: 600;
        font-size: 0.9rem;
        text-align: center;
      }
    }
    .active {
      .list-item-inner {
        color: $primary-color;
        transform: translateY(-0.13rem);
      }
      &:hover {
        background-color: transparent !important;
      }
      &::before {
        content: "";
        position: absolute;
        bottom: -0.18rem;
        left: 50%;
        background-color: $primary-color;
        height: 0.2rem;
        width: 0%;
        border-top-right-radius: 1rem;
        border-top-left-radius: 1rem;
        animation: linkAppear 0.4s ease forwards;
      }
    }
  }
}

.transaction-list {
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 0;
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
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    .top-bar {
      min-height: 2rem;
      margin: 1rem 0 0 0;
      width: 100%;
      border-bottom: $border;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-family: Montserrat;
      font-weight: 600;
      color: $font-color-light;
      font-size: 0.8rem;
      box-sizing: border-box;
      padding: 0 0.6rem;
    }
    .description {
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;
      margin: 0 1rem 0 0;
    }
    .type {
      width: 10%;
      margin: 0 1rem 0 0;
    }
    .account {
      width: 25%;
      margin: 0 1rem 0 0;
    }
    .date {
      width: 15%;
      margin: 0 1rem 0 0;
    }
    .amount {
      width: 10%;
      text-align: right;
      margin: 0 1rem 0 0;
    }
  }
}

@keyframes linkAppear {
  0% {
    width: 0%;
    left: 50%;
    bottom: -0.18rem;
  }
  100% {
    left: 0;
    width: 100%;
    bottom: -0.18rem;
  }
}

@media (max-width: 1000px) {
  main {
    .navbar {
      ul {
        a {
          .list-item-inner {
            padding: 0.8rem 1rem;
          }
        }
      }
    }
  }
  .transaction-list {
    ul {
      li {
        font-size: 0.8rem;
        .text:not(.amount) {
          margin: 0 0.8rem 0 0;
        }
      }
      .type {
        display: none;
        &.text {
          display: none;
        }
      }
      .amount {
        width: 15%;
      }
      .description {
        width: 45%;
      }
    }
  }
}

@media (max-width: 600px) {
  main {
    padding: 1rem 1rem;
    .navbar {
      ul {
        a {
          .list-item-inner {
            padding: 0.8rem 0.7rem;
          }
        }
      }
    }
  }

  .transaction-list {
    ul {
      .amount {
        width: 20%;
      }
      .description {
        width: 55%;
      }
      .account {
        display: none;
        &.text {
          display: none;
        }
      }
      .date {
        width: 25%;
      }
    }
  }
}

@keyframes transaction-slide {
  0% {
    height: 0;
  }
  100% {
    height: 10rem;
  }
}
</style>
