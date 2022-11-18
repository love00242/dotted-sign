<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
const emit = defineEmits(["closePopup", "backToSelectSign"]);

const nowTab = ref(1);
const nowColor = ref("black");
const canvas = ref(null);
const drawFlag = ref(false);
const context = computed(() => canvas.value?.getContext("2d"));
const demoImgUrl = ref("");
const uploadTip = ref(null);
const tabList = ref([
  { name: "手寫簽名", id: 1 },
  { name: "匯入簽名檔", id: 2 },
])
const colorList = ref([
  { name: "black", color: "bg-black" },
  { name: "blue", color: "bg-blue" },
  { name: "red", color: "bg-red" }
]);

const changeTab = async (id) => {
  reset();
  nowTab.value = id;
  await nextTick();
  nowTab.value === 1 && setDrawLine();
};
const changeColor = (val) => {
  nowColor.value = val;
  context.value.shadowColor = nowColor.value;
  context.value.strokeStyle = nowColor.value;
};
const getPaintPosition = (e) => {
  const canvasSize = canvas.value.getBoundingClientRect();
  if (e.type === "mousemove") {
    return {
      x: e.clientX - canvasSize.left,
      y: e.clientY - canvasSize.top,
    }
  } else {
    return {
      x: e.touches[0].clientX - canvasSize.left,
      y: e.touches[0].clientY - canvasSize.top,
    }
  }
}
const setDrawLine = () => {
  context.value.lineWidth = 2;
  context.value.lineCap = "round"; // 繪制圓形的結束線帽
  context.value.lineJoin = "round"; // 兩條線條交匯時，建立圓形邊角
  context.value.shadowBlur = 1; // 邊緣模糊，防止直線邊緣出現鋸齒
  context.value.shadowColor = nowColor.value; // 邊緣顏色
  context.value.strokeStyle = nowColor.value;
};
const startDraw = (e) => {
  e.preventDefault();
  drawFlag.value = true;
}
const drawing = (e) => {
  if (!drawFlag.value) return;
  const { x, y } = getPaintPosition(e);
  context.value.lineTo(x, y); //設定移動到的位置
  context.value.stroke(); //畫出圖形邊框
}
const finishedDraw = () => {
  drawFlag.value = false;
  context.value.beginPath();
}
const reset = () => {
  context.value?.clearRect(0, 0, canvas.value.width, canvas.value.height);
  demoImgUrl.value = "";
}
const saveSign = () => {
  console.log("SAVE");
  //圖片儲存的類型選擇png
  const data = nowTab.value === 1 ? canvas.value.toDataURL("image/png") : demoImgUrl.value;
  const signList = JSON.parse(localStorage.getItem("sign")) || [];
  signList.push(data);
  localStorage.setItem("sign", JSON.stringify(signList));
  emit("backToSelectSign");
  closePopup();
}
const uploadImg = (e) => {
  const file = e.target.files[0];
  if (file === undefined) return;
  uploadTip.value.style.display = "none";
  demoImgUrl.value = URL.createObjectURL(file);
};
const closePopup = () => {
  emit("closePopup", "sign");
};
onMounted(() => {
  setDrawLine();
})
</script>

<template>
  <div class="fixed w-full h-screen z-50 flex justify-center items-center inset-0 bg-gray-500/[47%]"
    @click.self="closePopup">
    <div class="rounded-[26px] bg-gray-300 shadow-normal flex flex-col items-center px-3">
      <ul class="flex bg-white rounded-[14px] mt-6 justify-center w-60">
        <li v-for="val in tabList" :key="val.id"
          :class="['text-green-400 px-6 py-2 rounded-[14px]', { 'tab-active': nowTab === val.id }]"
          @click="changeTab(val.id)">
          {{ val.name }}
        </li>
      </ul>
      <div v-if="nowTab === 1">
        <div class="flex justify-between my-5">
          <ul class="flex justify-center">
            <li v-for="(val, k) in colorList" :key="k" @click="changeColor(val.name)"
              :class="['w-8 h-8 mx-2.5 rounded-full', { 'color-active': nowColor === val.name }, val.color]">
            </li>
          </ul>
          <button class="text-green-400 text-lg" @click="reset">清除</button>
        </div>
        <canvas ref="canvas" width="600" height="208" class="m-auto rounded-[26px] bg-white max-w-[600px]"
          @mousedown="startDraw" @mousemove="drawing" @mouseup="finishedDraw">
        </canvas>
      </div>
      <label v-else
        class="relative rounded-[26px] bg-white w-[600px] h-52 mt-5 flex items-center justify-center text-gray-400 text-xl">
        <p ref="uploadTip" class="absolute">請選擇檔案</p>
        <input type="file" class="hidden" @change="uploadImg" accept="image/*" />
        <img :src="demoImgUrl" class="object-contain max-h-full">
      </label>
      <div class="mt-6 mb-10 flex w-1/2">
        <button class="btn btn-green-line w-1/2 h-14 mr-2.5 min-w-max" @click="closePopup">取消</button>
        <button class="btn btn-green w-1/2 h-14 ml-2.5 min-w-max" @click="saveSign">建立簽名</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
li.tab-active {
  @apply text-white bg-gradient-green;
}

li.color-active {
  @apply shadow-[0px_0px_0px_3px_#f0f0f0,0px_0px_0px_5px_v-bind(nowColor)];
}
</style>