<template>
  <v-app>
    <v-main>
      <v-switch
        class="d-flex justify-end mr-2"
        v-model="darkMode"
        append-icon="mdi-weather-night"
        prepend-icon="mdi-white-balance-sunny"
        @click="toggleTheme"
      ></v-switch>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useTheme } from 'vuetify';

export default {
  setup() {
    const theme = useTheme();
    let darkMode = ref(null);

    const setTheme = (mode) => {
      theme.global.name.value = mode;
    };

    onMounted(() => {
      const mode = localStorage.getItem('mode');

      if (mode) {
        if (mode === 'light') {
          darkMode.value = false;
          setTheme('lightTheme');
        } else {
          darkMode.value = true;
          setTheme('darkTheme');
        }
      } else {
        darkMode.value = false;
        localStorage.setItem('mode', 'light');
      }
    });

    const toggleTheme = () => {
      if ((theme.global.name.value = theme.global.current.value.dark)) {
        setTheme('lightTheme');
        localStorage.setItem('mode', 'light');
      } else {
        setTheme('darkTheme');
        localStorage.setItem('mode', 'dark');
      }
    };

    return { toggleTheme, darkMode };
  }
};
</script>
