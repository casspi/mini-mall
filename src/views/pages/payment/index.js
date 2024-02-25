//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [WowPage.wow$.mixins.Router, WowPage.wow$.mixins.Input, WowPage.wow$.mixins.Jump, WowPage.wow$.mixins.Payment, WowPage.wow$.mixins.Config, WowPage.wow$.mixins.Modal],
  onLoad(options) {
    this.routerGetParams(options)
  },
  handlePayment() {
    let { params$, config$ } = this.data
    let { objPayParams } = params$
    this.paymentRequest(objPayParams)
      .then((res) => {
        return this.routerPush(
          'payment_index',
          {
            status: 'success',
            ...params$,
          },
          true,
        )
      })
      .catch((err) => {
        this.modalToast('取消付款')
      })
  },
})
