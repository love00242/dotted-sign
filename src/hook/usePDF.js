import { fabric } from "fabric";
import { computed } from "vue";
import * as PDFJS from "pdfjs-dist";
PDFJS.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`;

export default () => {
  const canvas = computed(() => new fabric.Canvas("canvasBox"));

  async function uploadPDF(file) {
    console.log("UploadPDF", file, canvas.value);
    if (!file) return;
    canvas.value.requestRenderAll();
    const pdfData = await printPDF(file);
    const pdfImage = await pdfToImage(pdfData);
    // 透過比例設定 canvas 尺寸
    console.log(pdfImage.width / window.devicePixelRatio, pdfImage.height / window.devicePixelRatio);
    canvas.value.setWidth(pdfImage.width / window.devicePixelRatio);
    canvas.value.setHeight(pdfImage.height / window.devicePixelRatio);
    // 將 PDF 畫面設定為背景
    canvas.value.setBackgroundImage(pdfImage, canvas.value.renderAll.bind(canvas.value));
  }
  const printPDF = async (pdfData) => {
    console.log("printPDF", pdfData);
    const Base64Prefix = "data:application/pdf;base64,";
    pdfData = await readBlob(pdfData);
    // 將 base64 中的前綴刪去，並進行解碼
    const data = atob(pdfData.substring(Base64Prefix.length));
    // 利用解碼的檔案，載入 PDF 檔及第一頁
    const pdfDoc = await PDFJS.getDocument({ data }).promise;
    const pdfPage = await pdfDoc.getPage(1);
    // 設定尺寸及產生 canvas
    const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio }); // 增加清晰度
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    // 設定 PDF 所要顯示的寬高及渲染
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = {
      canvasContext: context,
      viewport,
    };
    const renderTask = pdfPage.render(renderContext);
    // 回傳做好的 PDF canvas
    return renderTask.promise.then(() => canvas);
  }
  const readBlob = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      }
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    })
  }
  const pdfToImage = async (pdfData) => {
    console.log("pdfToImage", pdfData);
    // 設定 PDF 轉為圖片時的比例
    const scale = 1 / window.devicePixelRatio;
    // 回傳圖片
    return new fabric.Image(pdfData, {
      scaleX: scale,
      scaleY: scale,
    });
  }
  return {
    uploadPDF,
    canvas,
  }
}