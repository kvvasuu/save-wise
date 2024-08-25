<template>
  <div class="inner"></div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style lang="scss" scoped>
.inner {
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

.group {
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 0.8rem;
  color: $font-color-dark;
  margin: 0 0 0.2rem 0;
  .select {
    appearance: none;
    outline: 0;
    color: #828a9e;
    width: 7rem;
    height: 1.8rem;
    padding-left: 1rem;
    background: url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg)
        no-repeat right 0.5rem center / 1rem,
      linear-gradient(to left, $primary-color 2rem, $background-color-dark 2rem);
    border: none;
    border-right: 1px solid $primary-color;
    border-radius: 0.6rem;
    cursor: pointer;
    &::-ms-expand {
      display: none;
    }
    &:focus {
      border: 1px solid $primary-color;
    }
    option {
      color: inherit;
    }
  }
}
</style>
