<script setup>
import { computed, onMounted } from "vue";

const emit = defineEmits(["closePopup", "addNewSign"]);
const signList = computed(() => {
  const list = localStorage.getItem("sign");
  return JSON.parse(list) || [];
});


const deleteSign = (idx) => {
  console.log("deleteSign");
  const list = JSON.parse(localStorage.getItem("sign"));
  list.splice(idx, 1);
  localStorage.setItem("sign", JSON.stringify(list));
};
const closePopup = () => {
  emit("closePopup");
};
const addNewSign = () => {
  emit("addNewSign");
};
onMounted(() => {
});
</script>

<template>
  <div class="fixed w-full h-screen z-50 flex justify-center items-center inset-0 bg-gray-500/[47%]"
    @click.self="closePopup">
    <div class="w-[343px] rounded-[26px] bg-gray-300 shadow-normal flex flex-col">
      <h2 class="text-green-400 text-lg text-center mt-4 mb-3">請選擇簽名</h2>
      <ul class="flex flex-col items-center">
        <li v-for="i in 3" :key="i" class="flex items-center mb-4">
          <div class="bg-white h-[60px] rounded-2xl w-[270px] mr-2 flex items-center justify-center">
            <img v-if="i <= signList.length" :src="signList[i - 1]" class="h-full">
            <p v-else class="text-sm text-gray-400">尚無簽名</p>
          </div>
          <SvgIcon name="delete" @click="deleteSign(i - 1)" :otherSize="'w-6 h-6'"></SvgIcon>
        </li>
      </ul>
      <button class="text-green-400 w-24 pb-[5px] mx-2.5 mb-2.5" @click="addNewSign">+ 新增簽名</button>
    </div>
  </div>
</template>