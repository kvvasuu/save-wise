<template>
  <div
    class="card"
    :style="{ background: passGradient }"
    ref="card"
    :class="{ unselected: unselected }"
  >
    <div class="inner" :style="{ filter: passColor }">
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
export default {
  props: ["accountNumber", "account"],
  data() {
    return {
      currencyMap: {
        USD: "$",
        EUR: "€",
        PLN: "zł",
      },
      gradientMap: {
        black: `linear-gradient(120deg, rgba(0, 0, 0, 1) 0%, rgba(30, 30, 30, 1) 17%, rgba(20, 20, 20, 1) 51%, rgba(70, 70, 70, 1) 81%, rgba(20, 20, 20, 1) 100%)`,
        gold: `linear-gradient(120deg, rgba(180,135,0,1) 0%, rgba(238,188,33,1) 6%, rgba(180,135,0,1) 57%, rgba(231,192,77,1) 81%, rgba(180,135,0,1) 100%)`,
      },
      colorMap: {
        black:
          "brightness(0) saturate(100%) invert(80%) sepia(77%) saturate(1095%) hue-rotate(336deg) brightness(102%) contrast(101%)",
        gold: "brightness(0) saturate(100%) invert(100%) sepia(1%) saturate(135%) hue-rotate(188deg) brightness(115%) contrast(88%)",
      },
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
    passColor() {
      return this.colorMap[this.account.color];
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
