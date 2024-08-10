<template>
  <div class="cards-container">
    <card
      v-for="(card, index) in accounts"
      :accountNumber="index"
      :account="card"
      :key="card"
      ref="cards"
      @click="goToAccountInfo(index)"
    ></card>
  </div>
</template>

<script>
export default {
  emits: ["cardClicked"],
  data() {
    return {
      accounts: null,
      noAccounts: false,
    };
  },
  methods: {
    goToAccountInfo(number) {
      if (this.accounts) {
        this.$router.replace(`/app/accounts/${number}`);
        this.$refs.cards[number].$refs.card.scrollIntoView();
        this.$refs.cards.forEach((card) => {
          card.accountNumber == number
            ? card.setUnselected(false)
            : card.setUnselected(true);
        });
        this.$emit("cardClicked", number);
      }
    },
  },
  created() {
    this.accounts = this.$store.getters.getAccountInfo;
    !this.accounts ? (this.noAccounts = true) : (this.noAccounts = false);
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
  .no-cards {
    opacity: 0.4;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .cards-container {
    background-color: none;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    width: 100%;
    padding: 0.5rem 0.5rem 1rem 0;
    overflow-x: scroll;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      height: 0.8rem;
    }
    &::-webkit-scrollbar-track {
      background: $background-color-dark;
      border-radius: 0.3rem;
    }
    &::-webkit-scrollbar-thumb {
      background: $primary-color;
      background: linear-gradient(160deg, $primary-color, $primary-color-dark);
      border-radius: 0.3rem;
      transition: all 0.3s ease;
      &:hover {
        background: linear-gradient(
          -160deg,
          $primary-color,
          $primary-color-dark
        );
      }
    }
  }
}
</style>
