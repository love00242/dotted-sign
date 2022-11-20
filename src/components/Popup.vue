<script setup>
import { ref } from "vue";
import ok from "@/assets/json/ok.json";
import Animation from "@/components/Animation.vue";

const props = defineProps({
  isTwoBtn: Boolean,
  rightBtnText: String,
  isShowInput: Boolean,
  text: String,
  isFinish: Boolean,
});
console.log(props);
const emit = defineEmits(["closePopup", "comfirm"]);
const remark = ref("");

const comfirm = () => {
  emit("comfirm", remark.value);
}
const closePopup = () => {
  emit("closePopup");
}
</script>

<template>
  <div class="fixed w-full h-screen z-50 flex justify-center items-center inset-0 bg-gray-500/[47%]"
    @click.self="closePopup">
    <div class="w-80 min-h-[150px] rounded-[26px] bg-gray-300 shadow-normal flex flex-col justify-evenly items-center">
      <Animation v-if="isFinish" :animationName="ok" :width="130" :text="'下載成功'" :isLoop="false" />
      <template v-else>
        <p v-if="!isShowInput" class="text-center">{{ text }}</p>
        <textarea v-else placeholder="輸入文字" class="h-[84px] bg-white w-[85%] rounded-2xl my-5 p-2"
          v-model.trim="remark"></textarea>
      </template>
      <div v-if="isTwoBtn" class="mx-auto mb-4">
        <button class="btn btn-green-line w-[136px] h-14 mx-2.5" @click="closePopup">取消</button>
        <button class="btn btn-green w-[136px] h-14" @click="comfirm">{{ rightBtnText }}</button>
      </div>
      <button v-else class="btn btn-green mx-auto h-14 w-56 mb-2.5" @click="closePopup">確定</button>
    </div>
  </div>
</template>

<style scoped>

</style>