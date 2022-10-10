import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

const lightTheme = {
  dark: false,
  colors: {
    background: '#F5F7FB',
    primary: '#7001af',
    secondary: '#9302db',
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
    primary: '#9c01ea',
    secondary: '#9302db',
    accent: '#CBCDDA',
    error: '#F46060',
    warning: '#eebb4d',
    info: '#B5DEFF',
    success: '#47bc6c'
  }
};

export default createVuetify({
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      lightTheme,
      darkTheme
    }
  }
});
