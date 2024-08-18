<template>
  <main>
    <basic-spinner v-if="loading"></basic-spinner>
    <div class="accounts" v-else>
      <div class="title">
        <h3>Accounts</h3>
        <h4 @click="goToAccountInfo()">See all</h4>
      </div>

      <cards-container :small="true"></cards-container>
    </div>
  </main>
</template>

<script>
import CardsContainer from "@/components/containers/CardsContainer.vue";

export default {
  components: {
    CardsContainer,
  },
  data() {
    return {
      loading: false,
      accounts: null,
    };
  },
  methods: {
    goToAccountInfo() {
      this.$router.push("/app/accounts");
    },
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
    height: 4rem;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    h4 {
      cursor: pointer;
    }
  }
}
@media (max-width: 1000px) {
  .accounts {
    width: 100%;
  }
}
</style>
