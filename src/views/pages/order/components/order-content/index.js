import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  mixins: [
    WowComponent.wow$.mixins.User,
    WowComponent.wow$.mixins.Router,
    WowComponent.wow$.mixins.Input,
    WowComponent.wow$.mixins.Jump,
    WowComponent.wow$.mixins.Modal,
    WowComponent.wow$.mixins.Paging,
    WowComponent.wow$.mixins.Curl,
    WowComponent.wow$.mixins.Payment,
  ],
  externalClasses: ['class-external', 'class-image-box', 'class-image'],
  options: {
    multipleSlots: true,
  },
  properties: {
    classes: {
      type: String,
      value: 'column-3',
    },
    isShow: {
      type: Boolean,
      value: false,
      observer(value) {
        if (value) {
          this.pagingRefresh()
        }
      },
    },
    data: {
      type: Object,
      value: '',
    },
  },
  data: {
    reason: '',
  },
  pageLifetimes: {
    show() {
      if (this.data.isShow) {
        this.pagingRefresh()
      }
    },
  },
  methods: {
    handleCart() {
      //获取参数
      console.log(this.data.data)
      this.modalToast('已加入购物车~')
    },
    pagingGetUrlParamsOptions() {
      let { api$, data } = this.data
      return {
        url: api$.REQ_ORDER_LIST,
        params: { orderStatus: data.status, createUser: true },
        options: {
          useAuth: true,
          methods: 'get',
        },
      }
    },
    handlePayment(event) {
      let item = this.inputParams(event)
      let { api$ } = this.data
      this.userLogin()
        .then((wxCode) => {
          return this.curl(api$.DO_PAY + `${item.id}/${wxCode}`, {}, { loading: true })
        })
        .then((res) => {
          let { payParamJson } = res || {}
          return this.paymentRequest(JSON.parse(payParamJson))
        })
        .then(() => {
          this.modalToast('支付成功')
          this.pagingRefresh()
          // return this.routerPush('payment_index', { status: 'success' }, true)
        })
        .catch((err) => {
          if (err && err.errMsg && err.errMsg.indexOf('requestPayment') > -1) {
            this.modalToast('取消付款')
          } else {
            this.modalToast('支付失败')
          }
        })
    },
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
          this.pagingRefresh()
        })
        .toast()
    },
  },
})
