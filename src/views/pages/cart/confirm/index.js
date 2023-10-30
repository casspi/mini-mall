//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Http,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Payment,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.Config,
    WowPage.wow$.mixins.Cache,
  ],
  data: {
    objAddress: "",
    arrData: "",
    numAmount: "---",
  },
  onLoad(options) {
    this.routerGetParams(options)
  },
  onShow() {
    this.reqAddressList()
  },
  handleDiscountChange(event) {
    let { index, value } = this.inputParams(event)
    this.setData({ [`arrData[${index}].couponList`]: value })
    this.countTotalAmount()
  },
  // 团购订单提交
  handleGroupSubmit() {
    let { objAddress, arrData, api$, params$ } = this.data
    let { province, city, county, detailAddress: address, name: userName, phoneNumber: mobile } = objAddress
    let store = arrData[0]
    let { storeId, goodInfoRespDtoList, couponList, note = "" } = store
    let { userCouponId = "" } = couponList.filter((item) => item.selected)[0] || {}
    let { goodsId, skuId, productCategoryId, spec, num } = goodInfoRespDtoList[0]
    let objPayParams
    this.httpRequest(api$.DO_ORDER_GROUP_SUBMIT, {
      groupRecordId: params$.groupRecordId || "",
      province,
      city,
      county,
      address,
      userName,
      mobile,
      goodsId,
      note,
      skuId,
      userCouponId,
      storeId,
      productCategoryId,
      spec,
      num,
    })
      .then((res) => {
        objPayParams = res || {}
        let { timeStamp, nonceStr, packageDesc, signType, paySign } = objPayParams
        return this.paymentAmount({
          package: packageDesc,
          timeStamp,
          nonceStr,
          signType,
          paySign,
        })
      })
      .then((res) => {
        // 拼团成功 进入到拼团页面
        this.routerPush("group_details_index", objPayParams, true)
      })
      .catch((err) => {
        if (err && err.errMsg && err.errMsg.indexOf("requestPayment") > -1) {
          return this.routerPush(
            "cart_payment_index",
            { status: "error", from: "cart_confirm_index", orderType: params$.orderType, ...objPayParams },
            true,
          )
        }
        this.modalToast(err)
      })
  },
  // 普通订单提交
  handleSubmit() {
    let { objAddress, arrData, api$, params$, config$ } = this.data
    if (params$.orderType === config$.ORDER_TYPE.GROUP) {
      return this.handleGroupSubmit()
    }
    let { province, city, county, detailAddress: address, name: userName, phoneNumber: mobile } = objAddress
    let storeReqDtoList = arrData.map((store) => {
      let { storeId, goodInfoRespDtoList, couponList, note = "" } = store
      let { userCouponId = "" } = couponList.filter((item) => item.selected)[0] || {}
      return {
        storeId,
        userCouponId,
        note,
        detailReqDtoList: goodInfoRespDtoList.map((goods) => {
          let { goodsId, skuId, productCategoryId, spec, num } = goods
          return { goodsId, skuId, productCategoryId, spec, num }
        }),
      }
    })
    let objLiveParams = this.cacheGet("$$LIVE_PARAMS")
    let objPayParams
    this.httpRequest(api$.DO_ORDER_SUBMIT, {
      ...objLiveParams,
      province,
      city,
      county,
      address,
      userName,
      mobile,
      storeReqDtoList,
    })
      .then((res) => {
        objPayParams = res || {}
        let { timeStamp, nonceStr, packageDesc, signType, paySign } = objPayParams
        return this.paymentAmount({
          package: packageDesc,
          timeStamp,
          nonceStr,
          signType,
          paySign,
        })
      })
      .then((res) => {
        return this.routerPush("cart_payment_index", { status: "success", from: "cart_confirm_index" }, true)
      })
      .catch((err) => {
        if (err && err.errMsg && err.errMsg.indexOf("requestPayment") > -1) {
          return this.routerPush(
            "cart_payment_index",
            { status: "error", from: "cart_confirm_index", ...objPayParams },
            true,
          )
        }
        this.modalToast(err)
      })
  },
  countTotalAmount() {
    let { arrData } = this.data
    let numAmount = 0
    arrData.forEach((store) => {
      store.goodInfoRespDtoList.forEach((item) => {
        let price = +item.price
        let num = +item.num
        numAmount += num * price
      })
      let objCoupon = store.couponList.filter((item) => item.selected)[0]
      if (objCoupon) {
        numAmount = numAmount - +objCoupon.amount
      }
      if (store.feightFee) {
        numAmount = numAmount + +store.feightFee
      }
      if (numAmount < 0) {
        numAmount = 0
      }
    })
    this.setData({ numAmount })
  },
  reqOrderCouponInfo() {
    let { api$, params$, config$, objAddress } = this.data
    let { arrData, orderType } = params$
    let url = api$.REQ_ORDER_COUPON_INFO
    let options = {
      city: objAddress.city || "上海市",
    }
    if (orderType === config$.ORDER_TYPE.GROUP) {
      url = api$.REQ_ORDER_GROUP_COUPON_INFO
      let { goodsId, skuId, productCategoryId } = arrData[0].goodInfoRespDtoList[0]
      Object.assign(options, { goodsId, skuId, productCategoryId })
    } else {
      options.storeList = arrData.map((store) => {
        return {
          storeId: store.storeId,
          list: store.goodInfoRespDtoList.map((item) => {
            let { skuId, productCategoryId, goodsId, num } = item
            return { skuId, productCategoryId, goodsId, num }
          }),
        }
      })
    }
    this.httpRequest(url, options, {
      loading: false,
    })
      .then((res) => {
        if (orderType === config$.ORDER_TYPE.GROUP) {
          // 拼团商品
          arrData[0].couponList = res.list
          arrData[0].feightFee = res.feightFee
        } else {
          arrData.forEach((store) => {
            res.forEach((item) => {
              if (item.storeId === store.storeId) {
                store.couponList = item.couponList
                store.feightFee = item.feightFee
              }
            })
          })
        }
        this.setData({ arrData })
        this.countTotalAmount()
      })
      .toast()
  },
  reqAddressList() {
    let { api$, objAddress } = this.data
    this.httpRequest(
      api$.REQ_ADDRESS_LIST,
      {},
      {
        loading: false,
      },
    )
      .then((res) => {
        if (objAddress) {
          objAddress = res.filter((item) => item.id === objAddress.id)[0]
        }
        if (!objAddress) {
          objAddress = res.filter((item) => item.defaultStatus === 1)[0]
        }
        if (!objAddress) {
          objAddress = res[0]
        }
        this.setData({ objAddress: objAddress || "" })
      })
      .toast()
      .finally(() => {
        this.reqOrderCouponInfo()
      })
  },
})
