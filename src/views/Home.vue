<template>
  <search-weather-card @search-weather="searchWeather" />

  <div v-if="loadingData" class="weather-loader">
    <v-progress-circular :width="10" :size="100" :model-value="loadingValue" color="primary" />
  </div>

  <div v-if="loadedData" class="weather-result">
    <weather-card class="weather-result__current" :weather="weatherCurrentData" />
    <div class="weather-result__forecast">
      <p class="weather-result__forecast-header">Weather forecast for the next 5 days:</p>
      <forecast-wrapper class="weather-result__forecast-content" :forecast="weatherForecastData" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Country } from 'country-state-city';

import { getWeatherIcon, formatTimestamp } from '@/utils';
import fetchWeatherData from '@/composables/fetch-weather-data.js';
import SearchWeatherCard from '@/components/search-weather/search-weather.vue';
import WeatherCard from '@/components/weather/weather-card.vue';
import ForecastWrapper from '@/components/weather-forecast/weather-forecast-wrapper.vue';

export default {
  components: { WeatherCard, ForecastWrapper, SearchWeatherCard },
  setup() {
    const { findGeoCoordinates, getCurrentWeatherData, getForecastData } = fetchWeatherData();

    let loadedData = ref(false);
    let loadingData = ref(false);
    let loadingValue = ref(0);
    let weatherCurrentData = ref(null);
    let weatherForecastData = ref(null);

    const parsedWeatherData = (data, location) => {
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

    const searchWeather = async (location, form) => {
      loadedData.value = false;
      loadingData.value = true;
      loadingValue.value = 0;

      try {
        const progressStep = 25;

        const { country, lat, lon } = await findGeoCoordinates(location.value);
        loadingValue.value += progressStep;

        const weatherApiData = await getCurrentWeatherData(lat, lon);
        weatherCurrentData.value = {
          country: Country.getCountryByCode(country).name,
          ...parsedWeatherData(weatherApiData, location)
        };
        loadingValue.value += 2 * progressStep;

        const forecastApiData = await getForecastData(lat, lon);
        weatherForecastData.value = forecastApiData.list;
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
      loadedData,
      loadingData,
      loadingValue,
      weatherCurrentData,
      weatherForecastData,
      searchWeather
    };
  }
};
</script>

<style lang="scss" scoped>
@import 'src/styles/mixins/breakpoints.mixins';

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
    margin-bottom: 20px;

    &-header {
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      margin: 0 50px 5px;

      @include respond-to('medium') {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
