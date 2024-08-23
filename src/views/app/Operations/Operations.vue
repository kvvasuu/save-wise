<template>
  <main></main>
</template>

<script></script>

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
    .active {
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

.transaction-list {
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 0;
  box-sizing: border-box;
  .no-transactions {
    opacity: 0.4;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  ul {
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    .top-bar {
      min-height: 2rem;
      margin: 1rem 0 0 0;
      width: 100%;
      border-bottom: $border;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-family: Montserrat;
      font-weight: 600;
      color: $font-color-light;
      font-size: 0.8rem;
      box-sizing: border-box;
      padding: 0 0.6rem;
    }
    .description {
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;
      margin: 0 1rem 0 0;
    }
    .type {
      width: 15%;
      margin: 0 1rem 0 0;
    }
    .account {
      width: 25%;
      margin: 0 1rem 0 0;
    }
    .amount {
      width: 15%;
      text-align: right;
    }
  }
}

.pagination {
  width: 100%;
  margin: 1.4rem 0 0 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 0.6rem;
  box-sizing: border-box;
  .pagination-button {
    padding: 0.76rem 1rem;
    margin: 0;
    border: none;
    outline: none;
    background-color: transparent;
    color: $primary-color;
    border-radius: 0.8rem;
    cursor: pointer;
    font-family: Montserrat;
    font-weight: 600;
    &.active {
      background-color: $primary-color;
      color: $details-color;
      cursor: default;
    }
    &:hover:not(.disabled) {
      background-color: $primary-color;
      color: $details-color;
    }
    &.disabled {
      opacity: 0.9;
      cursor: default;
      color: rgb(126, 126, 126);
    }
    i {
      margin: 0 0.3rem;
    }
  }
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

@keyframes linkAppear {
  0% {
    width: 0%;
    left: 50%;
    bottom: -0.18rem;
  }
  100% {
    left: 0;
    width: 100%;
    bottom: -0.18rem;
  }
}

@media (max-width: 1000px) {
  main {
    .navbar {
      ul {
        a {
          .list-item-inner {
            padding: 0.8rem 1rem;
          }
        }
      }
    }
  }
  .transaction-list {
    ul {
      .type {
        display: none;
      }
      .amount {
        width: 20%;
        margin: 0;
      }
      .description {
        width: 45%;
      }
    }
  }
}

@media (max-width: 600px) {
  main {
    padding: 1rem 1rem 1.2rem 1rem;
  }

  .transaction-list {
    ul {
      .account {
        display: none;
      }
      .amount {
        width: 30%;
      }
      .description {
        width: 70%;
      }
    }
  }
}
</style>
