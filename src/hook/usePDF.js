import { fabric } from "fabric";
import { computed } from "vue";

export default () => {
  const canvas = computed(()=> new fabric.Canvas(""));
  
  async function UploadPDF(e) {
    console.log("UploadPDF");
    if(e.target.files[0] === undefined) return;
  }
  return {
    UploadPDF,
    canvas,
  }
}