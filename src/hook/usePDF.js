import { fabric } from "fabric";
import { computed, ref } from "vue";
import jsPDF from "jspdf";
import * as PDFJS from "pdfjs-dist";
PDFJS.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`;

export default () => {
  const nowPage = ref(1);
  const totalPage = ref(1);
  const pdfDoc = ref(null);
  const isRender = ref(false);
  const canvas = computed(() => new fabric.Canvas("canvasBox"));

  const uploadPDF = async (file) => {
    if (!file) return;
    await trasferPDF(file);
    const pdf = await getPagePDF();
    renderToCanvas(pdf);
  };
  const trasferPDF = async (file) => {
    console.log("trasferPDF", file);
    const Base64Prefix = "data:application/pdf;base64,";
    file = await readBlob(file);
    // 將 base64 中的前綴刪去，並進行解碼
    const data = atob(file.substring(Base64Prefix.length));
    // 利用解碼的檔案，載入 PDF 檔及第一頁
    pdfDoc.value = await PDFJS.getDocument({ data }).promise;
    totalPage.value = pdfDoc.value.numPages;
    console.log("pdfDoc.value", pdfDoc.value);
  }
  const goPageRender = async () => {
    isRender.value = true;
    const pdf = await getPagePDF();
    renderToCanvas(pdf);
  }
  const getPagePDF = async () => {
    console.log("getPage");
    const pdfPageData = await pdfDoc.value.getPage(nowPage.value);
    // 設定尺寸及產生 canvas
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const clientHeight = document.getElementsByClassName("canvasOut")[0].clientHeight;
    const scale = clientHeight / pdfPageData.view[3] * 1.5; // 增加清晰度1.5
    const viewport = pdfPageData.getViewport({ scale });
    // 設定 PDF 所要顯示的寬高及渲染
    //console.log(pdfPageData.view[3], pdfPageData.view, clientHeight, scale, "height");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = {
      canvasContext: context,
      viewport,
    };
    const renderTask = pdfPageData.render(renderContext);
    // 回傳做好的 PDF canvas
    return renderTask.promise.then(() => canvas);
  }
  // 此處 canvas 套用 fabric.js
  const renderToCanvas = async (pdfData) => {
    console.log(pdfData, "renderToCanvas");
    canvas.value.requestRenderAll();
    const pdfImage = await pdfToImage(pdfData);
    // 透過比例設定 canvas 尺寸
    console.log(pdfImage.height / window.devicePixelRatio, window.devicePixelRatio);
    canvas.value.setWidth(pdfImage.width / window.devicePixelRatio);
    canvas.value.setHeight(pdfImage.height / window.devicePixelRatio);
    // 將 PDF 畫面設定為背景
    canvas.value.setBackgroundImage(pdfImage, canvas.value.renderAll.bind(canvas.value));
    isRender.value = false;
  };
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
  const goCurrentPage = (type) => {
    type === "previous" ? goPreviousPage() : goNextPage();
    goPageRender();
  };
  const goPreviousPage = () => {
    if (nowPage.value - 1 < 1) return;
    nowPage.value -= 1;
  };
  const goNextPage = () => {
    if (nowPage.value + 1 > totalPage.value) return;
    nowPage.value += 1;
  };
  //加物件到canvas
  const addString = (str) => {
    console.log("addString", str);
    const text = new fabric.Text(str, {
      left: 0,
      top: 120,
    })
    canvas.value.add(text);
    console.log("getObjects", canvas.value.getObjects());
  }
  const addSign = (sign) => {
    console.log("putPDF");
    fabric.Image.fromURL(sign, function (image) {
      // 設定簽名出現的位置及大小，後續可調整
      image.top = 400;
      image.scaleX = 0.5;
      image.scaleY = 0.5;
      canvas.value.add(image);
    })
  }
  //下載canvas pdf
  const download = () => {
    const pdf = new jsPDF("", "pt", "a4");
    //將 canvas 存為圖片
    const image = canvas.value.toDataURL("image/png");
    // 設定背景在 PDF 中的位置及大小
    const width = pdf.internal.pageSize.width;
    const height = pdf.internal.pageSize.height;
    pdf.addImage(image, "png", 0, 0, width, height);
    // 將檔案取名並下載
    return pdf.save("download.pdf", {returnPromise:true});
  }
  return {
    uploadPDF,
    canvas,
    nowPage,
    totalPage,
    goCurrentPage,
    isRender,
    addString,
    addSign,
    download,
  }
}