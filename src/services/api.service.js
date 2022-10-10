import axios from 'axios';
import { useToast } from 'vue-toastification';

const ApiService = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}`
});

ApiService.interceptors.response.use(
  (config) => config && config.data,
  (error) => {
    const toast = useToast();
    toast.error(`${error.message}`, {
      position: 'bottom-right'
    });
    return Promise.reject(error);
  }
);

export default ApiService;
