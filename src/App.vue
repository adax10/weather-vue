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
import { ref } from 'vue';
import { useTheme } from 'vuetify';

export default {
  setup() {
    const theme = useTheme();
    let darkMode = ref(false);

    const toggleTheme = () => (theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme');

    return { toggleTheme, darkMode };
  }
};
</script>
