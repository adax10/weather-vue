<template>
  <v-card class="forecast-details" rounded outlined elevation="1">
    <v-card-title class="forecast-details__header">Temperature on {{ route.params.id }}</v-card-title>
    <canvas id="forecast" width="1000" height="500"></canvas>
  </v-card>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Chart, registerables } from 'chart.js';
import { useTheme } from 'vuetify';

Chart.register(...registerables);

const forecastData = defineProps(['forecast']);
const theme = useTheme();
const route = useRoute();
let chartData = ref(null);

const getChartData = (forecastData) => {
  const temperature = [];
  const time = [];
  forecastData.forEach((item) => {
    temperature.push(item.temperature);
    time.push(item.time);
  });

  return { temperature, time };
};

const createChart = (forecastData) => {
  const { temperature, time } = getChartData(forecastData);
  const ctx = document.getElementById('forecast');

  const chartFontDetails = {
    font: {
      size: 12,
      family: 'Montserrat'
    }
  };

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: time,
      datasets: [
        {
          data: temperature,
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
          borderWidth: 2
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          padding: 10,
          ticks: {
            callback: (value) => `${value}°C`,
            ...chartFontDetails
          }
        },
        x: {
          ticks: chartFontDetails
        }
      },
      events: [],
      animation: {
        onComplete: (x) => {
          const chart = x.chart;
          const { ctx } = chart;
          ctx.textAlign = 'center';
          ctx.fillStyle = theme.global.name.value === 'lightTheme' ? '#000000de' : 'white'; // to do
          ctx.textBaseline = 'bottom';
          ctx.font = "12px 'Montserrat'";
          chart.data.datasets.forEach((dataset, i) => {
            const meta = chart.getDatasetMeta(i);
            meta.data.forEach((item, index) => {
              const data = dataset.data[index];
              if (index === 0) ctx.fillText(`${data}°C`, item.x + 20, item.y + 25);
              else ctx.fillText(`${data}°C`, item.x, item.y + 25);
            });
          });
        }
      }
    }
  });
};

onMounted(() => {
  chartData.value = createChart(forecastData.forecast.forecast);
});

watch(forecastData, (value) => {
  const ctx = Chart.getChart(chartData.value);
  ctx.destroy();
  chartData.value = createChart(value.forecast.forecast);
});
</script>

<style lang="scss" scoped>
@import 'src/styles/mixins/breakpoints.mixins';

.forecast-details {
  margin: 30px auto;
  width: 90%;

  @include respond-to('large') {
    width: 1100px;
  }

  &__header {
    text-align: center;
  }
}

canvas {
  width: 100% !important;
  height: 400px !important;
  margin: 10px auto;

  @include respond-to('large') {
    width: 1000px !important;
    height: 500px !important;
  }
}
</style>
