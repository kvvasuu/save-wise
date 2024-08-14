<template>
  <div class="account-info">
    <div class="title">
      <input
        type="text"
        v-model="accountName"
        placeholder="Account name"
        maxlength="30"
      />
    </div>
    <div class="form">
      <basic-spinner v-if="loading"></basic-spinner>
      <form v-else>
        <div class="group">
          <label for="color">Card color</label>
          <select v-model="color" id="color" class="select">
            <option value="black">Black</option>
            <option value="gold">Gold</option>
            <option value="pink">Pink</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </select>
        </div>
        <div class="group">
          <label for="currency">Currency</label>
          <select v-model="currency" id="currency" class="select">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="PLN">PLN</option>
          </select>
        </div>
      </form>
      <div class="buttons">
        <basic-button class="green" @click="addNewAccount"
          >Add account</basic-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["goToAccountInfo"],
  data() {
    return {
      loading: false,
      currency: "USD",
      accountName: "",
      color: "black",
    };
  },
  methods: {
    addNewAccount() {
      this.loading = true;
      let accountName = this.accountName.trim();
      const accountsQuantity = this.$store.getters.getAccountsQuantity;
      if (accountName === "") {
        accountName = `Account ${accountsQuantity + 1}`;
      }
      this.$store
        .dispatch("addNewAccount", {
          accountName: accountName,
          color: this.color,
          currency: this.currency,
        })
        .then(() => {
          this.$router.replace(`/app/accounts/${accountsQuantity}`);
          this.$emit("goToAccountInfo", accountsQuantity);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.account-info {
  height: 100%;
  width: 100rem;
  max-width: 100%;
  min-width: 20rem;
  background-color: $background-color;
  border: none;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem 2rem;
  box-sizing: border-box;
  box-shadow: 0.2rem 0.3rem 0.6rem rgba(190, 190, 190, 0.2);
  .title {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    border-bottom: $border;
    padding: 0 0 0.6rem 0;
    margin: 0 0 1rem 0;
    input {
      width: 20rem;
      background-color: transparent;
      border: 0;
      display: block;
      padding: 0 1rem;
      font-size: 1.2rem;
      outline: 0;
      font-family: Montserrat, Helvetica;
      color: $font-color-dark;
      font-weight: 700;
      height: 2.5rem;
      margin: 0 1rem 0 0;
      border-radius: 0.8rem;
      background-color: $background-color-blue;
    }
  }
  .form {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    form {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .group {
      display: flex;
      align-items: start;
      justify-content: center;
      flex-direction: column;
      position: relative;
      box-sizing: border-box;
      font-family: Montserrat;
      font-weight: 600;
      font-size: 0.9rem;
      color: $font-color-dark;
      margin: 0 1rem 0.6rem 1rem;
      width: 20rem;
      .input {
        width: 100%;
        height: 3rem;
        padding: 0 1rem;
        border: 1px solid #eeeeee;
        border-radius: 0.8rem;
        outline: none;
        background-color: $background-color-blue;
        color: $font-color-light;
        margin: 0.4rem 0;
        box-sizing: border-box;
        &:focus {
          outline: 2px solid $primary-color;
        }
      }
      .select {
        appearance: none;
        outline: 0;
        font-size: 0.9rem;
        color: #828a9e;
        width: 100%;
        height: 3rem;
        padding: 0.5rem 4rem 0.5rem 1rem;
        background: url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg)
            no-repeat right 0.8em center / 1.4em,
          linear-gradient(
            to left,
            $primary-color 3em,
            $background-color-blue 3em
          );
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
    }
  }
  .buttons {
    button {
      margin: 0.4rem 0 0 1rem;
      padding: 0.7rem;
      width: 8rem;
    }
  }
}
</style>
