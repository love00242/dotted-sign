<script setup>
import Animation from "@/components/Animation.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import usePDF from "@/hook/usePDF.js";
import loading from "@/assets/json/loading.json";
import { inject, onMounted, ref } from "vue";

const { uploadPDF } = usePDF();
const pdfFile = inject("pdfFile");
const isLoading = ref(false);
const render = async () => {
  isLoading.value = true;
  await uploadPDF(pdfFile.value);
  isLoading.value = false;
}
onMounted(() => {
  pdfFile.value && render();
});
</script>

<template>
  <div class="bg-gray-300 h-screen p-5 overflow-y-scroll">
    <Header />
    <Animation v-show="isLoading" :animationName="loading" :width="130" :text="'上傳中...'" />
    <!-- <div class="w-[793px] bg-gray-600 m-auto h-screen">pdf</div> -->
    <canvas id="canvasBox"> </canvas>
    <Footer />
  </div>
</template>

<style scoped>

</style>