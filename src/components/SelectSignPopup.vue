<script setup>
import { onMounted } from "vue";
import { usePdfStore } from "@/store/pdf.js";
import { storeToRefs } from "pinia";

const emit = defineEmits(["closePopup", "addNewSign", "addCanvas"]);
const { signList } = storeToRefs(usePdfStore());
const PdfStore = usePdfStore();

const selectSign = (idx) => {
  console.log("changeSelect", idx, signList.value.length);
  const target = signList.value[idx];
  target && emit("addCanvas", "sign", target);
};
const deleteSign = (idx) => {
  console.log("deleteSign");
  const target = signList.value[idx];
  if (!target) return;
  const list = [...signList.value];
  list.splice(idx, 1);
  PdfStore.setSignList(list);
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
        <li v-for="i in 3" :key="i" class="flex items-center mb-4" @click="selectSign(i - 1)">
          <div class="selectArea">
            <img v-if="i <= signList.length" :src="signList[i - 1]" class="h-full">
            <p v-else class="text-sm text-gray-400">尚無簽名</p>
          </div>
          <SvgIcon name="delete" @click.stop="deleteSign(i - 1)" :otherSize="'w-7 h-7'"></SvgIcon>
        </li>
      </ul>
      <button v-if="signList.length < 3" class="text-green-400 w-24 pb-[5px] mx-2.5 mb-2.5" @click="addNewSign">+
        新增簽名</button>
    </div>
  </div>
</template>
<style scoped>
.selectArea {
  @apply border border-white bg-white h-[60px] rounded-2xl w-[270px] mr-2 flex items-center justify-center;
}
</style>