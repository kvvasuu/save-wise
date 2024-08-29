<template>
  <div class="widget-container">
    <div class="legend">
      <span
        ><div class="block income"></div>
        Income</span
      >
      <span
        ><div class="block expense"></div>
        Expense</span
      >
    </div>
    <div class="widget-no-data" v-if="transactions.length === 0">
      <h3>No transactions</h3>
    </div>
    <Transition name="fade" mode="out-in">
      <div class="days" :key="transactions">
        <hr />
        <hr />
        <hr />
        <hr />
        <div class="day" v-for="amount in transactions" :title="amount.day">
          <div class="chart">
            <div
              class="column-wrapper"
              :style="{ height: setChartHeight(amount.income) }"
            >
              <div class="column income" :title="amount.income.toFixed(2)">
                <div class="amount" v-if="amount.income > 0">
                  {{ amount.income.toFixed(0) }}
                </div>
              </div>
            </div>
            <div
              class="column-wrapper"
              :style="{ height: setChartHeight(amount.expense) }"
            >
              <div class="column expense" :title="amount.expense.toFixed(2)">
                <div class="amount" v-if="amount.expense > 0">
                  {{ amount.expense.toFixed(0) }}
                </div>
              </div>
            </div>
          </div>
          <div class="day-name">{{ getDayName(amount.day) }}</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps(["account"]);

const store = useStore();
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const transactions = ref(store.getters.getWeeklyTransactions(props.account));

watch(
  () => props.account,
  (newValue, oldValue) => {
    transactions.value = store.getters.getWeeklyTransactions(newValue);
  }
);

const maxValue = computed(() => {
  return transactions.value.reduce((max, day) => {
    const dayMax = Math.max(day.income, day.expense);
    return dayMax > max ? dayMax : max;
  }, 0);
});

const getDayName = (date) => {
  return dayNames[new Date(date).getDay()];
};

const setChartHeight = (value) => {
  let height = Math.ceil((value / maxValue.value) * 100);
  if (height === 0) height = 0.2;
  return `${height}%`;
};
</script>

<style lang="scss" scoped>
.widget-container {
  flex-direction: column;
}
.widget-no-data {
  position: absolute;
  height: 4rem;
  top: calc(50% - 1.4rem);
}
.legend {
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    margin: 0 0 0 4%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 0.9rem;
    color: $font-color-light;
    .block {
      height: 1rem;
      width: 1rem;
      margin: 0 0.4rem 0 0;
      border-radius: 0.3rem;
      &.expense {
        background-color: $color-red;
      }
      &.income {
        background-color: $color-blue;
      }
    }
  }
}
.days {
  width: 100%;
  height: calc(100% - 3rem);
  margin: 1rem 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  hr {
    margin: 0;
    width: 100%;
    position: absolute;
    top: 10%;
    border: 0;
    height: 0;
    border-top: 1px solid rgba(117, 117, 117, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    z-index: 0;
    &:nth-of-type(2) {
      top: 30%;
    }
    &:nth-of-type(3) {
      top: 50%;
    }
    &:nth-of-type(4) {
      top: 70%;
    }
  }
}
.day {
  display: flex;
  width: 11.5%;
  margin: 0 0.6rem;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  z-index: 2;
  .chart {
    width: 100%;
    height: 85%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 0.5rem;
    .column-wrapper {
      width: 50%;
      position: relative;
      .column {
        width: 100%;
        height: 100%;
        border-radius: 0.6rem;
        position: absolute;
        bottom: 0;
        animation: column-grow 1s ease;
        .amount {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: Montserrat;
          width: 100%;
          top: -1rem;
          height: 1rem;
          font-weight: 600;
          font-size: 0.7rem;
          color: $font-color-light;
          user-select: none;
        }
        &.expense {
          background-color: $color-red;
        }
        &.income {
          background-color: $color-blue;
        }
      }
    }
  }
  .day-name {
    height: 10%;
    width: 100%;
    text-align: center;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 0.9rem;
    color: $font-color-light;
  }
}

@keyframes column-grow {
  0% {
    height: 0.2%;
  }
  100% {
    height: 100%;
  }
}
</style>
