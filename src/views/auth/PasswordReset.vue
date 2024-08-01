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
        <button @click="resetPassword">Send</button>
        <div class="other">
          <router-link to="/login">Back</router-link>
        </div>
      </div>
      <div class="inner" v-else-if="!isSent && isLoading">
        <Spinner></Spinner>
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
          <router-link to="/login">Back</router-link>
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
    color: #6485ff;
    &:hover {
      color: #604eff;
    }
  }
}

button {
  width: 60%;
  margin: 2rem 0 1.2rem 0;
  padding: 1rem;
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
      }
    }
    i {
      position: absolute;
      left: 1rem;
      color: #1e2438;
      width: 1rem;
      height: 1rem;
    }
    .input-error {
      position: absolute;
      font-size: 0.7rem;
      font-weight: 700;
      color: rgb(255, 41, 41);
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
