<template>
  <div class="transaction">
    <div
      class="transaction-info"
      @click="expandListItem"
      :class="{ expanded: isExpanded }"
    >
      <div class="description text">
        <div
          class="icon"
          :class="{ expense: transaction.transactionType === 'expense' }"
        >
          <i
            class="fa-solid fa-piggy-bank"
            v-if="transaction.transactionType === 'income'"
          ></i>
          <i class="fa-solid fa-money-check-dollar expense" v-else></i>
        </div>
        {{ transaction.name }}
      </div>
      <div class="type text">
        {{ displayTransactionType }}
      </div>
      <div class="account text">
        {{ displayAccountName }}
      </div>
      <div
        class="amount text"
        :class="{ expense: transaction.transactionType === 'expense' }"
      >
        {{ displayAmount }}
      </div>
    </div>
    <Transition name="transaction-slide">
      <div class="transaction-expanded" v-if="isExpanded">
        <div class="column left">
          <div class="group">
            <div class="label">Title</div>
            <div class="content">{{ transaction.name }}</div>
          </div>
          <div class="group">
            <div class="label">Amount</div>
            <div
              class="content amount-expanded"
              :class="{ expense: transaction.transactionType === 'expense' }"
            >
              {{ displayAmount }}
            </div>
          </div>
          <div class="group">
            <div class="label">Balance after operation</div>
            <div class="content">{{ displayBalance }}</div>
          </div>
        </div>
        <div class="column right">
          <div class="group">
            <div class="label">Account</div>
            <div class="content">{{ displayAccountName }}</div>
          </div>
          <div class="group">
            <div class="label">Type</div>
            <div class="content">
              {{ displayTransactionType }}
            </div>
          </div>
          <div class="group">
            <div class="label">Date</div>
            <div class="content">{{ displayDate }}</div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { currencyMap } from "@/assets/script";

export default {
  props: ["transaction"],
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    expandListItem() {
      this.isExpanded = !this.isExpanded;
    },
  },
  computed: {
    displayAccountName() {
      return this.$store.getters.getSingleAccountInfo(this.accountIndex)
        .accountName;
    },
    accountIndex() {
      return this.$store.getters.getAccountIndex(this.transaction.accountId);
    },
    displayTransactionType() {
      return this.transaction.transactionType === "income"
        ? "Income"
        : "Expense";
    },
    displayDate() {
      return new Date(this.transaction.transactionDate).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        }
      );
    },
    currency() {
      return currencyMap[
        this.$store.getters.getSingleAccountInfo(this.accountIndex).currency
      ];
    },
    displayAmount() {
      return this.transaction.transactionType === "expense"
        ? `-${this.transaction.amount.toFixed(2)} ${this.currency}`
        : `+${this.transaction.amount.toFixed(2)} ${this.currency}`;
    },
    displayBalance() {
      return "balance" in this.transaction
        ? `${this.transaction.balance.toFixed(2)} ${this.currency}`
        : "-";
    },
  },
};
</script>

<style lang="scss" scoped>
.transaction {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid $details-color;
  &:last-of-type {
    border-bottom: none;
    border-radius: 1rem;
  }
  .transaction-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 4rem;
    width: 100%;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 0.9rem;
    color: $font-color-dark;
    padding: 0 0.6rem;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      background-color: $background-color-dark;
      + .transaction-expanded::after {
        background-color: $background-color-dark;
      }
    }
  }
  .transaction-expanded {
    box-shadow: inset 0 1rem 1rem -1rem rgba(111, 124, 161, 0.2);
    display: flex;
    align-items: flex-start;
    height: 14rem;
    width: 100%;
    background-color: $background-color-dark;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      background-color: $background-color;
      transform: rotate(-45deg);
      width: 16px;
      height: 16px;
      top: -10px;
      left: 6rem;
      box-shadow: -0.1rem 0.1rem 0.9rem rgba(111, 124, 161, 0.2);
    }
    .column {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      top: 0;
      width: 50%;
      height: 14rem;
      padding: 1rem 1.6rem;
      box-sizing: border-box;
      &.left {
        left: 0;
      }
      &.right {
        right: 0;
      }
      .group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        height: 30%;
        width: 100%;
        font-family: Montserrat;
        text-align: left;
        .label {
          font-size: 0.8rem;
          font-weight: 500;
          color: $font-color-light;
          margin: 0 0 0.4rem 0;
        }
        .content {
          font-size: 1rem;
          font-weight: 600;
          color: $font-color-dark;
          &.amount-expanded {
            color: $color-green;
            &.expense {
              color: $color-red;
            }
          }
        }
      }
    }
  }

  .text {
    text-align: left;
    overflow: hidden;
    margin: 0 1rem 0 0;
  }
  .amount {
    color: $color-green;
    text-align: right;
    margin: 0;
    &.expense {
      color: $color-red;
    }
  }
}
.description {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  .icon {
    width: 2.6rem;
    height: 2.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1rem 0 0;
    background-color: $color-green-light;
    border-radius: 2rem;
    &.expense {
      background-color: $color-red-light;
    }
    i {
      font-size: 1.2rem;
      color: $color-green;
      &.expense {
        color: $color-red;
        background-color: none;
      }
    }
  }
}
.type {
  width: 15%;
  font-weight: 500;
}
.account {
  width: 25%;
  font-weight: 500;
}
.amount {
  width: 15%;
  text-align: right;
}

@media (max-width: 1000px) {
  .transaction {
    font-size: 0.8rem;
  }
  .type {
    display: none;
  }
  .amount {
    width: 20%;
  }
  .description {
    width: 45%;
  }
}

@media (max-width: 600px) {
  .amount {
    width: 30%;
  }
  .description {
    width: 70%;
  }
  .account {
    display: none;
  }
}

.transaction-slide-enter-active {
  animation: slide 0.6s ease;
}

.transaction-slide-leave-active {
  animation: slide 0.6s ease reverse;
}

@keyframes slide {
  0% {
    height: 0;
  }
  100% {
    height: 14rem;
  }
}
</style>
