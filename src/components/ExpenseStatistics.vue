<template>
  <div class="widget-container"></div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const transactions = computed(() => {
  return store.getters.getRecentTransactions;
});
</script>

<style lang="scss" scoped>
.widget-container {
  height: 100%;
  width: 100%;
  background-color: $background-color;
  border-radius: 1rem;
  position: relative;
  box-shadow: 0.1rem 0.2rem 0.5rem rgba(54, 54, 54, 0.2);
  padding: 1rem 1rem;
  margin: 0.4rem 0;
  box-sizing: border-box;
}
</style>
