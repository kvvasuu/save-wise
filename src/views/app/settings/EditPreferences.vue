<template>
  <div class="content">
    <notification-container ref="notification">
      <span>Saved</span>
      <i class="fa-solid fa-check"></i>
    </notification-container>
    <div class="group">
      <label for="defaultCurrency">Default currency</label>
      <select v-model="currency" id="defaultCurrency">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="PLN">PLN</option>
      </select>
    </div>
    <div class="group">
      <label for="notifications">Notifications</label>
      <label class="switch">
        <input type="checkbox" id="notifications" v-model="notifications" />
        <span class="slider"></span>
      </label>
    </div>
    <div class="button">
      <basic-button @click="saveUserPreferences">Save</basic-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currency: "USD",
      notifications: true,
    };
  },
  methods: {
    saveUserPreferences() {
      this.$store
        .dispatch("setProfilePreferences", {
          defaultCurrency: this.currency,
          notifications: this.notifications,
        })
        .then(() => this.$refs.notification.show());
    },
  },
  created() {
    const user = this.$store.getters.getUserDatabase;
    this.currency = user.settings.defaultCurrency;
    this.notifications = user.settings.notifications;
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  padding: 3rem 2rem 0 2rem;
  .button {
    width: 12rem;
    display: flex;
    justify-content: center;
    margin: 1rem;
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
    select {
      appearance: none;
      outline: 0;
      font-family: Montserrat;
      font-weight: 600;
      font-size: 0.9rem;
      color: #828a9e;
      width: 20rem;
      padding: 1rem 4rem 1rem 1rem;
      background: url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg)
          no-repeat right 0.8em center / 1.4em,
        linear-gradient(to left, $primary-color 3em, $background-color-blue 3em);
      border: 1px solid $details-color;
      border-radius: 0.8rem;
      margin: 0.4rem 0;
      cursor: pointer;
      &::-ms-expand {
        display: none;
      }
      &:focus {
        border: 1px solid $primary-color;
      }
      option {
        color: inherit;
      }
    }
  }
}

.switch {
  margin: 0.4rem 0;
}

.slider {
  display: inline-block;
  width: 3.5rem;
  height: 2rem;
  background-color: $background-color-dark;
  border-radius: 1rem;
  position: relative;
  transition: 0.3s all ease-in-out;
  box-shadow: 0 0 0.2rem rgba(128, 128, 128, 0.2) inset;
  cursor: pointer;
  &::after {
    content: "";
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    background-color: $background-color;
    border-radius: calc(1.5rem / 2);
    position: absolute;
    top: 0.25rem;
    transform: translateX(0.25rem);
    box-shadow: 0.2rem 0.1rem 0.2rem rgba(128, 128, 128, 0.2);
    transition: 0.3s all ease-in-out;
  }
}
.switch {
  input {
    display: none;
    &:checked {
      + .slider {
        background-color: $primary-color;
        &::after {
          transform: translateX(1.75rem);
          box-shadow: -0.2rem -0.1rem 0.2rem rgba(128, 128, 128, 0.2);
        }
      }
    }
  }
}
</style>
