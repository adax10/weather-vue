<template>
  <v-card class="forecast-card" rounded outlined elevation="1">
    <v-card-title class="forecast-card__header">{{ forecastData.forecast.date }}</v-card-title>

    <p class="forecast-card__temperature">
      {{ forecastData.forecast.minTemperature }}°C
      <span class="forecast-card__temperature-divider">|</span>
      {{ forecastData.forecast.maxTemperature }}°C
    </p>

    <img class="forecast-card__icon" :src="require(`@/assets/${forecastData.forecast.icon}.svg`)" />

    <div class="forecast-card__wind">
      <p class="forecast-card__wind-average">Wind: {{ forecastData.forecast.wind }} km/h</p>
      <p class="forecast-card__wind-max">Max: {{ forecastData.forecast.maxWind }} km/h</p>
    </div>

    <div class="forecast-card__details">
      <p>Humidity: {{ forecastData.forecast.humidity }}%</p>
      <p>Pressure: {{ forecastData.forecast.pressure }} hPa</p>
      <p>Precipitation: {{ forecastData.forecast.precipitation }} mm</p>
    </div>

    <div class="forecast-card__actions">
      <span @click="toggleDetails">
        <slot name="action">
          <v-btn rounded :color="`${openedDetails && 'primary'}`">
            <span v-if="!openedDetails">Show details</span>
            <span v-else>Hide details</span>
          </v-btn>
        </slot>
      </span>
    </div>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const forecastData = defineProps(['forecast']);
let openedDetails = ref(false);
const emit = defineEmits(['toggleDetails']);

const toggleDetails = () => {
  openedDetails.value = !openedDetails.value;
  emit('toggleDetails', openedDetails.value ? forecastData.forecast.date : null);
};

watch(
  route,
  (route) => {
    if (forecastData.forecast.date != route.params.id) {
      if (openedDetails.value) openedDetails.value = !openedDetails.value;
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
@import 'src/styles/mixins/breakpoints.mixins';

.forecast-card {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  margin: 0 auto 20px;

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

  &__actions {
    display: none;

    @include respond-to('small') {
      margin-top: 20px;
      display: block;
    }
  }
}
</style>
