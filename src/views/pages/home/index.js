//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'
import DataMixin from './data.mixin'
// eslint-disable-next-line no-undef
var appInstance = getApp()
console.log(appInstance.globalData)
new WowPage({
  mixins: [DataMixin, WowPage.wow$.mixins.Jump, WowPage.wow$.mixins.Router, WowPage.wow$.mixins.Shop, WowPage.wow$.mixins.Tabbar, WowPage.wow$.mixins.Curl, WowPage.wow$.mixins.Refresh, WowPage.wow$.mixins.Share],
  handleClassify(e) {
    const { item } = this.inputParams(e)
    appInstance.globalData.classifyId = item.id || ''
    this.routerRoot('classify_index')
  },
  onLoad() {
    this.getClassifyList()
    this.getActivity()
    this.getGoodsList()
  },
  onShow() {
    this.reqShopCartTotal()
  },
  pagingRefresh(callback) {
    this.reqShopCartTotal()
    this.getClassifyList()
    this.getActivity()
    this.getGoodsList()
    typeof callback === 'function' && callback()
  },
  getClassifyList() {
    const { api$ } = this.data
    this.curl(api$.REQ_HOME_DIC, { recommendation: 0, status: 0 }, {}).then((res) => {
      console.log('getClassifyList', res)
      res = [...res, { id: 0, name: '全部', icon: '/assets/images/all.png' }]
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
  getActivity() {
    const { api$ } = this.data
    this.curl(api$.REQ_ACTIVITY_ALL, { status: 0 }).then((res) => {
      this.setData({
        arrAd: res || [],
      })
    })
  },
  getGoodsList() {
    const { api$ } = this.data
    this.curl(api$.REQ_ALL_GOODS, { recommendation: 0, status: 0 }, { method: 'post' }).then((res) => {
      this.setData({
        arrGoods: res || [],
      })
    })
  },
})
