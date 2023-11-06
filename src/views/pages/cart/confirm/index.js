//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Payment,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.Config,
    WowPage.wow$.mixins.Cache,
    WowPage.wow$.mixins.Goods,
  ],
  data: {
    objAddress: "",
    objPrescription: "",
    arrData: "",
    numAmount: "---",
    remark: "",
    isPrescriptionDrugs: false, // 是否有处方药
  },
  onLoad(options) {
    this.routerGetParams(options)
    console.log(this.data)
    this.reqAddressList()
  },
  onShow() {},
  // 普通订单提交
  handleSubmit() {
    let { objAddress, objPrescription, api$, params$, config$ } = this.data
    if (this.judgeGoods(params$.arrData)) return
    let objPayParams
    this.curl(api$.DO_ORDER_SUBMIT, {
      addressId: objAddress.id,
      prescriptionId: objPrescription.id,
      deliveryMethod: "普通快递",
      wtOrderRelProducts: params$.arrData,
    }).then((res) => {
      this.modalToast("下单成功")
      setTimeout(() => {
        this.routerPop()
      }, 1000)
      // objPayParams = res || {}
      // let { timeStamp, nonceStr, packageDesc, signType, paySign } = objPayParams
      // return this.paymentAmount({
      //   package: packageDesc,
      //   timeStamp,
      //   nonceStr,
      //   signType,
      //   paySign,
      // })
    })
    // .then((res) => {
    //   return this.routerPush("cart_payment_index", { status: "success", from: "cart_confirm_index" }, true)
    // })
    // .catch((err) => {
    //   if (err && err.errMsg && err.errMsg.indexOf("requestPayment") > -1) {
    //     return this.routerPush(
    //       "cart_payment_index",
    //       { status: "error", from: "cart_confirm_index", ...objPayParams },
    //       true,
    //     )
    //   }
    //   this.modalToast(err)
    // })
  },
  countTotalAmount() {
    let { arrData } = this.data.params$
    let numAmount = 0
    let isPrescriptionDrugs = false
    arrData.forEach((item) => {
      let price = +item.price
      let productCount = +item.productCount
      console.log(price)
      numAmount += productCount * price
      console.log("numAmount=>", numAmount)
      if (item.feightFee) {
        numAmount = numAmount + +item.feightFee
      }
      if (numAmount < 0) {
        numAmount = 0
      }
      // 0 - 处方药，1 - 非
      if (item.prescriptionDrugs === 0) {
        isPrescriptionDrugs = true
      }
    })
    this.setData({ numAmount, isPrescriptionDrugs })
  },
  reqAddressList() {
    let { api$, objAddress } = this.data
    this.curl(
      api$.REQ_ADDRESS_LIST,
      {},
      {
        loading: false,
        method: "post",
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
        this.setData({ objAddress: objAddress || "" })
      })
      .toast()
      .finally(() => {
        this.countTotalAmount()
      })
  },
})
