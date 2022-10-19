<template>
  <v-card class="weather-search" rounded outlined elevation="1">
    <v-card-title class="weather-search__header">Search weather</v-card-title>

    <v-form ref="form" class="weather-search__form" v-model="valid">
      <v-card-text class="weather-search__form-text">Please enter city name to search for the weather</v-card-text>
      <v-text-field
        class="weather-search__form-input"
        v-model="location"
        :rules="[(v) => !!v || 'Required', (v) => /^[a-zA-Z-\s]*$/.test(v) || 'Please enter only lettters']"
        variant="underlined"
      ></v-text-field>
      <div class="weather-search__form-button">
        <v-btn :disabled="!valid" color="primary" @click="searchWeather">Search</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

let location = ref('');
let form = ref(null);
let valid = ref(false);

const emit = defineEmits(['searchWeather']);

const searchWeather = () => {
  emit('searchWeather', location, form);
};
</script>

<style lang="scss">
@import 'src/styles/mixins/breakpoints.mixins';

.weather-search {
  margin: 0 auto;
  width: 90%;

  @include respond-to('medium') {
    width: 700px;
  }

  &__header {
    text-align: center;
    font-weight: 700;
  }

  &__form {
    &-text {
      padding: 0;
      text-align: center;
    }

    &-input {
      width: 100%;
      margin: 0 auto;

      @include respond-to('medium') {
        width: 50%;
      }

      input,
      .v-messages {
        text-align: center;
      }
    }

    &-button {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
  }
}
</style>
