//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"

new WowPage({
  mixins: [WowPage.wow$.mixins.Router, WowPage.wow$.mixins.Input],
  data: {
    keywords: "",
  },
  handleKeywordInput(event) {
    const { value } = this.inputParams(event)
    if (!value.trim()) this.handleKeywordConfirm(event)
  },
  handleKeywordConfirm(event) {
    const { value } = this.inputParams(event)
    this.setData({ keywords: value.trim() }, () => {
      this.handleRefresh()
    })
  },
  handleRefresh(cb) {
    console.log("药品refresh")
  },
})
