<template>
  <div class="search">
    <input
      type="text"
      placeholder="Search..."
      @keyup="search"
      v-model="query"
    /><i class="fa-solid fa-magnifying-glass"></i>
    <div class="list" v-if="results.length > 0">
      <ul>
        <li v-for="result in results" @click="navigate(result.route)">
          <div class="name">
            <span v-html="highlightMatch(result.name)"></span>
          </div>
          <div class="description">
            <span v-html="highlightMatch(result.description)"></span>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="list"
      v-else-if="query !== '' && query.length >= 3 && results.length <= 0"
    >
      <ul>
        <li class="no-results">No results</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { functionalities } from "@/assets/script";

const router = useRouter();

const query = ref("");
const results = ref([]);

const search = () => {
  if (query.value) {
    const lowerCaseQuery = query.value.toLowerCase();
    if (query.value.length >= 2) {
      results.value = functionalities
        .filter(
          (func) =>
            func.name.toLowerCase().includes(lowerCaseQuery) ||
            func.description.toLowerCase().includes(lowerCaseQuery)
        )
        .slice(0, 8);
    }
  } else {
    results.value = [];
  }
};

const highlightMatch = (text) => {
  if (!query.value) return text;
  const queryRegex = new RegExp(
    `(${query.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  return text.replace(queryRegex, `<span class="strong">$1</span>`);
};

const navigate = (route) => {
  router.push(route);
  results.value = [];
  query.value = "";
};
</script>

<style lang="scss" scoped>
.search {
  width: 14rem;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: right;
  input {
    width: 10rem;
    height: 2.6rem;
    margin: 0;
    box-sizing: border-box;
    border-radius: 10rem;
    padding: 0 1rem 0 2.4rem;
    transition: all 0.3s ease;
    outline: none;
    &:focus {
      width: 14rem;
      border: 1px solid $primary-color;
      color: $primary-color;
      & + i {
        color: $primary-color;
        left: 1rem;
      }
      ~ .list {
        left: 1rem;
        visibility: visible;
      }
    }
  }
  i {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    position: absolute;
    top: calc(50% - 1rem);
    left: 5rem;
    color: $font-color-light;
    transition: all 0.3s ease;
  }
}

.list {
  position: absolute;
  top: 80%;
  left: 5rem;
  width: 100%;
  z-index: 10;
  transition: all 0.3s ease;
  visibility: collapse;
  ul {
    border-radius: 0.4rem;
    border: 1px solid $details-color;
    padding: 0.4rem;
    background-color: $background-color;
    list-style: none;
    margin: 0;
    width: 100%;
    li {
      background-color: $background-color;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.6rem;
      span :deep(.strong) {
        font-weight: 700;
        color: $primary-color;
      }
      .description {
        font-size: 0.8rem;
        color: $font-color-light;
      }
      &:hover:not(.no-results) {
        background-color: $details-color;
      }
      &.no-results {
        cursor: default;
      }
    }
  }
}
</style>
