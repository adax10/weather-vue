import moment from 'moment';

const weatherIcons = {
  '01d': 'day',
  '01n': 'night',
  '02d': 'partly-cloudy-day',
  '02n': 'partly-cloudy-night',
  '03d': 'cloudy-day',
  '03n': 'cloudy-night',
  '04d': 'broken-clouds',
  '04n': 'broken-clouds',
  '09d': 'shower-rain',
  '09n': 'shower-rain',
  '10d': 'rainy',
  '10n': 'rainy',
  '11d': 'thunderstorm',
  '11n': 'thunderstorm',
  '13d': 'snowy',
  '13n': 'snowy',
  '50d': 'broken-clouds',
  '50n': 'broken-clouds'
};

const getWeatherIcon = (iconId) => weatherIcons[iconId];

const formatTimestamp = (timestamp, timezone) => moment.utc(timestamp, 'X').add(timezone, 'seconds').format('HH:mm');

const getDayOfTheMonth = (timestamp) => moment(new Date(timestamp * 1000)).format('DD');

export { getWeatherIcon, formatTimestamp, getDayOfTheMonth };
