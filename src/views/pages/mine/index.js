//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"
import DataMixin from "./data.mixin"

new WowPage({
  mixins: [
    DataMixin,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.Call,
  ],
  handleCustomerService(options) {
    const { item } = options
    console.log(item, options)
    this.modalConfirm({
      content: `拨打客服电话400-8882222？`,
      confirmText: "确定",
      cancelText: "取消",
    })
      .then(() => {
        return this.callPhone(13817674594)
      })
      .finally((r) => {
        console.log("finally", r)
      })
      .null()
  },
})
