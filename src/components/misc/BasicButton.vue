<template>
  <button>
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  padding: 1rem;
  width: 100%;
  margin: 2rem 0;
  border: none;
  outline: none;
  background: linear-gradient(
    130deg,
    rgb(149, 121, 252) 0%,
    rgb(54, 57, 223) 70%
  );
  background-position: 0 0;
  background-size: 30rem 3rem;
  color: #eee;
  border-radius: 0.8rem;
  font-family: Montserrat;
  font-weight: 600;
  box-shadow: 0.1rem 0.2rem 0.5rem rgba(30, 36, 56, 0.2);
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    transform: translateY(-3px);
    background-position: 50% 50%;
  }
}
</style>
