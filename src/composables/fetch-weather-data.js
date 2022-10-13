import { useToast } from 'vue-toastification';
import { ApiWeatherService, GeoApiService } from '@/services/api.service';

const fetchWeatherData = () => {
  const findGeoCoordinates = async (city) => {
    const geoCoordinates = await GeoApiService.get(`direct?q=${city}&limit=1&appid=${process.env.VUE_APP_API_KEY}`);

    if (geoCoordinates.length > 0) {
      return geoCoordinates[0];
    } else {
      const toast = useToast();
      toast.error('Invalid city name', { position: 'bottom-right' });
      throw new Error('Invalid city name');
    }
  };

  const getCurrentWeatherData = async (lat, lon) => {
    return await ApiWeatherService.get(`weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.VUE_APP_API_KEY}`);
  };

  const getForecastData = async (lat, lon) => {
    return await ApiWeatherService.get(
      `forecast?lat=${lat}&lon=${lon}&units=metric&cnt=500&appid=${process.env.VUE_APP_API_KEY}`
    );
  };

  return { findGeoCoordinates, getCurrentWeatherData, getForecastData };
};

export default fetchWeatherData;
