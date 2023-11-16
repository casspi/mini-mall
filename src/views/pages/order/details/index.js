//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Config,
    WowPage.wow$.mixins.Clipboard,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Payment,
  ],
  data: {
    objRelation: '',
    objData: '',
    objPrescription: '',
  },
  onLoad(options) {
    this.routerGetParams(options)
  },
  onShow() {
    this.reqOrderInfo()
  },
  reqOrderInfo() {
    let { api$, params$ } = this.data
    this.curl(
      api$.REQ_ORDER_DETAIL + params$.id,
      {},
      {
        loading: false,
        method: 'get',
      },
    )
      .then((res) => {
        this.setData({ objData: res })
        return res
      })
      .then((res) => {
        res.prescriptionId && this.reqPrescriptionInfo(res.prescriptionId)
      })
      .toast()
  },
  // 获取处方信息
  reqPrescriptionInfo(id) {
    let { api$ } = this.data
    this.curl(
      api$.REQ_PRESCRIPTION_DETAIL + id,
      {},
      {
        loading: false,
        method: 'get',
      },
    ).then((res) => {
      this.setData({ objPrescription: res })
    })
  },
  handleCopy(event) {
    let { text } = this.inputParams(event)
    this.clipboardSetData(text)
      .then(() => {
        this.modalToast('复制成功')
      })
      .toast()
  },
  handleCancel() {
    let { params$, api$ } = this.data
    this.modalConfirm(`确认取消该订单？`)
      .then(() => {
        return this.httpRequest(api$.DO_ORDER_RELATION_INFO, {
          orderId: params$.orderId,
        })
      })
      .then((res) => {
        this.setData({ objRelation: res })
        if (res.storePayList.length >= 1) {
          return this.selectComponent('#relationCancel').show()
        }
        this.handleSureCancel()
      })
      .toast()
  },
  // 关联弹窗确认取消
  handleSureCancel() {
    this.selectComponent('#relationCancel').hide()
    let { params$, api$ } = this.data
    this.httpRequest(api$.DO_ORDER_CLOSE, {
      orderId: params$.orderId,
    })
      .then(() => {
        this.modalToast('取消成功')
        setTimeout(this.routerPop.bind(this), 1000)
      })
      .toast()
  },
  handleDelete() {
    let { params$, api$ } = this.data
    this.modalConfirm(`确认删除该订单？`)
      .then(() => {
        return this.httpRequest(api$.DO_ORDER_DELETE, {
          orderId: params$.orderId,
        })
      })
      .then(() => {
        this.modalToast('删除成功')
        setTimeout(this.routerPop.bind(this), 1000)
      })
      .toast()
  },
  handleConfirm() {
    let { params$, api$ } = this.data
    this.modalConfirm(`确认已收货？`)
      .then(() => {
        return this.httpRequest(api$.DO_ORDER_CONFIRM, {
          orderId: params$.orderId,
        })
      })
      .then(() => {
        this.modalToast('收货成功')
        setTimeout(this.routerPop.bind(this), 1000)
      })
      .toast()
  },
  // 立即付款
  handlePayment() {
    let { api$, params$ } = this.data
    this.httpRequest(api$.DO_ORDER_RELATION_INFO, {
      orderId: params$.orderId,
    })
      .then((res) => {
        this.setData({ objRelation: res })
        if (res.storePayList.length >= 1) {
          return this.selectComponent('#relationPayment').show()
        }
        this.handleSurePayment()
      })
      .toast()
  },
  // 关联弹窗确认支付
  handleSurePayment() {
    this.selectComponent('#relationPayment').hide()
    let { objRelation } = this.data
    let { timeStamp, nonceStr, packageDesc, signType, paySign } = objRelation.orderPayInfo
    this.paymentAmount({
      package: packageDesc,
      timeStamp,
      nonceStr,
      signType,
      paySign,
    })
      .then((res) => {
        return this.routerPush('cart_payment_index', { status: 'success' }, true)
      })
      .catch((err) => {
        this.modalToast('取消付款')
      })
  },
  // 总售后申请
  handleRefundApply() {
    let { params$, config$ } = this.data
    let orderDetailList = params$.orderDetailList.filter(
      (item) => !item.refundApplyStatus || item.refundApplyStatus === config$.ORDER_REFUND_STATUS.REFUSE || item.refundApplyStatus === config$.ORDER_REFUND_STATUS.REVOKE,
    )
    if (!orderDetailList.length) {
      return this.modalToast('商品已申请了售后')
    }
    if (orderDetailList.length > 1) {
      this.routerPush('order_refund_select_index', { arrData: orderDetailList })
    } else {
      this.routerPush('order_refund_apply_index', orderDetailList[0])
    }
  },
})
