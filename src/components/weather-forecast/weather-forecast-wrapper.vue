<template>
  <div>
    <div class="forecast-wrapper">
      <forecast-card
        v-for="forecast of parsedWeatherForecastData"
        :key="forecast.date"
        :forecast="forecast"
        @toggle-details="showDetails"
      />
    </div>
    <forecast-details v-if="openedDetails" class="forecast-details" :forecast="chartForecastData" />
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import moment from 'moment';
import { maxBy, minBy, meanBy } from 'lodash';
import { getWeatherIcon, getDayOfTheMonth } from '@/utils';
import ForecastCard from '@/components/weather-forecast/weather-forecast-card.vue';
import forecastDetails from '@/components/weather-forecast/weather-forecast-details.vue';

const router = useRouter();
const route = useRoute();
const forecastData = defineProps(['forecast']);

let allWeatherForecastData = ref(null);
let parsedWeatherForecastData = ref(null);
let chartForecastData = ref(null);
let openedDetails = ref(false);

const showDetails = async (id) => {
  router.replace({
    name: route.name,
    params: { id }
  });

  if (id) {
    openedDetails.value = true;
    chartForecastData.value = findDayForecast(id);
    await nextTick();
    document.querySelector('.forecast-details').scrollIntoView({ behavior: 'smooth' });
  } else {
    openedDetails.value = false;
  }
};

const findDayForecast = (id) => allWeatherForecastData.value.find((item) => item.date === id);

onMounted(() => {
  const filteredList = forecastData.forecast.filter((item) => {
    const dayOfTheMonth = getDayOfTheMonth(item.dt);
    const dayOfToday = moment(new Date()).format('DD');

    if (dayOfToday !== dayOfTheMonth) {
      return item;
    }
  });

  allWeatherForecastData.value = filteredList.reduce((result, currentValue) => {
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

  parsedWeatherForecastData.value = allWeatherForecastData.value.map((item) => {
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

.forecast-details {
  display: none;

  @include respond-to('small') {
    display: block;
  }
}
</style>
