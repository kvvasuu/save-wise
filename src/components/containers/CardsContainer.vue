<template>
  <div class="cards-container" :key="passCards">
    <div class="no-cards" v-if="noAccountsCheck && $props.small">
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
      :class="{ selected: selectCard(index), unselected: !selectCard(index) }"
    ></card>
    <div
      class="add-card"
      :class="{ small: $props.small, active: newAccountActive }"
      v-if="!$props.small && newAccountPossible"
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
  methods: {
    goToAccountInfo(number) {
      if (this.getAccountsInfo) {
        this.$router.replace(`/app/accounts/${number}`);
        if (!this.$props.small) {
          this.$refs.cards[number].$refs.card.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }
    },
    addAccount() {
      this.$router.replace(`/app/accounts/new_account`);
      this.$refs.addAccount.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    },
    selectCard(index) {
      if (this.$props.small) {
        return true;
      }
      return this.$route.params.id
        ? Number(this.$route.params.id) === index
        : false;
    },
  },
  computed: {
    passCards() {
      if (this.getAccountsInfo) {
        if (this.$props.small) {
          const accounts = [];
          const rest = [];
          this.getAccountsInfo.forEach((el) => {
            el.favorite === true ? accounts.push(el) : rest.push(el);
          });

          return accounts.length < 2
            ? accounts.concat(rest.slice(0, 2 - accounts.length))
            : accounts;
        } else {
          return this.getAccountsInfo;
        }
      }
    },
    newAccountPossible() {
      return this.getAccountsInfo.length <= 3;
    },
    newAccountActive() {
      return this.$route.path === "/app/accounts/new_account";
    },
    getAccountsInfo() {
      return this.$store.getters.getAccountsInfo;
    },
    noAccountsCheck() {
      return !this.getAccountsInfo;
    },
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
  scroll-snap-type: x mandatory;
  scroll-snap-align: start;
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
    height: 14.61rem;
    position: relative;
    background: none;
    padding: 1rem;
    box-sizing: border-box;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    scroll-snap-align: start;
    &.small {
      width: 100%;
    }
    &:hover .button,
    &.active .button {
      transform: translateY(-0.13rem);
      color: $primary-color;
    }
    .button {
      width: 10rem;
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
