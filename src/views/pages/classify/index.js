//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"

new WowPage({
  mixins: [WowPage.wow$.mixins.Input, WowPage.wow$.mixins.Curl, WowPage.wow$.mixins.Config, WowPage.wow$.mixins.Router],
  data: {
    arrData: [],
    numCurrIndex: 0,
  },
  onload(options) {
    this.routerGetParams(options)
    const { params$ } = this.data
    console.log("params$=>", params$)
  },
  onShow() {
    // eslint-disable-next-line no-undef
    const appInstance = getApp()
    console.log("options=>", appInstance.globalData)
    this.setData({ numCurrIndex: appInstance.globalData.classifyId }, () => {
      appInstance.globalData.classifyId = 0
    })
    this.reqClassifyList()
  },
  handleClassifyChange(event) {
    let { item, index } = this.inputParams(event)
    this.setData({ numCurrIndex: index })
    // this.reqClassifyList(item.id)
  },
  reqClassifyList(parentId = "") {
    let { arrData, numCurrIndex, config$ } = this.data
    let options = { storeId: config$.SELF_STORE_ID }
    if (parentId) {
      if (arrData[numCurrIndex].subData && arrData[numCurrIndex].subData.length) {
        return null
      }
      options.parentId = parentId
    }
    this.curl(this.data.api$.REQ_CLASSIFY_LIST, options, {
      loading: false,
    })
      .then((res) => {
        if (!parentId) {
          this.setData({ arrData: res || [] })
          const { id } = this.data.arrData[numCurrIndex] || {}
          if (id) {
            this.reqClassifyList(id)
          }
          return null
        }
        arrData[numCurrIndex].subData = res
        this.setData({ arrData })
      })
      .toast()
  },
})
