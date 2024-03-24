//index.js
import './index.json'
import './index.scss'
import './index.wxml'
import ApiConfig from 'src/config/api.config'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.User,
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
    objPrescription: '', // 处方信息
    objPrescriptionInfo: '', // 冗余页面显示的
    reason: '',
    isPrescriptionDrugs: false, // 是否有处方药
  },
  onLoad(options) {
    this.routerGetParams(options)
  },
  onShow() {
    this.reqOrderInfo()
  },
  reqOrderInfo() {
    let { api$, params$, config$ } = this.data
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
        // 判断是否显示处方信息
        if (res.prescriptionId && [config$.ORDER_STATUS.ORDER_CHCK, config$.ORDER_STATUS.ORDER_CHCK_REFUSE].includes(res.orderStatus)) {
          this.setData({ isPrescriptionDrugs: true })
        }
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
      console.log('reqPrescriptionInfores', res)
      const objPrescription = { prescriptionId: id }
      if (res.wtPatient) {
        objPrescription.patient = res.wtPatient
      }
      objPrescription.caseFileIds = (res.caseFileIds || []).map((id) => {
        return { id, src: ApiConfig.IMAGE_BASE_URL + id }
      })

      objPrescription.labelFileIds = (res.labelFileIds || []).map((id) => {
        return { id, src: ApiConfig.IMAGE_BASE_URL + id }
      })
      this.setData({ objPrescriptionInfo: JSON.parse(JSON.stringify(res)), objPrescription })
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
  // 确认收货
  handleConfirm() {
    let { params$, api$ } = this.data
    this.modalConfirm(`确认已收货？`)
      .then(() => {
        return this.curl(
          api$.REQ_RECEIPT_ORDER,
          {
            id: params$.id,
          },
          { method: 'put' },
        )
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
    this.userLogin()
      .then((wxCode) => {
        return this.curl(api$.DO_PAY + `${params$.id}/${wxCode}`, {}, { loading: true })
      })
      .then((res) => {
        let { payParamJson } = res || {}
        return this.paymentRequest(JSON.parse(payParamJson))
      })
      .then(() => {
        this.modalToast('支付成功')
        this.reqOrderInfo()
      })
      .catch((err) => {
        if (err && err.errMsg && err.errMsg.indexOf('requestPayment') > -1) {
          this.modalToast('取消付款')
        } else {
          this.modalToast('支付失败')
        }
      })
  },
  //申请退货
  beforeClose(type, callback) {
    if (type === 'confirm') {
      let { reason } = this.data
      if (reason) callback()
      else this.modalToast('请填写退货原因')
    } else {
      callback()
    }
  },
  handleReturn(data) {
    this.setData({ reason: '' })
    return this.selectComponent('#refWowModal')
      .show({
        beforeClose: this.beforeClose.bind(this),
      })
      .then((res) => {
        let { api$, reason } = this.data
        return this.curl(api$.REQ_RETURN_ORDER, { reasonForReturn: reason, id: data.detail.id }, { method: 'put' })
      })
      .then(() => {
        this.modalToast('申请退货成功，我们将进行审核，请耐心等待~')
        setTimeout(this.routerPop.bind(this), 1000)
      })
      .toast()
  },
})
