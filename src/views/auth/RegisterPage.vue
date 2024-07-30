<template>
  <AuthContainer :reverse="true">
    <div class="container">
      <div class="inner">
        <header>
          <h1>Sign up</h1>
        </header>

        <div class="inputs">
          <div class="group" id="email">
            <input
              placeholder="Email"
              type="email"
              class="input"
              v-model="email"
              @change="validateEmail"
              :class="{
                'input-auth-error': !emailCorrect && email.length != 0,
              }"
            />
            <i class="fa-regular fa-envelope"></i>
            <span class="input-error" v-if="!emailCorrect && email.length != 0"
              >Please provide correct email</span
            >
          </div>
          <div class="group" id="password">
            <input
              placeholder="Password"
              type="password"
              class="input"
              v-model="password"
              @change="validatePassword"
              :class="{
                'input-auth-error': !passwordCorrect && password.length != 0,
              }"
            />
            <i class="fa-solid fa-lock"></i>
            <span
              class="input-error"
              v-if="!passwordCorrect && password.length != 0"
              >Please provide correct password</span
            >
          </div>
          <div class="group" id="password">
            <input
              placeholder="Confirm password"
              type="password"
              class="input"
              v-model="passwordConfirm"
              @change="validatePasswordConfirm"
              :class="{
                'input-auth-error':
                  !passwordConfirmCorrect && passwordConfirm.length != 0,
              }"
            />
            <i class="fa-solid fa-lock"></i>
            <span
              class="input-error"
              v-if="!passwordConfirmCorrect && passwordConfirm.length != 0"
              >Passwords are not the same</span
            >
          </div>
        </div>
        <div class="caption">
          <input type="checkbox" id="terms" name="terms" value="terms" />
          <label for="terms">I agree to the </label>
          <router-link id="register-button" to="/terms" target="_blank"
            >terms and conditions</router-link
          >
        </div>
        <router-link to="/login"><button>Register</button></router-link>
        <div class="other">
          Already have an account?
          <router-link to="/login">Log in</router-link>
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
      email: "",
      emailCorrect: false,
      password: "",
      passwordCorrect: false,
      passwordConfirm: "",
      passwordConfirmCorrect: false,
    };
  },
  methods: {
    validateEmail() {
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(this.email)
        ? (this.emailCorrect = true)
        : (this.emailCorrect = false);
    },
    validatePassword() {
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(this.email)
        ? (this.passwordCorrect = true)
        : (this.passwordCorrect = false);
    },
    validatePasswordConfirm() {
      this.password === this.passwordConfirm
        ? (this.passwordConfirmCorrect = true)
        : (this.passwordConfirmCorrect = false);
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
    button {
      padding: 1rem;
      width: 100%;
      border: none;
      outline: none;
      background: linear-gradient(
        130deg,
        rgb(149, 121, 252) 0%,
        rgb(54, 57, 223) 100%
      );
      background-position: 0 0;
      background-size: 20rem 3rem;
      color: #eee;
      border-radius: 0.8rem;
      font-family: Montserrat;
      font-weight: 600;
      box-shadow: 0.1rem 0.2rem 0.5rem rgba(30, 36, 56, 0.2);
      cursor: pointer;
      transition: all 0.3s ease-out;
      &:hover {
        transform: translateY(-3px);
        background-position: 100% 50%;
      }
      span {
        color: #aaa;
      }
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
