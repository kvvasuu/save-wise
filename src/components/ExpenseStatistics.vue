<template>
  <div class="widget-container">
    <div class="chart">
      <Pie :data="chartData" :options="chartOptions"></Pie>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";

import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const store = useStore();

const transactions = computed(() => {
  return store.getters.getTransactions;
});

const statistics = ref({});

Object.values(transactions.value)
  .filter((el) => el.transactionType === "expense")
  .forEach((el) => {
    if (el.hasOwnProperty("category")) {
      statistics.value.hasOwnProperty(el.category)
        ? (statistics.value[el.category] += el.amount)
        : (statistics.value[el.category] = el.amount);
    } else {
      statistics.value.hasOwnProperty("other")
        ? (statistics.value.other += el.amount)
        : (statistics.value.other = el.amount);
    }
  });

const chartData = reactive({
  labels: Object.keys(statistics.value).map((el) => {
    return el.split("")[0].toUpperCase() + el.slice(1, el.length);
  }),
  datasets: [
    {
      data: Object.values(statistics.value),
      backgroundColor: ["#e94444", "#2f89ff", "#ffc524", "#eeeeee"], //Bills, Entertainment, Invest, Other
      hoverOffset: 20,
    },
  ],
});
const chartOptions = {
  plugins: {
    legend: {
      position: "right",
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 16,
  },
};

console.log(chartData.value);
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
</style>
