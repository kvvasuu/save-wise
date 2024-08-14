<template>
  <div class="account-info">
    <Teleport to="#center">
      <Transition name="fade">
        <confirm-container
          v-if="confirmContainer"
          @confirm="deleteAccount"
          @cancel="confirmContainer = false"
        >
          <template #title> Are you sure? </template>
          <h4>
            All account data will be deleted.<br />
            This cannot be undone.
          </h4>
        </confirm-container>
      </Transition>
    </Teleport>
    <div class="title">
      <input
        type="text"
        v-model="account.accountName"
        :disabled="!isEditable"
        :class="{ 'is-editable': isEditable }"
        maxlength="30"
      />
      <i
        class="fa-solid fa-heart favorite"
        :class="{ selected: account.favorite }"
        v-if="account.favorite || setFavoritePossible"
        @click="setFavorite"
        title="Favorite"
      ></i>
    </div>
    <div class="form">
      <basic-spinner v-if="loading"></basic-spinner>
      <form v-else>
        <div class="group">
          <label for="color">Card color</label>
          <select
            v-model="account.color"
            id="color"
            :disabled="!isEditable"
            :class="{ 'is-editable': isEditable }"
            class="select"
          >
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
          <select
            v-model="account.currency"
            id="currency"
            :disabled="!isEditable"
            :class="{ 'is-editable': isEditable }"
            class="select"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="PLN">PLN</option>
          </select>
        </div>
      </form>
      <div class="buttons" v-if="!isEditable">
        <basic-button @click="editAccountInfo">Edit</basic-button>
      </div>
      <div class="buttons" v-else>
        <div class="edit-buttons">
          <basic-button @click="discardAccountInfo">Discard</basic-button>
          <basic-button @click="saveAccountInfo" class="green"
            >Save</basic-button
          >
        </div>

        <div class="delete-button">
          <basic-button @click="showConfirmModal" class="red"
            >Delete account</basic-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      account: null,
      currency: "",
      accountName: "",
      color: "",
      isEditable: false,
      confirmContainer: false,
    };
  },
  computed: {
    setFavoritePossible() {
      return this.$store.getters.getFavoriteAccountsQuantity < 2;
    },
  },
  methods: {
    editAccountInfo() {
      this.isEditable = true;
    },
    saveAccountInfo() {
      this.loading = true;
      this.$store
        .dispatch("setAccountInformation", {
          id: this.$route.params.id,
        })
        .then(() => {
          this.accountName = this.account.accountName;
          this.currency = this.account.currency;
          this.color = this.account.color;
          this.account = this.$store.getters.getSingleAccountInfo(
            this.$route.params.id
          );
        })
        .finally(() => {
          this.isEditable = false;
          this.loading = false;
        });
    },
    discardAccountInfo() {
      this.$store.commit("setAccountInformation", {
        id: this.$route.params.id,
        accountName: this.accountName,
        color: this.color,
        currency: this.currency,
      });
      this.account = this.$store.getters.getSingleAccountInfo(
        this.$route.params.id
      );
      this.isEditable = false;
    },
    setFavorite() {
      this.$store
        .dispatch("setFavorite", {
          id: this.$route.params.id,
          favorite: !this.account.favorite,
        })
        .then(() => {
          this.account = this.$store.getters.getSingleAccountInfo(
            this.$route.params.id
          );
        });
    },
    showConfirmModal() {
      this.confirmContainer = true;
    },
    deleteAccount() {
      this.confirmContainer = false;
      this.isEditable = false;
      this.$store.dispatch("deleteAccount", {
        id: this.$route.params.id,
      });
      this.$router.replace(`/app/accounts`);
    },
  },
  created() {
    this.account = this.$store.getters.getSingleAccountInfo(
      this.$route.params.id
    );

    this.currency = this.account.currency;
    this.accountName = this.account.accountName;
    this.color = this.account.color;
  },
  beforeRouteUpdate(to, from) {
    if (this.isEditable) {
      const answer = window.confirm(
        "Do you really want to leave? You have unsaved changes!"
      );
      return !answer ? false : this.discardAccountInfo();
    }
  },
  beforeRouteLeave(to, from) {
    if (this.isEditable) {
      const answer = window.confirm(
        "Do you really want to leave? You have unsaved changes!"
      );
      return !answer ? false : this.discardAccountInfo();
    }
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
    justify-content: space-between;
    border-bottom: $border;
    padding: 0 0 0.6rem 0;
    margin: 0 0 1rem 0;
    input {
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
      max-width: 20rem;
      width: 100%;
      box-sizing: border-box;
      &.is-editable {
        color: $font-color-light;
        border-radius: 0.8rem;
        background-color: $background-color-blue;
      }
    }
    .favorite {
      font-size: 2rem;
      cursor: pointer;
      transition: all 0.2s;
      color: $font-color-light;
      opacity: 0.4;
      &:hover {
        font-size: 2.1rem;
        filter: drop-shadow(0 0 0.12rem $font-color-light);
      }
      &.selected {
        color: $color-red;
        opacity: 1;
        &:hover {
          font-size: 2.1rem;
          filter: drop-shadow(0 0 0.12rem $color-red);
        }
      }
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
      width: 100%;
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
      max-width: 20rem;
      width: 100%;
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
        &:disabled {
          cursor: default;
          filter: grayscale(1);
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
        &:disabled {
          cursor: default;
          filter: grayscale(1);
        }
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
    display: flex;
    align-items: start;
    justify-content: space-between;
    width: 100%;
    button {
      margin: 0.4rem 0 0 1rem;
      padding: 0.7rem;
      width: 8rem;
    }
  }
}
</style>
