import ApiService from '@/services/api.service';

const fetchWeatherData = () => {
  const getWeatherByCity = async (city) => {
    try {
      return await ApiService.get(`weather?q=${city}&units=metric&appid=${process.env.VUE_APP_API_KEY}`);
    } catch (err) {
      console.error(err);
    }
  };

  const getForeacastByCity = async (city) => {
    try {
      return await ApiService.get(`forecast?q=${city}&units=metric&appid=${process.env.VUE_APP_API_KEY}`);
    } catch (err) {
      console.error(err);
    }
  };

  return { getWeatherByCity, getForeacastByCity };
};

export default fetchWeatherData;
