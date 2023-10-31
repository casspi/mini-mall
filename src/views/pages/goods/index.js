//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Shop,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.User,
    WowPage.wow$.mixins.Tabbar,
    WowPage.wow$.mixins.Curl,
  ],
  data: {
    goodsInfo: {},
    arrBanner: [],
  },
  onLoad(options) {
    this.routerGetParams(options)
    const { params$ } = this.data
  },
  onShow() {
    this.reqShopCartTotal()
    this.getDetail()
  },
  getDetail() {
    const { api$, params$ } = this.data
    console.log(params$)
    this.curl(
      api$.REQ_GOODS_DETAIL + params$.id,
      {},
      {
        loading: false,
        method: "get",
      },
    ).then((res) => {
      res.imagesIcon = params$.imagesIcon
      res.imagesGuidance = params$.imagesGuidance
      res.imagesDetail = params$.imagesDetail
      this.setData({
        goodsInfo: res,
      })
      if (res.imagesIcon && res.imagesIcon.length) {
        const arrBanner = res.imagesIcon.map((item) => {
          return api$.IMG_SOURCE + item.imagePath
        })
        this.setData({
          arrBanner,
        })
      }
    })
  },
})
