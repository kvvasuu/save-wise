<template>
  <button :disabled="disabled" :class="{ disabled: disabled }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["disabled"],
};
</script>

<style lang="scss" scoped>
button {
  padding: 1rem;
  width: 10rem;
  margin: 2rem 0;
  border: none;
  outline: none;
  background: linear-gradient(
    130deg,
    $primary-color 0%,
    $primary-color-dark 70%
  );
  background-position: 0 0;
  background-size: 30rem 3rem;
  color: $details-color;
  border-radius: 3rem;
  font-family: Montserrat;
  font-weight: 600;
  box-shadow: 0.03rem 0.07rem 0.3rem rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-0.13rem);
    background-position: 50% 50%;
    box-shadow: 0.07rem 0.15rem 0.3rem rgba(0, 0, 0, 0.2);
  }
  &.disabled {
    opacity: 0.9;
    cursor: default;
    box-shadow: none;
    background: rgb(230, 230, 230);
    color: rgb(126, 126, 126);
    &:hover {
      transform: translateY(0);
      background-position: 0 0;
    }
  }
}

.red {
  background: $color-red !important;
  &:hover {
    background-color: $color-red-dark !important;
  }
}

.green {
  background: $color-green !important;
  &:hover {
    background-color: $color-green-dark !important;
  }
}
</style>
