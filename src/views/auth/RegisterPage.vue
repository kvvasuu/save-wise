<template>
  <AuthContainer :reverse="true">
    <div class="inner" v-if="!registerComplete && !isLoading">
      <header>
        <h1>Sign up</h1>
        <span class="input-error" v-if="emailTakenError">{{
          emailTakenErrorContent
        }}</span>
      </header>

      <div class="inputs">
        <div class="group" id="email">
          <input
            placeholder="Email"
            type="email"
            class="input"
            v-model="email"
            @blur="validateEmail"
            @click="emailError = false"
            :class="{
              'input-auth-error': emailError,
            }"
          />
          <i class="fa-regular fa-envelope"></i>
          <span class="input-error" v-if="emailError"
            >Please provide correct email</span
          >
        </div>
        <div class="group" id="password">
          <input
            placeholder="Password"
            type="password"
            class="input"
            v-model="password"
            @blur="validatePassword"
            @click="passwordError = false"
            :class="{
              'input-auth-error': passwordError,
            }"
          />
          <i class="fa-solid fa-lock"></i>
          <span class="input-error" v-if="passwordError"
            >Password must be at least 6 characters long.</span
          >
        </div>
        <div class="group" id="password">
          <input
            placeholder="Confirm password"
            type="password"
            class="input"
            v-model="passwordConfirm"
            @click="passwordConfirmError = false"
            @blur="validatePasswordConfirm"
            :class="{
              'input-auth-error': passwordConfirmError,
            }"
          />
          <i class="fa-solid fa-lock"></i>
          <span class="input-error" v-if="passwordConfirmError"
            >Passwords are not the same</span
          >
        </div>
      </div>
      <div class="caption">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          value="terms"
          v-model="checkbox"
          @change="validateTerms"
        />
        <label for="terms">I agree to the </label>
        <router-link id="terms-button" to="/terms" target="_blank"
          >terms and conditions</router-link
        >
        <span class="input-error" v-if="checkboxError"
          >You must agree with terms and conditions</span
        >
      </div>
      <basic-button @click="register">Register</basic-button>
      <div class="other">
        Already have an account?
        <router-link to="/login">Log in</router-link>
      </div>
    </div>
    <div class="inner" v-else-if="!registerComplete && isLoading">
      <basic-spinner></basic-spinner>
    </div>
    <div class="inner" v-else>
      <header class="registration-complete">
        <h1>Registration successful! Welcome aboard.</h1>
        <i class="fa-solid fa-check"></i>
      </header>

      <div class="caption registration-complete">
        Please check <b>{{ passEmail }}</b> to confirm your registration.
      </div>
      <div class="other">
        <router-link to="/login">Back</router-link>
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
      registerComplete: false,
      isLoading: false,
      email: "",
      emailCorrect: false,
      emailError: false,
      password: "",
      passwordCorrect: false,
      passwordError: false,
      passwordConfirm: "",
      passwordConfirmCorrect: false,
      passwordConfirmError: false,
      checkbox: false,
      checkboxError: false,
      emailTakenError: false,
      emailTakenErrorContent: "Something went wrong. Try again later.",
    };
  },
  methods: {
    validateEmail() {
      if (this.email.length == 0) {
        this.emailError = false;
      }
      if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(this.email)) {
        this.emailCorrect = true;
        this.emailError = false;
      } else {
        this.emailCorrect = false;
        this.emailError = true;
      }
    },
    validatePassword() {
      if (this.password.length == 0) {
        this.passwordError = false;
      }
      if (this.password.length >= 6) {
        this.passwordCorrect = true;
        this.passwordError = false;
      } else {
        this.passwordCorrect = false;
        this.passwordError = true;
      }
    },
    validatePasswordConfirm() {
      if (this.passwordConfirm.length == 0) {
        this.passwordConfirmError = false;
      }
      if (this.password === this.passwordConfirm) {
        this.passwordConfirmCorrect = true;
        this.passwordConfirmError = false;
      } else {
        this.passwordConfirmCorrect = false;
        this.passwordConfirmError = true;
      }
    },
    validateTerms() {
      this.checkbox
        ? (this.checkboxError = false)
        : (this.checkboxError = true);
    },
    register() {
      this.validateEmail();
      this.validatePassword();
      this.validatePasswordConfirm();
      this.validateTerms();
      this.emailTakenError = false;
      this.isLoading = true;
      if (
        this.emailCorrect &&
        this.passwordCorrect &&
        this.passwordConfirmCorrect &&
        this.checkbox
      ) {
        this.$store
          .dispatch("register", {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.registerComplete = true;
          })
          .catch((error) => {
            this.emailTakenError = true;
            if (error === "auth/email-already-in-use") {
              this.emailTakenErrorContent =
                "The provided email address is already registered in our system. If you forgot your password, please use the password recovery option.";
            } else {
              this.emailTakenErrorContent =
                "Something went wrong. Try again later.";
            }
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
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
    align-items: start;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    &.registration-complete {
      align-items: center;
      margin: 0 0 1rem 0;
      text-align: center;
    }
    .input-error {
      position: relative;
      font-size: 0.8rem;
      margin: -0.5rem 0 0.5rem 0;
      bottom: 0;
      left: 0;
    }
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
    color: #6485ff;
    &:hover {
      color: #604eff;
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
    margin: 0.4rem 0;
    .input {
      width: 100%;
      height: 3rem;
      padding: 0 1rem;
      padding-left: 2.5rem;
      border: none;
      border-radius: 0.8rem;
      outline: none;
      background-color: #f2eeff;
      color: #1e2438;
      margin: 0;
      &::placeholder {
        color: #6f7ca1;
      }
      &:focus {
        outline: 2px solid rgba(96, 78, 255, 0.5);
      }
      &.input-auth-error {
        outline: 2px solid rgb(255, 41, 41) !important;
        margin-bottom: 0.6rem;
      }
    }
    i {
      position: absolute;
      top: 1rem;
      left: 1rem;
      color: #1e2438;
      width: 1rem;
      height: 1rem;
    }
  }
}

.other,
.caption {
  font-size: 0.8rem;
  width: 100%;
  margin: 0.4rem 0 0 0;
  position: relative;
  &.registration-complete {
    align-items: center;
    text-align: center;
    margin: 0 0 1rem 0;
  }
  .input-error {
    bottom: -0.8rem;
    left: 1rem;
  }
  a {
    font-weight: 800;
    margin: 0;
  }
}

.other {
  width: auto;
}

.input-error {
  position: absolute;
  font-size: 0.7rem;
  font-weight: 700;
  color: rgb(255, 41, 41);
  bottom: -0.5rem;
  left: 1rem;
  pointer-events: none;
  font-family: "Montserrat";
  display: inline-block;
}
</style>
