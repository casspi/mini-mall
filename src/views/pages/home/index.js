//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"
import DataMixin from "./data.mixin"
// eslint-disable-next-line no-undef
var appInstance = getApp()
console.log(appInstance.globalData)
new WowPage({
  mixins: [
    DataMixin,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Shop,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Tabbar,
  ],
  handleClassify(options) {
    appInstance.globalData.classifyId = options.id
    this.routerRoot("classify_index")
  },
  onShow() {
    this.reqShopCartTotal()
  },
})
