<template>
  <v-form v-model="valid">
    <p>Weather search for:</p>
    <v-text-field v-model="weatherInput" :rules="weatherInputRules"></v-text-field>
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">Search</v-btn>
  </v-form>

  <div v-if="loaded">
    <current-weather-card :weather="weatherData" />
  </div>
</template>

<script>
import { ref } from 'vue';
import fetchWeatherData from '@/composables/fetchWeatherData.js';
import CurrentWeatherCard from '@/components/currentWeatherCard.vue';
import { getWeatherIcon, formatTimestamp } from '@/utils';

export default {
  components: { CurrentWeatherCard },
  setup() {
    const { getWeatherByCity } = fetchWeatherData();

    let weatherInput = ref('');
    let loaded = ref(false);
    let valid = ref(false);
    let weatherData = ref(null);

    const submit = async () => {
      try {
        const weatherApiData = await getWeatherByCity(weatherInput.value);

        weatherData.value = {
          icon: getWeatherIcon(weatherApiData.weather[0].icon),
          temperature: weatherApiData.main.temp,
          description: weatherApiData.weather[0].description,
          sunrise: formatTimestamp(weatherApiData.sys.sunrise, weatherApiData.timezone),
          sunset: formatTimestamp(weatherApiData.sys.sunset, weatherApiData.timezone),
          wind: weatherApiData.wind.speed,
          humidity: weatherApiData.main.humidity,
          pressure: weatherApiData.main.pressure,
          precipitation: weatherApiData.rain ? weatherApiData.rain['1h'] || weatherApiData.rain['3h'] : '0'
        };

        loaded.value = true;
        weatherInput.value = '';
      } catch (err) {
        loaded.value = false;
        console.error(err);
      }
    };

    const weatherInputRules = [(v) => !!v || 'Required'];

    return { weatherInput, submit, loaded, weatherData, valid, weatherInputRules };
  }
};
</script>

<style></style>
