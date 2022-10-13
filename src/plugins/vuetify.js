import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

const lightTheme = {
  dark: false,
  colors: {
    background: '#eee',
    primary: '#2196F3',
    secondary: '#03A9F4',
    accent: '#CBCDDA',
    error: '#F46060',
    warning: '#eebb4d',
    info: '#B5DEFF',
    success: '#47bc6c'
  }
};

const darkTheme = {
  dark: true,
  colors: {
    background: '#1f1f1f',
    primary: '#2196F3',
    secondary: '#03A9F4',
    accent: '#CBCDDA',
    error: '#F46060',
    warning: '#eebb4d',
    info: '#B5DEFF',
    success: '#47bc6c'
  }
};

export default createVuetify({
  theme: {
    themes: {
      lightTheme,
      darkTheme
    }
  }
});
