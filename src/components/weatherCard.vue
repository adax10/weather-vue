<template>
  <v-card class="weather-card" elevation="0">
    <v-card-text class="weather-card__date">{{ now }}</v-card-text>
    <v-card-title class="weather-card__header">{{ weatherData.weather.location }}</v-card-title>

    <div class="weather-card__content">
      <div class="weather-card__basics">
        <div class="weather-card__basics-temperature">
          <img class="weather-card__basics-temperature-icon" :src="require(`@/assets/${weatherData.weather.icon}.svg`)" />

          <p class="weather-card__basics-temperature-text">
            {{ weatherData.weather.temperature }}<v-icon size="22">mdi-temperature-celsius</v-icon>
          </p>
        </div>

        <p class="weather-card__basics-description">{{ weatherData.weather.description }}</p>
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

const weatherData = defineProps(['weather']);

const now = moment(new Date()).format('DD-MM-YYYY, HH:mm');
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

.weather-card {
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

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
    display: flex;
    justify-content: space-around;
  }

  &__basics {
    &-temperature {
      display: flex;
      margin-top: -20px;

      &-icon {
        width: 100px;
      }

      &-text {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        font-size: 20px;
      }
    }

    &-description {
      margin-top: -20px;
    }
  }
}
</style>
