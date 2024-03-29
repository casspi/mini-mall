//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'
import DataMixin from './data.mixin'

new WowPage({
  mixins: [
    DataMixin,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.User,
    WowPage.wow$.mixins.Payment,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.Config,
    WowPage.wow$.mixins.Cache,
    WowPage.wow$.mixins.Goods,
    WowPage.wow$.mixins.Validate,
  ],
  data: {
    objAddress: '',
    objPrescription: '',
    arrData: '',
    numAmount: '---',
    remark: '',
    isPrescriptionDrugs: false, // 是否有处方药
    expressDeliveryFee: '',
  },
  onLoad(options) {
    this.routerGetParams(options)
    console.log(this.data)
  },
  onShow() {
    this.userGet().null()
    this.reqAddressList()
    this.init()
  },
  init() {
    let { api$ } = this.data
    this.curl(
      api$.REQ_EXPRESSDELIVERYFEE,
      {},
      {
        loading: false,
        method: 'get',
      },
    ).then((res) => {
      this.setData({ expressDeliveryFee: res })
    })
  },
  // 订单提交
  handleSubmit() {
    let { objAddress, objPrescription, api$, params$, config$, isPrescriptionDrugs, needDiagnosis, objInput, objHidden } = this.data
    let { from, arrData, ...reset } = params$
    if (this.judgeGoods(arrData)) return

    // 除方药
    if (isPrescriptionDrugs) {
      // 需要问诊
      if (needDiagnosis) {
        if (this.validateCheck(objInput)) {
          return
        }
      } else {
        // 自有处方
        if (!objPrescription) {
          return this.modalToast('请选择处方')
        }
      }
    }
    let diagnosisParams = {}
    // 问诊逻辑
    if (needDiagnosis) {
      const res = this.validateInput(objHidden, objInput)
      console.log('res=>', res)
      diagnosisParams = this.formartDiagnosisParams(res)
    }
    console.log('diagnosisParams=>', diagnosisParams)
    return

    // 原下单逻辑
    let objPayParams, wxCode
    this.userLogin()
      .then((code) => {
        wxCode = code
        const submitParams = { wxCode, addressId: objAddress.id, prescriptionId: objPrescription.id, deliveryMethod: '普通快递', wtOrderRelProducts: params$.arrData }
        if (from !== 'goods_index') submitParams.shoppingCartRelProductIds = arrData.map((item) => item.id)
        return this.curl(api$.DO_ORDER_SUBMIT, submitParams, { loading: true })
      })
      .then((res) => {
        if (isPrescriptionDrugs) {
          const tips = needDiagnosis ? '下单成功，等待问诊接单' : '下单成功，等待后台审核'
          this.modalToast(tips)
          setTimeout(this.routerPop.bind(this), 1500)
          throw 'over'
        }
        // 非处方药走支付逻辑
        return this.curl(api$.DO_PAY + `${res.id}/${wxCode}`, {}, { loading: true })
      })
      .then((res) => {
        let { payParamJson } = res || {}
        objPayParams = JSON.parse(payParamJson)
        return this.paymentRequest(objPayParams)
      })
      .then((res) => {
        this.modalToast('支付成功')
        return this.routerPush('payment_index', { status: 'success', from: 'cart_confirm_index' }, true)
      })
      .catch((err) => {
        console.log(err)
        if (err === 'over') return
        if (err && err.errMsg && err.errMsg.indexOf('requestPayment') > -1) {
          return this.routerPush('payment_index', { status: 'error', from: 'cart_confirm_index', objPayParams }, true)
        }
        this.modalToast(err)
      })
  },
  countTotalAmount() {
    let { arrData } = this.data.params$
    let numAmount = 0
    let isPrescriptionDrugs = false
    arrData.forEach((item) => {
      let price = +item.price
      let productCount = +item.productCount
      numAmount += productCount * price
      if (numAmount < 0) {
        numAmount = 0
      }
      // 0 - 处方药，1 - 非
      if (item.prescriptionDrugs === 0) {
        isPrescriptionDrugs = true
      }
    })
    console.log('numAmount=>', numAmount)
    this.setData({ numAmount, isPrescriptionDrugs })
  },
  reqAddressList() {
    let { api$, objAddress } = this.data
    this.curl(
      api$.REQ_ADDRESS_LIST,
      {},
      {
        loading: false,
        method: 'post',
      },
    )
      .then((res) => {
        res = res || []
        if (objAddress) {
          objAddress = res.filter((item) => item.id === objAddress.id)[0]
        }
        if (!objAddress) {
          // 有默认取默认，无默认取第一个
          objAddress = res.filter((item) => item.def === 1)[0] || res[0]
        }
        if (!objAddress) {
          objAddress = res[0]
        }
        this.setData({ objAddress: objAddress || '' })
      })
      .toast()
      .finally(() => {
        this.countTotalAmount()
      })
  },
})
