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
    WowPage.wow$.mixins.User,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Refresh,
  ],
  data: {
    userInfo: {},
  },
  onShow() {
    this.getDetail()
    this.userGet()
      .then(
        (res) => {},
        (err) => {
          console.log("err", err)
        },
      )
      .null()
  },
  pagingRefresh(callback) {
    this.getDetail().finally(() => {
      typeof callback === "function" && callback()
    })
  },
  getDetail() {
    const { api$ } = this.data
    return this.curl(api$.REQ_USER_INFO, {}, { method: "get", loading: false })
      .then((res) => {
        this.setData({
          userInfo: res.user,
        })
      })
      .toast()
  },
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
