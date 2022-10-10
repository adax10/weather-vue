<template>
  {{ weatherProps }}
  <img :src="require(`@/assets/${weatherProps.weather.icon}.svg`)" />
</template>

<script setup>
const weatherProps = defineProps(['weather']);

// const rawObject = {...weather};
// console.log(rawObject);
</script>
