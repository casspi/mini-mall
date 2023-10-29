//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Paging,
    WowPage.wow$.mixins.Helper,
  ],
  data: {
    arrData: [],
  },
  onLoad(options) {
    this.routerGetParams(options)
  },
  onShow() {
    console.log("onShow", this.data.params$)
    let { from, cacheFrom, ...reset } = this.data.params$

    // 从wx地址选择回来的
    if (from === "wx") {
      this.setData({
        params$: {
          ...reset,
          from: cacheFrom,
        },
      })
      return
    }
    this.reqAddressList()
  },
  handleSelect(event) {
    console.log(this.data, this.inputParams(event))
    let { from } = this.data.params$
    if (["mine_index", "merchant_index"].indexOf(from) > -1) {
      return null
    }
    let { item } = this.inputParams(event)
    let objPage = this.pagesGetByIndex(1)
    if (objPage) {
      objPage.setData({ objAddress: item })
    }
    this.routerPop()
  },
  reqAddressList() {
    let { api$, params$ } = this.data
    this.curl(
      api$.REQ_ADDRESS_LIST,
      {},
      {
        loading: false,
        callback: (res) => {
          return { storeId: res.storeId || "" }
        },
      },
    )
      .then((res) => {
        res.forEach((item) => {
          item.source = params$.source
        })
        this.setData({ arrData: res })
      })
      .toast()
  },
  handleReadAddressFormWx() {
    const { from } = this.data.params$
    this.setData({
      params$: {
        ...this.data.params$,
        from: "wx",
        cacheFrom: from,
      },
    })
    this.helperFnPromise("chooseAddress").then((res) => {
      console.log("chooseAddress", res)
    })
  },
})
