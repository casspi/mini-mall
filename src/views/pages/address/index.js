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
    classes: "mode-arrow",
  },
  onLoad(options) {
    this.routerGetParams(options)
  },
  onShow() {
    let { from, cacheFrom, ...reset } = this.data.params$
    // 从wx地址选择回来的
    if (from === "wx") {
      this.setData({
        params$: {
          ...reset,
          from: cacheFrom,
        },
      })
      console.log("onShow", this.data.params$)
      return
    }
    this.setData({
      classes: from === "mine_index" ? "mode-edit" : "mode-arrow",
    })
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
        method: "get",
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
    const { api$ } = this.data
    this.setData({
      params$: {
        ...this.data.params$,
        from: "wx",
        cacheFrom: from,
      },
    })
    this.helperFnPromise("chooseAddress").then((res) => {
      console.log("chooseAddress", res)
      const {
        cityName: city,
        countyName: county,
        detailInfo: detail,
        provinceName: province,
        telNumber: phone,
        userName: name,
      } = res
      this.curl(
        api$.DO_ADD_ADDRESS,
        {
          province,
          city,
          county,
          detail,
          name,
          phone,
          status: "0",
        },
        {
          method: "post",
        },
      )
        .then(() => {
          this.modalToast("添加成功")
          this.reqAddressList()
        })
        .toast()
    })
  },
})
