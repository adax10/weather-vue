<template>
  <div class="forecast-wrapper" elevation="0">
    <forecast-card v-if="parsedData" :forecast="parsedData" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import moment from 'moment';
import { maxBy, minBy, meanBy } from 'lodash';
import { getWeatherIcon, getDayOfTheMonth } from '@/utils';
import ForecastCard from './forecast-card.vue';

const forecastData = defineProps(['forecast']);
let parsedData = ref(null);

onMounted(() => {
  const filteredList = forecastData.forecast.filter((item) => {
    const dayOfTheMonth = getDayOfTheMonth(item.dt);
    const dayOfToday = moment(new Date()).format('DD');

    if (dayOfToday !== dayOfTheMonth) {
      return item;
    }
  });

  const parsedForecastData = filteredList.reduce((result, currentValue) => {
    const date = moment(currentValue.dt_txt).format('DD-MM-YYYY');

    const weatherInfo = {
      time: moment(currentValue.dt_txt).format('HH:mm'),
      icon: getWeatherIcon(currentValue.weather[0].icon),
      temperature: +currentValue.main.temp.toFixed(1),
      description: currentValue.weather[0].description,
      wind: +currentValue.wind.speed,
      humidity: +currentValue.main.humidity,
      pressure: +currentValue.main.pressure,
      precipitation: currentValue.rain ? +currentValue.rain['1h'] || +currentValue.rain['3h'] : 0
    };

    if (result.find((item) => item.date === date)) {
      result.find((item) => item.date === date).forecast.push(weatherInfo);
    } else {
      result.push({
        date,
        forecast: [weatherInfo]
      });
    }

    return result;
  }, []);

  parsedData.value = parsedForecastData.map((item) => {
    const maxTemperatureItem = maxBy(item.forecast, 'temperature');
    const minTemperatureItem = minBy(item.forecast, 'temperature');

    return {
      date: item.date,
      minTemperature: minTemperatureItem.temperature,
      maxTemperature: maxTemperatureItem.temperature,
      icon: maxTemperatureItem.icon,
      wind: meanBy(item.forecast, 'wind').toFixed(2),
      maxWind: maxBy(item.forecast, 'wind').wind,
      humidity: meanBy(item.forecast, 'humidity').toFixed(0),
      pressure: meanBy(item.forecast, 'pressure').toFixed(0),
      precipitation: meanBy(item.forecast, 'precipitation').toFixed(0)
    };
  });
});
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';
@import 'src/styles/mixins/breakpoints.mixins';

.forecast-wrapper {
  @include respond-to('medium') {
    display: flex;
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>
