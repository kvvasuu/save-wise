<template>
  <basic-spinner v-if="$store.getters.isLoading"></basic-spinner>
  <RouterView v-else></RouterView>
</template>

<script setup>
import { RouterView } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
store.dispatch("autoLogin");
</script>

<style lang="scss" scoped></style>
