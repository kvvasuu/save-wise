<template>
  <div class="widget-container">
    <div class="widget-no-data" v-if="data.length <= 0">
      <h3>No statistics yet</h3>
    </div>
    <div class="chart" v-else>
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
const expenseSum = ref(0);

Object.values(transactions.value)
  .filter((el) => el.transactionType === "expense")
  .forEach((el) => {
    expenseSum.value += el.amount;
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

statistics.value = Object.fromEntries(
  Object.entries(statistics.value).map(([key, value]) => [
    key,
    Math.round((value / expenseSum.value) * 100 * 1e2) / 1e2,
  ])
);

const labels = Object.keys(statistics.value).map((el) => {
  return el.split("")[0].toUpperCase() + el.slice(1, el.length);
});

const data = Object.values(statistics.value);

const chartData = reactive({
  labels: labels,
  datasets: [
    {
      data: data,
      backgroundColor: (context) => {
        const label = context.chart.data.labels[context.dataIndex];
        const colorMapping = {
          other: "#cccccc",
          entertainment: "#2f89ff",
          investment: "#ffc524",
          bills: "#e94444",
        };
        return colorMapping[label.toLowerCase()];
      },
      hoverOffset: 20,
    },
  ],
});
const chartOptions = {
  plugins: {
    legend: {
      position: "right",
      onClick: null,
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          let label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          if (context.raw !== null) {
            label += context.raw + "%";
          }
          return label;
        },
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 16,
  },
};
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
