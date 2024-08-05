<template>
  <AuthContainer :reverse="true">
    <div class="container">
      <div class="inner" v-if="!isSent && !isLoading">
        <header>
          <h1>Forgot password</h1>
        </header>
        <div class="inputs">
          <div class="group" id="email">
            <i class="fa-regular fa-envelope"></i>
            <input
              placeholder="Email"
              type="email"
              class="input"
              v-model="email"
              @blur="validateEmail"
              @click="error = false"
              :class="{
                'input-auth-error': error,
              }"
            />
            <span class="input-error" v-if="error"
              >Please provide correct email</span
            >
          </div>
        </div>
        <div class="caption">
          We'll send a verification code to this email if it matches an existing
          account.
        </div>

        <basic-button @click="resetPassword">Send</basic-button>
        <div class="other">
          <router-link to="login">Back</router-link>
        </div>
      </div>
      <div class="inner" v-else-if="!isSent && isLoading">
        <basic-spinner></basic-spinner>
      </div>
      <div class="inner" v-else>
        <header>
          <h1>Reset email sent</h1>
          <i class="fa-solid fa-check"></i>
        </header>

        <div class="caption">
          Check <b>{{ passEmail }}</b> for a verification code.
        </div>
        <div class="other">
          <router-link to="login">Back</router-link>
        </div>
      </div>
    </div>
  </AuthContainer>
</template>

<script>
import { RouterLink } from "vue-router";
import AuthContainer from "@/components/containers/AuthContainer.vue";

export default {
  components: {
    AuthContainer,
  },
  data() {
    return {
      isSent: false,
      isLoading: false,
      email: "",
      emailCorrect: true,
      error: false,
    };
  },
  methods: {
    resetPassword() {
      this.isLoading = true;
      this.$store
        .dispatch("passwordReset", {
          email: this.email,
        })
        .then(() => {
          this.isSent = true;
        })
        .catch((error) => {
          this.emailCorrect = false;
          this.error = true;
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    validateEmail() {
      if (this.email.length === 0) {
        this.error = false;
      } else {
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
          this.emailCorrect = true;
          this.error = false;
        } else {
          this.emailCorrect = false;
          this.error = true;
        }
      }
    },
  },
  computed: {
    passEmail() {
      return this.email;
    },
  },
};
</script>

<style lang="scss" scoped>
.inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 1rem;
  width: 20rem;
  height: 100%;
  box-sizing: border-box;
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    h1 {
      font-weight: 700;
    }
    i {
      font-size: 2rem;
    }
  }
  a {
    width: 60%;
    margin: 2rem 0;
    transition: all 0.2s ease;
    text-decoration: none;
    color: $primary-color;
    &:hover {
      color: $primary-color-dark;
    }
  }
}

.inputs {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  .group {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    .input {
      width: 100%;
      height: 3rem;
      padding: 0 1rem;
      padding-left: 2.5rem;
      border: none;
      border-radius: 0.8rem;
      outline: none;
      background-color: $background-color-blue;
      color: $font-color-dark;
      margin: 0.4rem 0;
      &::placeholder {
        color: $font-color-light;
      }
      &:focus {
        outline: 2px solid $primary-color;
      }
      &.input-auth-error {
        outline: 2px solid $error-color !important;
      }
    }
    i {
      position: absolute;
      left: 1rem;
      color: $font-color-dark;
      width: 1rem;
      height: 1rem;
    }
    .input-error {
      position: absolute;
      font-size: 0.7rem;
      font-weight: 700;
      color: $error-color;
      bottom: -0.6rem;
      left: 1rem;
      pointer-events: none;
      font-family: "Montserrat";
      display: inline-block;
    }
  }
}

.other,
.caption {
  font-size: 0.8rem;
  width: 80%;
  margin: 1rem 0 0 0;
  text-align: center;
}
</style>
