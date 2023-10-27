//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"
import DataMixin from "./data.mixin"

new WowPage({
  mixins: [DataMixin, WowPage.wow$.mixins.Input, WowPage.wow$.mixins.Router, WowPage.wow$.mixins.Tabs],
  data: {
    numCurrIndex: -1,
  },
  onLoad(options) {
    this.routerGetParams(options)
    this.assignmentData()
  },
  assignmentData() {
    let { params$ } = this.data
    this.setData({ numCurrIndex: params$.index || 0 })
  },
})
