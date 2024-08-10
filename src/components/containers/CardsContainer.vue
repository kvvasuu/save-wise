<template>
  <div class="cards-container">
    <div class="no-cards" v-if="noAccounts && $props.small">
      <h2>No accounts yet</h2>
    </div>
    <card
      v-else
      v-for="(card, index) in passCards"
      :accountNumber="index"
      :account="card"
      :key="card"
      ref="cards"
      @click="goToAccountInfo(index)"
    ></card>
    <div
      class="add-card"
      :class="{ small: !$props.small }"
      v-if="!$props.small"
      @click="addAccount"
      ref="addAccount"
    >
      <div class="button">
        <i class="fa-solid fa-plus"></i>
        <span>Add account</span>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../misc/Card.vue";

export default {
  component: {
    Card,
  },
  props: ["small"],
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
      }
    },
    addAccount() {
      this.$refs.addAccount.scrollIntoView();
    },
  },
  computed: {
    passCards() {
      if (this.accounts) {
        return this.$props.small ? this.accounts.slice(0, 2) : this.accounts;
      }
    },
  },
  created() {
    /*  this.accounts = this.$store.getters.getAccountInfo; */
    !this.accounts ? (this.noAccounts = true) : (this.noAccounts = false);
  },
};
</script>

<style lang="scss" scoped>
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
  .no-cards {
    opacity: 0.4;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
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
    &:hover {
      background: $primary-color;
    }
  }
  .add-card {
    cursor: pointer;
    min-width: 12rem;
    height: 14.61rem;
    position: relative;
    background: none;
    padding: 1rem;
    box-sizing: border-box;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    &.small {
      width: 100%;
    }
    &:hover .button {
      transform: translateY(-2px);
      color: $primary-color;
    }
    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      transition: all 0.3s ease;
      color: $font-color-light;
      i {
        color: inherit;
        font-size: 3rem;
      }
      span {
        color: inherit;
        font-size: 1.2rem;
        font-family: Montserrat;
        font-weight: 700;
      }
    }
  }
}
</style>
