<script setup>
import Animation from "@/components/Animation.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SelectSignPopup from "@/components/SelectSignPopup.vue";
import SignPopup from "@/components/SignPopup.vue";
import Popup from "@/components/Popup.vue";
import usePDF from "@/hook/usePDF.js";
import loading from "@/assets/json/loading.json";
import router from "@/router";
import { inject, onMounted, ref } from "vue";

const { uploadPDF, totalPage, nowPage, goCurrentPage, isRender, addString, addSign, download, canvas } = usePDF();
const pdfFile = inject("pdfFile");
const isLoading = ref(false);
const canvasOutDom = ref(null);
const isShowSelectSignPopup = ref(false);
const isShowWordPopup = ref(false);
const isShowSignPopup = ref(false);
const isShowFinishPopup = ref(false);
const isShowTipPopup = ref(false);

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
const addCanvas = (type, val) => {
  switch (type) {
    case "sign":
      isShowSelectSignPopup.value = !isShowSelectSignPopup.value;
      val && addSign(val);
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
const downloadPDF = () => {
  console.log(canvas.value.getObjects().length);
  if (!canvas.value.getObjects().length) {
    isShowTipPopup.value = true;
    return;
  }
  download().then(() => isShowFinishPopup.value = true);
};
const closePopup = (val) => {
  if (val === "sign") {
    isShowSignPopup.value = false;
    return;
  }
  isShowSelectSignPopup.value = false;
  isShowWordPopup.value = false;
};
const goIdx = () => {
  isShowFinishPopup.value = false;
  router.push({ name: "index" });
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
      <!-- <canvas v-for="page in totalPage" :id="'the-canvas' + page" :key="page"></canvas> -->
    </div>
    <Footer :totalPage="totalPage" :nowPage="nowPage" @changePage="changePage" :isRender="isRender"
      @addCanvas="addCanvas" @download="downloadPDF" />
    <SelectSignPopup v-if="isShowSelectSignPopup" @closePopup="closePopup" @addNewSign="addNewSign"
      @addCanvas="addCanvas" />
    <SignPopup v-if="isShowSignPopup" @closePopup="closePopup" />
    <Popup v-if="isShowWordPopup" :isTwoBtn="true" :rightBtnText="'使用'" :isShowInput="true" @comfirm="addText"
      @closePopup="closePopup" />
    <Popup v-if="isShowFinishPopup" :isTwoBtn="false" :isShowInput="false" :isFinish="true" @closePopup="goIdx" />
    <Popup v-if="isShowTipPopup" :isTwoBtn="false" :isShowInput="false" :text="'請先置入簽名'"
      @closePopup="isShowTipPopup = false" />
  </div>
</template>

<style scoped>
.canvasOut {
  @apply flex justify-center h-[calc(100vh-210px)] overflow-y-scroll overflow-x-scroll;
}
</style>