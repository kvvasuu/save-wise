<template>
  <main>
    <div class="accounts">
      <div class="title">
        <h3>Accounts</h3>
        <h4 @click="goToAccountInfo()">See all</h4>
      </div>

      <CardsContainer :small="true"></CardsContainer>
    </div>
    <div class="recent-transactions">
      <div class="title">
        <h3>Recent transactions</h3>
      </div>
      <RecentTransactions></RecentTransactions>
    </div>
  </main>
</template>

<script setup>
import CardsContainer from "@/components/containers/CardsContainer.vue";
import RecentTransactions from "@/components/containers/RecentTransactions.vue";
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
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0 2rem;
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
  height: 21rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.recent-transactions {
  height: 21rem;
  width: 100%;
  max-width: 26rem;
  min-width: 22rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
@media (max-width: 1000px) {
  .accounts {
    width: 100%;
  }
}
</style>
