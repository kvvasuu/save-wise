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
  width: 100%;
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
  border-radius: 0.8rem;
  font-family: Montserrat;
  font-weight: 600;
  box-shadow: 0.1rem 0.2rem 0.5rem rgba(0, 0, 0, 0.253);
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-3px);
    background-position: 50% 50%;
  }
  &.disabled {
    opacity: 0.7;
    cursor: default;
    box-shadow: none;
    &:hover {
      transform: translateY(0);
      background-position: 0 0;
    }
  }
}
</style>
