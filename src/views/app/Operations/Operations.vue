<template>
  <main>
    <div class="navbar">
      <ul>
        <RouterLink
          to="/app/operations"
          exact-active-class="router-active"
          @click="changePage('Deposit')"
        >
          <div class="list-item-inner">Deposit</div>
        </RouterLink>
        <RouterLink
          to="/app/operations/withdraw"
          exact-active-class="router-active"
          @click="changePage('Withdraw')"
        >
          <div class="list-item-inner">Withdraw</div>
        </RouterLink>
        <!-- <RouterLink
          to="/app/operations/transfer"
          exact-active-class="router-active"
          @click="changePage('Deposit')"
        >
          <div class="list-item-inner">Transfer</div>
        </RouterLink> -->
      </ul>
    </div>
    <RouterView></RouterView>
  </main>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";

const currentPage = ref("Deposit");

const changePage = (page) => {
  currentPage.value = page;
};
</script>

<style lang="scss" scoped>
main {
  height: 100%;
  width: 80rem;
  max-width: 100%;
  min-width: 20rem;
  background-color: $background-color;
  border: none;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem 1.6rem 2rem;
  box-sizing: border-box;
  box-shadow: 0.2rem 0.3rem 0.6rem rgba(190, 190, 190, 0.2);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  width: 100%;
  border-bottom: $border;
  box-sizing: border-box;
  ul {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    a {
      list-style: none;
      cursor: pointer;
      position: relative;
      &:hover .list-item-inner {
        transform: translateY(-0.13rem);
      }
      .list-item-inner {
        color: $font-color-light;
        padding: 0.8rem 1.6rem;
        display: flex;
        align-items: center;
        transition: 0.4s ease;
        font-family: Montserrat;
        font-weight: 600;
        font-size: 0.9rem;
        text-align: center;
      }
    }
    .router-active {
      .list-item-inner {
        color: $primary-color;
        transform: translateY(-0.13rem);
      }
      &:hover {
        background-color: transparent !important;
      }
      &::before {
        content: "";
        position: absolute;
        bottom: -0.18rem;
        left: 50%;
        background-color: $primary-color;
        height: 0.2rem;
        width: 0%;
        border-top-right-radius: 1rem;
        border-top-left-radius: 1rem;
        animation: linkAppear 0.4s ease forwards;
      }
    }
  }
}
</style>
