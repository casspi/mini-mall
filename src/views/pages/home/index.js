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
    WowPage.wow$.mixins.Tabbar,
    WowPage.wow$.mixins.Curl,
  ],
  handleClassify(e) {
    const { item } = this.inputParams(e)
    appInstance.globalData.classifyId = "6c187ee8a3bb4f3fb3e6368bbfe8c999" //item.id || "0ee0089378424bbebe8938dda539d60f"
    this.routerRoot("classify_index")
  },
  onLoad() {
    this.reqShopCartTotal()
    this.getClassifyList()
    this.getGoodsList()
  },
  getClassifyList() {
    const { api$ } = this.data
    this.curl(api$.REQ_HOME_DIC, { recommendation: 0, status: 0 }, {}).then((res) => {
      res = [...res, { id: 0, name: "全部", icon: "/assets/images/home/pifuke.png" }]
      console.log("getClassifyList", res)
      let index = 0
      let arrClassify = []
      while (index < res.length) {
        arrClassify.push(res.slice(index, (index += 10)))
      }
      console.log(arrClassify)
      this.setData({
        arrClassify,
      })
    })
  },
  getGoodsList() {
    const { api$ } = this.data
    this.curl(api$.REQ_ALL_GOODS, { recommendation: 0, status: 0 }, { method: "post" }).then((res) => {
      this.setData({
        arrGoods: res || [],
      })
    })
  },
})
