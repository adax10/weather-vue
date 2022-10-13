<template>
  <v-card class="weather-search" rounded outlined elevation="0" width="700">
    <v-card-title class="weather-search__header">Search weather</v-card-title>

    <v-form ref="form" class="weather-search__form" v-model="valid">
      <v-card-text class="weather-search__form-text">Please enter city name to search for the weather</v-card-text>
      <v-text-field
        class="weather-search__form-input"
        v-model="location"
        :rules="weatherInputRules"
        variant="underlined"
      ></v-text-field>
      <div class="weather-search__form-button"><v-btn :disabled="!valid" color="primary" @click="submit">Search</v-btn></div>
    </v-form>
  </v-card>

  <div v-if="loaded" class="weather-result">
    <weather-card class="weather-result__current" :weather="weatherData" />
    <forecast-card class="weather-result__forecast" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { getWeatherIcon, formatTimestamp } from '@/utils';
import fetchWeatherData from '@/composables/fetchWeatherData.js';
import WeatherCard from '@/components/weatherCard.vue';
import ForecastCard from '@/components/forecastCard.vue';

export default {
  components: { WeatherCard, ForecastCard },
  setup() {
    const { getWeatherByCity } = fetchWeatherData();

    let location = ref('');
    let loaded = ref(false);
    let valid = ref(false);
    let weatherData = ref(null);
    const form = ref(null);

    const submit = async () => {
      try {
        const weatherApiData = await getWeatherByCity(location.value);

        weatherData.value = {
          location: location.value,
          icon: getWeatherIcon(weatherApiData.weather[0].icon),
          temperature: weatherApiData.main.temp.toFixed(1),
          description: weatherApiData.weather[0].description,
          sunrise: formatTimestamp(weatherApiData.sys.sunrise, weatherApiData.timezone),
          sunset: formatTimestamp(weatherApiData.sys.sunset, weatherApiData.timezone),
          wind: weatherApiData.wind.speed,
          humidity: weatherApiData.main.humidity,
          pressure: weatherApiData.main.pressure,
          precipitation: weatherApiData.rain ? weatherApiData.rain['1h'] || weatherApiData.rain['3h'] : '0'
        };

        loaded.value = true;
      } catch (err) {
        loaded.value = false;
        console.error(err);
      } finally {
        form.value.reset();
      }
    };

    const weatherInputRules = [(v) => !!v || 'Required', (v) => /^[A-Za-z]+$/.test(v) || 'Please enter only lettters'];

    return { form, location, submit, loaded, weatherData, valid, weatherInputRules };
  }
};
</script>

<style lang="scss">
.weather-search {
  margin: 0 auto;
  width: 700px;

  &__header {
    text-align: center;
    font-weight: 700;
  }

  &__form {
    &-text {
      padding: 0;
      text-align: center;
    }

    &-input {
      width: 50%;
      margin: 0 auto;

      input,
      .v-messages {
        text-align: center;
      }
    }

    &-button {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
  }
}

.weather-result {
  &__current {
    margin-top: 50px;
  }

  &__forecast {
    margin-top: 50px;
  }
}
</style>
