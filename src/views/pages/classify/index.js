//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [WowPage.wow$.mixins.Input, WowPage.wow$.mixins.Curl, WowPage.wow$.mixins.Config, WowPage.wow$.mixins.Router, WowPage.wow$.mixins.Shop, WowPage.wow$.mixins.Tabbar, WowPage.wow$.mixins.Share],
  data: {
    arrData: [],
    numCurrIndex: 0,
  },
  onload(options) {
    this.routerGetParams(options)
    const { params$ } = this.data
    console.log('params$=>', params$)
  },
  onShow() {
    // 搜索结果页加入购物车，由于不是tab页，无法更新tabBarBadgeShow数字，在这里触发更新
    this.reqShopCartTotal()
    this.reqClassifyList()
  },
  handleClassifyChange(event) {
    let { item, index } = this.inputParams(event)
    this.setData({ numCurrIndex: index })
    // this.reqClassifyList(item.id)
  },
  reqClassifyList() {
    let { api$ } = this.data
    this.curl(
      api$.REQ_CLASSIFY_LIST,
      {},
      {
        loading: false,
      },
    )
      .then((res) => {
        this.setData({ arrData: res || [] }, () => {
          this.setCurrIndex()
        })
      })
      .toast()
  },
  setCurrIndex() {
    const { arrData } = this.data
    // eslint-disable-next-line no-undef
    const appInstance = getApp()
    console.log('options=>', appInstance.globalData)
    if (appInstance.globalData.classifyId) {
      const numCurrIndex = arrData.findIndex((item) => item.id === appInstance.globalData.classifyId)
      this.setData({ numCurrIndex }, () => {
        appInstance.globalData.classifyId = ''
      })
    }
  },
  shareGetConfig() {
    return {
      path: '/pages/classify/index',
    }
  },
})
