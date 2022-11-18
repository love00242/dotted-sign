<script setup>
import Animation from "@/components/Animation.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SelectSignPopup from "@/components/SelectSignPopup.vue";
import SignPopup from "@/components/SignPopup.vue";
import Popup from "@/components/Popup.vue";
import usePDF from "@/hook/usePDF.js";
import loading from "@/assets/json/loading.json";
import { inject, onMounted, ref } from "vue";

const { uploadPDF, totalPage, nowPage, goCurrentPage, isRender, addString } = usePDF();
const pdfFile = inject("pdfFile");
const isLoading = ref(false);
const canvasOutDom = ref(null);
const isShowSelectSignPopup = ref(false);
const isShowWordPopup = ref(false);
const isShowSignPopup = ref(false);

const render = async () => {
  isLoading.value = true;
  await uploadPDF(pdfFile.value);
  isLoading.value = false;
};
const changePage = (type) => {
  if (isLoading.value || isRender.value) return;
  canvasOutDom.value.scrollTop = 0;
  goCurrentPage(type);
};
const addCanvas = (val) => {
  switch (val) {
    case "sign":
      isShowSelectSignPopup.value = true;
      break;
    case "check":
      break;
    case "date":
      addString(new Date().toLocaleDateString());
      break;
    case "word":
      isShowWordPopup.value = true;
      break;
  }
};
const addText = (text) => {
  addString(text);
  isShowWordPopup.value = false;
};
const addNewSign = () => {
  isShowSignPopup.value = true;
};
const closePopup = (val) => {
  if(val === "sign") {
    isShowSignPopup.value = false;
    return;
  }
  isShowSelectSignPopup.value = false;
  isShowWordPopup.value = false;
};
onMounted(() => {
  pdfFile.value && render();
});
</script>

<template>
  <div class="bg-gray-300 h-screen p-5">
    <Header />
    <Animation v-show="isLoading" :animationName="loading" :width="130" :text="'上傳中...'" />
    <div class="canvasOut" ref="canvasOutDom">
      <canvas id="canvasBox"></canvas>
    </div>
    <Footer :totalPage="totalPage" :nowPage="nowPage" @changePage="changePage" :isRender="isRender"
      @addCanvas="addCanvas" />
    <SelectSignPopup v-if="isShowSelectSignPopup" @closePopup="closePopup" @addNewSign="addNewSign" />
    <SignPopup v-if="isShowSignPopup" @closePopup="closePopup" />
    <Popup v-if="isShowWordPopup" :isTwoBtn="true" :rightBtnText="'使用'" :isShowInput="true"
      @comfirm="addText" @closePopup="closePopup" />
  </div>
</template>

<style scoped>
.canvasOut {
  @apply flex justify-center h-[calc(100vh-210px)] overflow-y-scroll overflow-x-hidden;
}
</style>