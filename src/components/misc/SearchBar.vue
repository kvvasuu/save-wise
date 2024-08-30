<template>
  <div class="search">
    <input
      type="text"
      placeholder="Search for something..."
      @keyup="search"
      v-model="query"
    /><i class="fa-solid fa-magnifying-glass"></i>
    <div class="list" v-if="results.length > 0">
      <ul>
        <li v-for="result in results">{{ result.name }}</li>
      </ul>
    </div>
    <div class="list" v-else-if="query !== '' && results.length <= 0">
      <li>No results</li>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const query = ref(null);
const results = ref([]);
const functionalities = ref([
  {
    name: "Deposit",
    description: "Zrealizuj przelew bankowy",
    route: "/przelew",
  },
  {
    name: "Withdraw",
    description: "Zrealizuj przelew bankowy",
    route: "/przelew",
  },
  {
    name: "Accounts",
    description: "Zarządzaj swoimi kontami",
    route: "/konta",
  },
  {
    name: "Transactions",
    description: "Sprawdź historię transakcji",
    route: "/historia",
  },
  {
    name: "Settings",
    description: "Sprawdź historię transakcji",
    route: "/historia",
  },
  {
    name: "Profile",
    description: "Sprawdź historię transakcji",
    route: "/historia",
  },
  {
    name: "Preferences",
    description: "Sprawdź historię transakcji",
    route: "/historia",
  },
  {
    name: "Currency",
    description: "Sprawdź historię transakcji",
    route: "/historia",
  },
  {
    name: "Notifications",
    description: "Sprawdź historię transakcji",
    route: "/historia",
  },
  {
    name: "Add account",
    description: "Sprawdź historię transakcji",
    route: "/historia",
  },
]);

const search = () => {
  if (query.value) {
    console.log(query.value);
    const lowerCaseQuery = query.value.toLowerCase();
    results.value = functionalities.value
      .filter(
        (func) =>
          func.name.toLowerCase().includes(lowerCaseQuery) ||
          func.description.toLowerCase().includes(lowerCaseQuery)
      )
      .slice(0, 8);
  } else {
    results.value = [];
  }
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    width: 100%;
    height: 2.6rem;
    margin: 0;
    box-sizing: border-box;
    border-radius: 10rem;
    padding: 0 1rem 0 2.4rem;
    &:focus + i {
      color: $primary-color;
    }
  }
  i {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    position: absolute;
    top: calc(50% - 1rem);
    left: 1rem;
    color: $font-color-light;
  }
}

.list {
  position: absolute;
  top: 80%;
  left: 0;
  width: 100%;
  z-index: 10;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>
