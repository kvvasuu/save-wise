<template>
  <main>
    <div class="accounts">
      <div class="title">
        <h3>Accounts</h3>
      </div>
      <cards-container ref="cardsContainer"></cards-container>
    </div>
    <div class="content" v-if="contentVisible">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component
            :is="Component"
            :key="$route.params.id"
            @goToAccountInfo="goToAccountInfo"
          />
        </transition>
      </router-view>
    </div>
  </main>
</template>

<script setup>
import CardsContainer from "@/components/containers/CardsContainer.vue";
import { RouterView, useRoute } from "vue-router";
import { computed, ref } from "vue";

const route = useRoute();

const cardsContainer = ref(null);
const goToAccountInfo = (number) => {
  cardsContainer.value.goToAccountInfo(number);
};

const contentVisible = computed(() => {
  return route.path !== "/app/accounts";
});
</script>

<style lang="scss" scoped>
main {
  height: 100%;
  width: 100%;
  max-width: 100%;
  min-width: 20rem;
  background-color: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
}
.accounts {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .title {
    height: 4rem;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
}
.content {
  width: 100%;
  min-height: 14rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem 0 0 0;
}
</style>
