<template>
  <v-card class="weather-search" rounded outlined elevation="0">
    <v-card-title class="weather-search__header">Search weather</v-card-title>

    <v-form ref="form" class="weather-search__form" v-model="valid">
      <v-card-text class="weather-search__form-text">Please enter city name to search for the weather</v-card-text>
      <v-text-field
        class="weather-search__form-input"
        v-model="location"
        :rules="[(v) => !!v || 'Required', (v) => /^[a-zA-Z\s]*$/.test(v) || 'Please enter only lettters']"
        variant="underlined"
      ></v-text-field>
      <div class="weather-search__form-button">
        <v-btn :disabled="!valid" color="primary" @click="searchWeather">Search</v-btn>
      </div>
    </v-form>
  </v-card>

  <div v-if="loadingData" class="weather-loader">
    <v-progress-circular :width="10" :size="100" :model-value="loadingValue" color="primary" />
  </div>

  <div v-if="loadedData" class="weather-result">
    <weather-card class="weather-result__current" :weather="weatherData" />
    <forecast-wrapper class="weather-result__forecast" :forecast="forecastData" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { getWeatherIcon, formatTimestamp } from '@/utils';
import fetchWeatherData from '@/composables/fetch-weather-data.js';
import WeatherCard from '@/components/weather/weather-card.vue';
import ForecastWrapper from '@/components/forecast/forecast-wrapper.vue';

export default {
  components: { WeatherCard, ForecastWrapper },
  setup() {
    const { findGeoCoordinates, getCurrentWeatherData, getForecastData } = fetchWeatherData();

    let location = ref('');
    let loadedData = ref(false);
    let loadingData = ref(false);
    let loadingValue = ref(0);
    let weatherData = ref(null);
    let forecastData = ref(null);

    let form = ref(null);
    let valid = ref(false);

    const parsedWeatherData = (data) => {
      return {
        location: location.value,
        icon: getWeatherIcon(data.weather[0].icon),
        temperature: data.main.temp.toFixed(1),
        description: data.weather[0].description,
        sunrise: formatTimestamp(data.sys.sunrise, data.timezone),
        sunset: formatTimestamp(data.sys.sunset, data.timezone),
        wind: data.wind.speed,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        precipitation: data.rain ? data.rain['1h'] || data.rain['3h'] : 0
      };
    };

    const searchWeather = async () => {
      loadedData.value = false;
      loadingData.value = true;
      loadingValue.value = 0;

      try {
        const progressStep = 25;

        const { country, lat, lon } = await findGeoCoordinates(location.value);
        loadingValue.value += progressStep;

        const weatherApiData = await getCurrentWeatherData(lat, lon);
        weatherData.value = { country, ...parsedWeatherData(weatherApiData) };
        loadingValue.value += 2 * progressStep;

        const forecastApiData = await getForecastData(lat, lon);
        forecastData.value = forecastApiData.list;
        loadingValue.value = 100;

        loadingData.value = false;
        loadedData.value = true;
        form.value.reset();
      } catch (err) {
        loadedData.value = false;
        loadingData.value = false;
        console.error(err);
      }
    };

    return {
      location,
      loadedData,
      loadingData,
      loadingValue,
      weatherData,
      forecastData,
      form,
      valid,
      searchWeather
    };
  }
};
</script>

<style lang="scss">
@import 'src/styles/mixins/breakpoints.mixins';

.weather-search {
  margin: 0 auto;
  width: 90%;

  @include respond-to('medium') {
    width: 700px;
  }

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
      width: 100%;
      margin: 0 auto;

      @include respond-to('medium') {
        width: 50%;
      }

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

.weather-loader {
  margin-top: 30px;
  display: flex;
  justify-content: center;

  @include respond-to('medium') {
    margin-top: 50px;
  }
}

.weather-result {
  &__current {
    margin-top: 30px;

    @include respond-to('medium') {
      margin-top: 50px;
    }
  }

  &__forecast {
    margin-top: 30px;
  }
}
</style>
