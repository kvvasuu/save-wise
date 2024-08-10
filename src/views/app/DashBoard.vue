<template>
  <main>
    <basic-spinner v-if="loading"></basic-spinner>
    <div class="accounts">
      <div class="title">
        <h3>Accounts</h3>
        <h4 @click="goToAccountInfo(0)">See all</h4>
      </div>

      <div class="cards-container">
        <card
          v-for="(card, index) in passCards"
          :accountNumber="index"
          :account="card"
          :key="card"
          :ref="`card_${index}`"
          @click="goToAccountInfo(index)"
        ></card>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      accounts: null,
    };
  },
  methods: {
    goToAccountInfo(number) {
      this.$router.push("/app/accounts/" + number);
    },
  },
  computed: {
    passCards() {
      if (this.accounts) return this.accounts.slice(0, 2);
    },
  },
  created() {
    this.accounts = this.$store.getters.getAccountInfo;
  },
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
  padding: 0;
  margin: 0;
}
.accounts {
  width: 45rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .title {
    width: 45rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    h4 {
      cursor: pointer;
    }
  }
  .cards-container {
    background-color: none;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding: 0.5rem 0.5rem 1rem 0;
  }
}
</style>
