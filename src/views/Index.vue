<script setup>
</script>

<template>
  <div class="relative p-5 h-screen">
    <header class="flex justify-between items-center pr-32 mb-4">
      <img src="images/logo.png">
      <button class="btn btn-green-line">歷史紀錄</button>
      <img src="images/idx-grass.png" class="absolute right-0">
    </header>
    <div class="bg-gray-300/60 rounded-[34px] w-[85%] h-[80vh] m-auto flex">
      <div class="w-1/2">
        <p
          class="bg-gradient-green text-white text-2xl rounded-tl-[34px] text-center rounded-br-[34px] w-64 leading-[62px]">
          免費試用版</p>
        <div class="mt-[120px] ml-16">
          <h2 class="text-gradient-green text-5xl font-bold">小綠簽</h2>
          <p class="text-lg mt-4">護樹、永續、減碳的綠色生活<br>響應環保無紙化電子簽署，<br>省時便利又環保</p>
        </div>
      </div>
      <div class="w-1/2 pt-12 px-[6%] relative">
        <div class="border-2 border-dashed bg-white border-gray-400 rounded-[26px] flex flex-col items-center h-[75%] py-[15%] min-w-min">
          <img src="images/idx-pdf.png" class="mb-6">
          <button class="btn btn-green px-16 py-4 z-[1]">選擇檔案</button>
          <p class="text-gradient-green text-sm mt-4">(限10MB 內的PDF或JPG檔)</p>
        </div>
        <img src="images/idx-people.png" class="absolute right-6 bottom-0 w-full">
      </div>
    </div>
    <img src="images/idx-grass2.png" class="absolute left-0 bottom-0 max-h-80">
    <small class="absolute right-4 bottom-4">小綠簽 © Code: 🍋 / Design: KT</small>
  </div>
</template>

<style scoped>
</style>