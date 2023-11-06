//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"

const $$KEY_HISTORY_LIST = "$$KEY_HISTORY_LIST"

console.log("WowPage.wow$.mixins", WowPage.wow$.mixins)
new WowPage({
  mixins: [
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Storage,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Shop,
    WowPage.wow$.mixins.Curl,
  ],
  data: {
    keyword: "",
    arrHistory: [],
    numCurrIndex: 0,
  },
  onLoad(options) {
    this.routerGetParams(options)
    const { params$ } = this.data
    this.reqShopCartTotal()
    console.log("params$=>", params$)
    this.getHistoryKeywords(() => {
      console.log("this.getHistoryKeywords=>", params$.item && params$.item.names)
      if (params$.item && params$.item.name) {
        this.setData({
          keyword: params$.item.name || "",
        })
        this.handleSearch()
      }
    })
  },
  handleSearch() {
    let { keyword } = this.data
    if (!keyword.trim()) {
      return this.modalToast("请输入药品名称")
    }
    this.setHistoryKeywords()
    this.setData({ numCurrIndex: 1 })
  },
  handleInput(event) {
    let { value } = this.inputParams(event)
    this.setData({ keyword: value, numCurrIndex: 0 })
  },
  handleKeyword(event) {
    let { keyword } = this.inputParams(event)
    this.setData({ keyword })
    this.handleSearch()
  },
  getHistoryKeywords(cb) {
    this.storageGet($$KEY_HISTORY_LIST)
      .then((res) => {
        console.log(res)
        this.setData({ arrHistory: res || [] })
      })
      .finally(() => {
        cb && cb()
      })
      .null()
  },
  setHistoryKeywords() {
    let { arrHistory, keyword } = this.data
    keyword = keyword.trim()
    let index = arrHistory.indexOf(keyword)
    if (index !== -1) {
      arrHistory.splice(index, 1)
    }
    arrHistory.unshift(keyword)
    this.setData({ arrHistory })
    this.storageSet($$KEY_HISTORY_LIST, arrHistory)
  },
  clearHistoryKeywords() {
    this.modalConfirm(`确认清空历史搜索？`)
      .then(() => {
        return this.storageRemove($$KEY_HISTORY_LIST)
      })
      .then(() => {
        this.setData({ arrHistory: [] })
      })
      .toast()
  },
})
