<script setup>
import { ref, provide } from "vue";
const pdfFile = ref(null);

provide("pdfFile", pdfFile);
const setPdfFile = (file) => {
  pdfFile.value = file;
}
provide("setPdfFile", setPdfFile);
</script>
<template>
  <RouterView />
</template>

<style>

</style>
