import ApiService from '@/services/api.service';

const fetchWeatherData = () => {
  const getWeatherByCity = async (city) => {
    return await ApiService.get(`weather?q=${city}&units=metric&appid=${process.env.VUE_APP_API_KEY}`);
  };

  const getForecastByCity = async (city) => {
    return await ApiService.get(`forecast?q=${city}&units=metric&appid=${process.env.VUE_APP_API_KEY}`);
  };

  return { getWeatherByCity, getForecastByCity };
};

export default fetchWeatherData;
