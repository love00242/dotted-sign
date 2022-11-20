<script setup>
const props = defineProps({
  animationName: Object,
  text: String,
  width: Number,
  isLoop: {
    type: Boolean,
    default: true,
  },
});
console.log(props);

</script>

<template>
  <div class="flex flex-col items-center">
    <Vue3Lottie :animationData="animationName" :width="width" :loop="isLoop" />
    <p class="text-xl">{{ text }}</p>
  </div>
</template>

<style scoped>
</style>