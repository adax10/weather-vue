<template>
  <v-card class="weather-card" elevation="0">
    <v-card-text class="weather-card__date">{{ now }}</v-card-text>
    <v-card-title class="weather-card__header"
      >{{ upperFirst(weatherData.weather.location) }}, {{ weatherData.weather.country }}</v-card-title
    >

    <div class="weather-card__content">
      <div class="weather-card__temperature">
        <img class="weather-card__temperature-icon" :src="require(`@/assets/${weatherData.weather.icon}.svg`)" />

        <p class="weather-card__temperature-text">
          {{ weatherData.weather.temperature }}<v-icon size="22">mdi-temperature-celsius</v-icon>
        </p>
      </div>

      <div class="weather-card__sun">
        <p>Sunrise: {{ weatherData.weather.sunrise }}</p>
        <p>Sunset: {{ weatherData.weather.sunset }}</p>
      </div>

      <div class="weather-card__details">
        <p>Wind: {{ weatherData.weather.wind }} km/h</p>
        <p>Humidity: {{ weatherData.weather.humidity }}%</p>
        <p>Pressure: {{ weatherData.weather.pressure }} hPa</p>
        <p>Precipitation: {{ weatherData.weather.precipitation }} mm</p>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import moment from 'moment';
import { upperFirst } from 'lodash';

const weatherData = defineProps(['weather']);

const now = moment(new Date()).format('DD-MM-YYYY, HH:mm');
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';
@import 'src/styles/mixins/breakpoints.mixins';

.weather-card {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  @include respond-to('medium') {
    width: 1000px;
  }

  &__date {
    padding: 0;
    color: $primary;
  }

  &__header {
    padding: 0;
    margin-bottom: 20px;
    font-weight: 700;
  }

  &__content {
    @include respond-to('small') {
      display: flex;
      justify-content: space-around;
    }
  }

  &__temperature {
    display: flex;
    margin-top: -30px;
    justify-content: center;
    align-items: center;

    &-icon {
      width: 100px;
    }

    &-text {
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 20px;
    }
  }

  &__details {
    margin-top: 20px;

    @include respond-to('small') {
      margin-top: 0;
    }
  }
}
</style>
