<script setup>
import router from "@/router";
const props = defineProps({
  isShowPic: Boolean,
});
console.log(props);
const goPage = (val) => {
  router.push({ name: val });
} 
</script>

<template>
  <header class="flex justify-between items-center pr-32 mb-4">
    <img src="images/logo.png" @click="goPage('index')">
    <template v-if="isShowPic">
      <button class="btn btn-green-line border-2" @click="goPage('history')">歷史紀錄</button>
      <img src="images/idx-grass.png" class="absolute right-0">
    </template>
  </header>
</template>

<style scoped>
</style>