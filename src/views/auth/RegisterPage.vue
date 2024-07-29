<template>
  <AuthContainer :reverse="true">
    <div class="container">
      <div class="inner">
        <header>
          <h1>Sign up</h1>
        </header>

        <div class="inputs">
          <div class="group" id="email">
            <i class="fa-regular fa-envelope"></i>
            <input placeholder="Email" type="email" class="input" />
          </div>
          <div class="group" id="password">
            <i class="fa-solid fa-lock"></i>
            <input placeholder="Password" type="password" class="input" />
          </div>
          <div class="group" id="password">
            <i class="fa-solid fa-lock"></i>
            <input
              placeholder="Confirm password"
              type="password"
              class="input"
            />
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
      transition: 0.3s ease;
      margin: 0.4rem 0;
      &::placeholder {
        color: #6f7ca1;
      }
      &:focus,
      &:hover {
        outline: none;
        background-color: #f5f6fa;
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
  width: 100%;
  a {
    font-weight: 800;
    margin: 0;
  }
}

.other {
  width: auto;
}
</style>
