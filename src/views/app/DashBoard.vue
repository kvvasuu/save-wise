<template>
  <main>
    <div class="accounts">
      <div class="title">
        <h3>Accounts</h3>
        <h4 @click="goToAccountInfo()">See all</h4>
      </div>

      <CardsContainer :small="true"></CardsContainer>
    </div>
    <div class="small-container">
      <div class="title">
        <h3>Recent transactions</h3>
      </div>
      <RecentTransactions></RecentTransactions>
    </div>
    <div class="small-container high">
      <div class="title">
        <h3>Expense Statistics</h3>
      </div>
      <ExpenseStatistics></ExpenseStatistics>
    </div>
  </main>
</template>

<script setup>
import CardsContainer from "@/components/containers/CardsContainer.vue";
import RecentTransactions from "@/components/RecentTransactions.vue";
import ExpenseStatistics from "@/components/ExpenseStatistics.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goToAccountInfo = () => {
  router.push("/app/accounts");
};
</script>

<style lang="scss" scoped>
main {
  height: 100%;
  width: 100%;
  max-width: 100%;
  min-width: 20rem;
  background-color: none;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0 1rem;
  padding: 0;
  margin: 0;
}

.title {
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  h4 {
    cursor: pointer;
  }
}
.accounts {
  width: 45rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.small-container {
  height: 18.5rem;
  width: 22rem;
  max-width: 26rem;
  min-width: 22rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
@media (max-width: 1000px) {
  .accounts {
    width: 100%;
  }
}
@media (max-width: 600px) {
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
