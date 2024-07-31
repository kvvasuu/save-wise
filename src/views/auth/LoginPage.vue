<template>
  <AuthContainer>
    <div class="inner">
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
      <div class="caption">
        <router-link to="/passwordReset">Forgot password?</router-link>
      </div>

      <button @click="login">Log in</button>

      <div class="other">
        Don't have an account?
        <router-link to="/register">Create account</router-link>
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
      password: "",
      errorMessage: "",
      error: false,
      emailNotVerified: false,
    };
  },
  methods: {
    login() {
      this.error = false;
      this.emailNotVerified = false;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/app");
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
    color: #6485ff;
    &:hover {
      color: #604eff;
    }
  }
}

button {
  padding: 1rem;
  width: 60%;
  margin: 2rem 0;
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
      background-color: #f2eeff;
      color: #1e2438;
      margin: 0.4rem 0;
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
  a {
    font-weight: 800;
    margin: 0;
  }
}

.caption {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  text-align: right;
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
