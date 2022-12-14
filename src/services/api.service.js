import axios from 'axios';
import { useToast } from 'vue-toastification';

const createAxiosInstance = (baseURL) => {
  const newInstance = axios.create({ baseURL });

  newInstance.interceptors.response.use(
    (config) => config && config.data,
    (error) => {
      const toast = useToast();
      toast.error(`${error.message}`, { position: 'bottom-right' });
      return Promise.reject(error);
    }
  );

  return newInstance;
};

const weatherApiService = createAxiosInstance(`${process.env.VUE_APP_WEATHER_API}`);
const geoApiService = createAxiosInstance(`${process.env.VUE_APP_GEO_API}`);

export { weatherApiService, geoApiService };
