//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"

new WowPage({
  mixins: [WowPage.wow$.mixins.Router],
  onLoad(options) {
    this.routerGetParams(options)
    const { params$ } = this.data
    wx.setNavigationBarTitle({ title: params$.title || "详情" })
  },
})
