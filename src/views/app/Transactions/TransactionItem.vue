<template>
  <div class="transaction">
    <div class="transaction-info">
      <div class="description text">
        <div class="icon">
          <i
            class="fa-solid fa-piggy-bank"
            v-if="transaction.transactionType === 'income'"
          ></i>
          <i class="fa-solid fa-money-check-dollar expense" v-else></i>
        </div>
        {{ transaction.name }}
      </div>
      <div class="type text">
        {{ displayTransactionType(transaction.transactionType) }}
      </div>
      <div class="account text">
        {{ displayAccountName(transaction.accountId) }}
      </div>
      <div
        class="amount text"
        :class="{ expense: transaction.transactionType === 'expense' }"
      >
        {{
          displayAmount(
            transaction.amount,
            transaction.transactionType,
            transaction.accountId
          )
        }}
      </div>
    </div>
    <div class="transaction-expanded" v-if="isExpanded">dadsdsa</div>
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
    displayTransactionType(type) {
      return type === "income" ? "Income" : "Expense";
    },
    displayAccountName(id) {
      return this.$store.getters.getSingleAccountInfo(id).accountName;
    },
    displayDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      });
    },
    displayAmount(amount, type, id) {
      const currency =
        currencyMap[this.$store.getters.getSingleAccountInfo(id).currency];
      return type === "expense"
        ? `-${amount.toFixed(2)} ${currency}`
        : `${amount.toFixed(2)} ${currency}`;
    },
    expandListItem() {
      this.isExpanded = !this.isisExpanded;
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
  &:hover {
    background-color: $background-color-dark;
  }
  &:last-of-type {
    border-bottom: none;
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
  }
  .transaction-expanded {
    display: flex;
    height: 10rem;
    width: 100%;
    overflow-y: hidden;
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
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1rem 0 0;
    i {
      font-size: 1.6rem;
      color: $color-green;
      &.expense {
        color: $color-red;
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
</style>
