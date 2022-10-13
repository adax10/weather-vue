<template>
  <v-card class="forecast-card" v-for="forecast in forecastData.forecast" :key="forecast.date">
    <v-card-title class="forecast-card__header">{{ forecast.date }}</v-card-title>

    <p class="forecast-card__temperature">
      {{ forecast.minTemperature }} <v-icon size="20">mdi-temperature-celsius</v-icon>
      <span class="forecast-card__temperature-divider">|</span>
      {{ forecast.maxTemperature }}<v-icon size="20">mdi-temperature-celsius</v-icon>
    </p>

    <img class="forecast-card__icon" :src="require(`@/assets/${forecast.icon}.svg`)" />

    <div class="forecast-card__wind">
      <p class="forecast-card__wind-average">Wind: {{ forecast.wind }} km/h</p>
      <p class="forecast-card__wind-max">Max: {{ forecast.maxWind }} km/h</p>
    </div>

    <div class="forecast-card__details">
      <p>Humidity: {{ forecast.humidity }}%</p>
      <p>Pressure: {{ forecast.pressure }} hPa</p>
      <p>Precipitation: {{ forecast.precipitation }} mm</p>
    </div>
  </v-card>
</template>

<script setup>
const forecastData = defineProps(['forecast']);
</script>

<style lang="scss" scoped>
@import 'src/styles/mixins/breakpoints.mixins';

.forecast-card {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  margin: 20px;

  @include respond-to('medium') {
    width: 100%;
    margin: 0 20px;
  }

  &__header {
    padding: 0;
  }

  &__temperature {
    font-weight: 700;
    display: flex;
    align-items: center;

    &-divider {
      padding: 0 10px;
    }
  }

  &__wind {
    margin-bottom: 10px;

    &-max {
      font-size: 12px;
      text-align: center;
    }
  }

  &__details {
    text-align: center;
  }
}
</style>
