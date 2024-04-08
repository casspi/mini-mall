//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'
import DataMixin from './data.mixin'

new WowPage({
  mixins: [DataMixin, WowPage.wow$.mixins.Input, WowPage.wow$.mixins.Router, WowPage.wow$.mixins.Tabs, WowPage.wow$.mixins.Curl],
  data: {
    numCurrIndex: -1,
  },
  onLoad(options) {
    this.routerGetParams(options)
    this.assignmentData()
    this.getOrderNumber()
  },
  assignmentData() {
    let { params$ } = this.data
    this.setData({ numCurrIndex: params$.index || 0 })
  },
  getOrderNumber() {
    const { api$, arrStatus } = this.data
    this.curl(api$.REQ_ORDER_NUMBER, {}, { method: 'post', loading: false }).then((res) => {
      arrStatus.forEach((item) => {
        item.badge = ''
      })
      ;(res || []).forEach((item) => {
        const order = arrStatus.find((order) => item.orderStatus === order.status)
        if (order) order.badge = item.orderCount
      })
      this.setData({
        orderNumber: res,
        arrStatus,
      })
    })
  },
})
