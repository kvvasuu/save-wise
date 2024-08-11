<template>
  <main>
    <div class="navbar">
      <ul>
        <a
          :class="{ active: !incomeOnly && !expenseOnly }"
          @click="changePage('all')"
          ><div class="list-item-inner">All transactions</div></a
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
        <li>Dupa</li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      noTransactionHistory: false,
      incomeOnly: false,
      expenseOnly: false,
    };
  },
  methods: {
    changePage(pageName) {
      switch (pageName) {
        case "all":
          this.incomeOnly = false;
          this.expenseOnly = false;
          break;
        case "income":
          this.incomeOnly = true;
          this.expenseOnly = false;
          break;
        case "expense":
          this.incomeOnly = false;
          this.expenseOnly = true;
          break;
      }
    },
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
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 10rem;
  .no-transactions {
    opacity: 0.4;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
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
</style>
