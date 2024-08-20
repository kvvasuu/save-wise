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
    <div class="days">
      <div class="day" v-for="amount in transactions">
        <div class="chart">
          <div
            class="column income"
            :style="{ height: setChartHeight(amount.income) }"
          ></div>
          <div
            class="column expense"
            :style="{ height: setChartHeight(amount.expense) }"
          ></div>
        </div>
        <div class="day-name">{{ dayNames[amount.day] }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const transactions = computed(() => {
  return store.getters.getWeeklyTransactions;
});

const maxValue = transactions.value.reduce((max, day) => {
  const dayMax = Math.max(day.income, day.expense);
  return dayMax > max ? dayMax : max;
}, 0);

const setChartHeight = (value) => {
  let height = Math.ceil((value / maxValue) * 100);
  if (height === 0) height = 0.2;
  return `${height}%`;
};
</script>

<style lang="scss" scoped>
.widget-container {
  height: 100%;
  width: 100%;
  background-color: $background-color;
  border-radius: 1rem;
  position: relative;
  box-shadow: 0.1rem 0.2rem 0.5rem rgba(54, 54, 54, 0.2);
  padding: 1rem 1rem;
  margin: 0.4rem 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  height: calc(100% - 2rem);
  display: flex;
  align-items: center;
  justify-content: center;
}
.day {
  display: flex;
  width: 11.5%;
  margin: 0 0.6rem;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  .chart {
    width: 100%;
    height: 85%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 0.5rem;
    .column {
      width: 50%;
      border-radius: 0.6rem;
      &.expense {
        background-color: $color-red;
      }
      &.income {
        background-color: $color-blue;
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
</style>
