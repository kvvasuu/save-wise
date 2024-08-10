<template>
  <div
    class="card"
    :style="{ background: passGradient }"
    ref="card"
    :class="{ unselected: unselected }"
  >
    <div class="inner">
      <img
        src="../../assets/logos/logo-horizontal.png"
        alt=""
        class="logo"
        draggable="false"
      />
      <img
        src="../../assets/images/chip.svg"
        alt=""
        class="chip"
        draggable="false"
      />
      <div class="name">{{ accountName }}</div>
      <div class="balance">{{ accountBalance }} {{ accountCurrency }}</div>
    </div>
  </div>
</template>

<script>
import { gradientMap, currencyMap } from "@/assets/script";
export default {
  props: ["accountNumber", "account"],
  data() {
    return {
      currencyMap: currencyMap,
      gradientMap: gradientMap,
      unselected: false,
    };
  },
  computed: {
    accountName() {
      return this.account.accountName;
    },
    accountCurrency() {
      return this.currencyMap[this.account.currency];
    },
    accountBalance() {
      return this.account.balance.toFixed(2);
    },
    passGradient() {
      return this.gradientMap[this.account.color];
    },
  },
  methods: {
    setUnselected(value) {
      this.unselected = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  border-radius: 1rem;
  min-width: 22rem;
  height: 14.61rem;
  position: relative;
  background: rgb(0, 0, 0);
  box-shadow: 0.2rem 0.3rem 0.3rem rgba(0, 0, 0, 0.2);
  padding: 1rem;
  overflow: hidden;
  box-sizing: border-box;
  transition: all 0.3s ease;
  scroll-snap-align: start;
  user-select: none;
  &.unselected {
    opacity: 0.8;
    filter: grayscale(1);
  }
  &:hover {
    transform: translateY(-2px);
  }
  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    color: black;
    filter: brightness(0) saturate(100%) invert(100%) sepia(1%) saturate(1839%)
      hue-rotate(231deg) brightness(113%) contrast(90%);
    .logo {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: auto;
      height: 2.2rem;
      opacity: 0.8;
      filter: grayscale(1);
      user-select: none;
    }
    .chip {
      position: absolute;
      top: calc(50% - 1.2rem);
      left: 2rem;
      width: auto;
      height: 2.4rem;
      opacity: 0.8;
      filter: grayscale(1);
      user-select: none;
    }
    .name {
      font-family: Montserrat;
      font-weight: 700;
      text-transform: uppercase;
      color: inherit;
      opacity: 0.8;
      position: absolute;
      bottom: 2rem;
      left: 2rem;
      user-select: none;
    }
    .balance {
      font-family: Montserrat;
      font-weight: 700;
      color: inherit;
      opacity: 0.8;
      font-size: 1.3rem;
      position: absolute;
      bottom: calc(50% - 1.1rem);
      left: 6rem;
      user-select: none;
      &::before {
        content: "Balance";
        position: absolute;
        font-size: 0.6rem;
        top: -0.7rem;
      }
    }
  }
}
</style>
