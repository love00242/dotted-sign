import { defineStore } from "pinia";

export const usePdfStore = defineStore("pdf", {
  state: () => {
    return {
      signList: [],
      pdfRecordList: [],
    }
  },
  getters: {},
  actions: {
    setSignList(val) {
      this.signList = val;
    },
    setPdfRecordList(val) {
      this.pdfRecordList = val;
    },
  },
  persist: {
    key: "pinia-pdf",
    paths: ["signList", "pdfRecordList"], //持久化属性
  }
})