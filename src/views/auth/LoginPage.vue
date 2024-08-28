<template>
  <AuthContainer>
    <div class="inner" v-if="!isLoading">
      <header>
        <h1>Log in</h1>
        <span class="input-error" v-if="emailNotVerified"
          >Your email address has not been verified yet.<br />Check your inbox
          and click on the verification link.</span
        >
      </header>

      <div class="inputs">
        <div class="group" id="email">
          <i class="fa-regular fa-envelope"></i>
          <input
            placeholder="Email"
            type="email"
            class="input"
            v-model="email"
            @keyup="error = false"
            :class="{
              'input-auth-error': error,
            }"
            autocomplete="email"
          />
        </div>
        <div class="group" id="password">
          <i class="fa-solid fa-lock"></i>
          <input
            placeholder="Password"
            type="password"
            class="input"
            v-model="password"
            @keyup="error = false"
            @keydown.enter="login"
            :class="{
              'input-auth-error': error,
            }"
          />
          <span class="input-error" v-if="error"
            >Incorrect email or password</span
          >
        </div>
      </div>
      <div
        class="caption"
        :class="{
          move: error,
        }"
      >
        <div class="checkbox">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            v-model="rememberMe"
          />
          <label for="rememberMe">Remember me</label>
        </div>

        <router-link to="passwordReset">Forgot password?</router-link>
      </div>

      <basic-button @click="login">Log in</basic-button>

      <div class="other">
        Don't have an account?
        <router-link to="register">Create account</router-link>
      </div>
    </div>
    <div class="inner" v-else>
      <basic-spinner></basic-spinner>
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
      email: "",
      password: "",
      errorMessage: "",
      error: false,
      emailNotVerified: false,
      isLoading: false,
      rememberMe: false,
    };
  },
  methods: {
    login() {
      this.error = false;
      this.emailNotVerified = false;
      this.isLoading = true;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe,
        })
        .catch((error) => {
          if (error === "notverified") {
            this.emailNotVerified = true;
            console.log(error);
          } else {
            this.errorMessage = error;
            this.error = true;
            console.log(this.errorMessage);
          }
          this.password = "";
        })
        .finally(() => {
          this.isLoading = false;
        });
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
    align-items: start;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    h1 {
      font-weight: 700;
    }
    .input-error {
      position: relative;
      font-size: 0.8rem;
      margin: -0.5rem 0 0.5rem 0;
      bottom: 0;
      left: 0;
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
        margin-bottom: 0.6rem;
      }
    }
    i {
      position: absolute;
      left: 1rem;
      color: $font-color-dark;
      width: 1rem;
      height: 1rem;
    }
  }
}

.other,
.caption {
  font-size: 0.8rem;
  a {
    font-weight: 800;
    margin: 0;
    width: auto;
  }
}

.caption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: right;
  &.move {
    margin-top: 0.6rem;
  }
}

.input-error {
  position: absolute;
  font-size: 0.7rem;
  font-weight: 700;
  color: $error-color;
  bottom: -0.5rem;
  left: 1rem;
  pointer-events: none;
  font-family: "Montserrat";
  display: inline-block;
}
</style>
