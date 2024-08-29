<template>
  <main>
    <div class="small-container wide accounts">
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
    <div class="small-container">
      <div class="title">
        <h3>Quick Deposit</h3>
      </div>
      <QuickDeposit></QuickDeposit>
    </div>
    <div class="small-container">
      <div class="title">
        <h3>Expense Statistics</h3>
      </div>
      <ExpenseStatistics></ExpenseStatistics>
    </div>
    <div class="small-container wide">
      <div class="title">
        <h3>Weekly Activity</h3>
        <select v-if="accounts.length > 0" v-model="selectedAccount">
          <option v-for="(account, index) in accounts" :value="index">
            {{ account.accountName }}
          </option>
        </select>
      </div>
      <WeeklyActivity :account="selectedAccount"></WeeklyActivity>
    </div>
  </main>
</template>

<script setup>
import CardsContainer from "@/components/containers/CardsContainer.vue";
import RecentTransactions from "@/components/RecentTransactions.vue";
import ExpenseStatistics from "@/components/ExpenseStatistics.vue";
import WeeklyActivity from "@/components/WeeklyActivity.vue";
import QuickDeposit from "@/components/QuickDeposit.vue";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const goToAccountInfo = () => {
  router.push("/app/accounts");
};

const accounts = computed(() => {
  return store.getters.getAccountsInfo;
});

const selectedAccount = ref(0);
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  &.wide {
    width: 45rem;
  }
  &.accounts {
    width: 45rem;
    height: 20rem;
  }
}

select {
  appearance: none;
  outline: 0;
  font-size: 0.8rem;
  color: #828a9e;
  width: 12rem;
  height: 2rem;
  padding: 0 3rem 0 1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  background: url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg)
      no-repeat right 0.8em center / 1.4em,
    linear-gradient(to left, $primary-color 3em, $background-color-blue 3em);
  border: none;
  border-right: 2px solid $primary-color;
  border-radius: 0.8rem;
  margin: 0.4rem 0;
  cursor: pointer;
  &::-ms-expand {
    display: none;
  }
  &:focus {
    border: 2px solid $primary-color;
  }
  option {
    color: inherit;
  }
}

@media (max-width: 1024px) {
  .accounts {
    width: 100%;
  }
  main {
    justify-content: center;
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
