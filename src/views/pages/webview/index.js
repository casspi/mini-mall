//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"
import { isProd } from "../../../config/api.config"

new WowPage({
  mixins: [WowPage.wow$.mixins.Router, WowPage.wow$.mixins.Navbar, WowPage.wow$.mixins.Page, WowPage.wow$.mixins.Input],
  data: {
    url: "",
  },
  onLoad(options) {
    this.routerGetParams(options)
    this.assignmentData()
  },
  assignmentData() {
    const { params$ } = this.data
    console.log(params$)
    const { title = "内容详情", label, link } = params$
    // todo 修复接口给的链接地址可能是 http 的
    let url = link
    isProd && url.replace("http://", "https://")
    url = url.includes("?") ? `${url}&_v=${Date.now()}` : `${url}?_v=${Date.now()}`
    this.setData({ url })
    this.navBarSetTitle(label || title)
  },
  handleMessage(event) {
    const { handle } = this.data.params$
    if (!handle) return
    const { data } = this.inputParams(event)
    const refPage = this.pagesGetByIndex(1)
    if (refPage && refPage[handle]) {
      refPage && refPage[handle](data)
    }
  },
})
