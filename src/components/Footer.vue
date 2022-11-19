<script setup>
import FooterList from "@/components/FooterList.vue";

const props = defineProps({
  totalPage: Number,
  nowPage: Number,
});
const emit = defineEmits(["changePage", "addCanvas", "download"]);
console.log(props);
const addCanvas = (val) => {
  emit("addCanvas", val);
}
</script>

<template>
  <footer>
    <div class="flex w-[60%] mx-auto">
      <div class="flex w-[60%]">
        <div class="box mr-4">
          <SvgIcon name="vector" class="page" @click="emit('changePage', 'previous')"></SvgIcon>
          <p>{{ `${nowPage} / ${totalPage}` }}</p>
          <SvgIcon name="vector" class="page rotate-180" @click="emit('changePage', 'nextPage')"></SvgIcon>
        </div>
        <div class="box">
          <SvgIcon name="zoomIn"></SvgIcon>
          <p>{{ "100%" }}</p>
          <SvgIcon name="zoomOut"></SvgIcon>
        </div>
      </div>
      <FooterList class="w-[40%]" @addCanvas="addCanvas" />
    </div>
    <button class="btn btn-green px-14 py-3 absolute right-5" @click="emit('download')">完成簽署</button>
  </footer>
</template>

<style scoped>
footer {
  @apply fixed z-30 bottom-0 right-0 w-full flex shadow-normal h-24 py-5 rounded-md justify-center bg-white cursor-pointer;
}

.box {
  @apply flex justify-around items-center rounded-2xl shadow-normal py-3 w-48;
}

.page {
  @apply rounded-xl bg-green-400 p-2.5;
}
</style>