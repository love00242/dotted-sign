<script setup>
import { ref } from 'vue';

const nowSelect = ref("");
const featureList = ref([
  { name: "sign", title: "簽名" },
  { name: "check", title: "勾選" },
  { name: "date", title: "日期" },
  { name: "word", title: "插入文字" },
]);

const changeSelect = (name) => {
  nowSelect.value = name;
};
</script>

<template>
  <ul class="flex items-center">
    <li 
      v-for="(item, i ) in featureList" :key="i" 
      class="flex flex-col items-center min-w-[65px]"
    >
      <SvgIcon :name="item.name"
        @click="changeSelect(item.name)"
        :class="['bg-gray-300 rounded-[9px] p-1.5', { 'active': nowSelect === item.name}]"
        :otherSize="'w-10 h-10'">
      </SvgIcon>
      <p class="text-gray-400 text-sm mt-0.5">{{ item.title }}</p>
    </li>
  </ul>
</template>

<style scoped>
.active {
  @apply bg-gradient-green;
}
.active+p {
  @apply text-green-400;
}
</style>