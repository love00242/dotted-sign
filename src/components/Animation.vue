<script setup>
const props = defineProps({
  animationName: String,
  text: String,
  width: Number,
});
console.log(props);

//example
{/* <Animation :animationName="loading" :width="130" :text="'簽名優化'" /> */}
</script>

<template>
  <div class="flex flex-col items-center">
    <Vue3Lottie :animationData="animationName" :width="width" />
    <p class="text-xl">{{ text }}</p>
  </div>
</template>

<style scoped>
</style>