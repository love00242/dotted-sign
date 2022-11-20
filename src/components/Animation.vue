<script setup>
const props = defineProps({
  animationName: Object,
  text: String,
  width: Number,
  isLoop: Boolean,
});
console.log(props);

//example
{/* <Animation :animationName="loading" :width="130" :text="'簽名優化'" /> */}
</script>

<template>
  <div class="flex flex-col items-center">
    <Vue3Lottie :animationData="animationName" :width="width" :loop="isLoop" />
    <p class="text-xl">{{ text }}</p>
  </div>
</template>

<style scoped>
</style>