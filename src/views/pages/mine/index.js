//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'
import DataMixin from './data.mixin'
import User from 'wow-wx/mixins/utils/user.mixin'

new WowPage({
  mixins: [DataMixin, WowPage.wow$.mixins.Router, WowPage.wow$.mixins.Jump, WowPage.wow$.mixins.Modal, WowPage.wow$.mixins.Call, WowPage.wow$.mixins.User, WowPage.wow$.mixins.Curl, WowPage.wow$.mixins.Refresh],
  data: {
    userInfo: {},
  },
  onShow() {
    this.getDetail()
    this.userGet()
      .then(
        (res) => {},
        (err) => {
          console.log('err', err)
        },
      )
      .null()
  },
  pagingRefresh(callback) {
    this.getDetail().finally(() => {
      typeof callback === 'function' && callback()
    })
  },
  getDetail() {
    const { api$ } = this.data
    return this.curl(api$.REQ_USER_INFO, {}, { method: 'get', loading: false })
      .then((res) => {
        this.setData({
          userInfo: res.user || {},
        })
      })
      .toast()
  },
  // handleCustomerService(options) {
  //   const { item } = options
  //   console.log(item, options)
  //   this.modalActionSheet(["电话客服", "在线客服"])
  //     .then((res) => {
  //       const actions = ["callService", "onlineService"]
  //       this[actions[res.tapIndex]]()
  //     })
  //     .null()
  // },
  callService() {
    const phoneNumber = '400-8882222'
    this.modalConfirm({
      content: `拨打客服电话${phoneNumber}`,
      confirmText: '确定',
      cancelText: '取消',
    })
      .then(() => {
        return this.callPhone(phoneNumber)
      })
      .finally((r) => {
        console.log('finally', r)
      })
      .null()
  },
  onlineService() {
    console.log('onlineService')
  },
  logout() {
    const { api$ } = this.data
    this.modalConfirm({
      content: `是否确定退出登录？`,
      confirmText: '确定',
      cancelText: '取消',
    })
      .then(() => {
        User.userLogout().then(() => {
          this.routerRoot('home_index')
        })
        this.curl(api$.REQ_LOGOUT, {}, { method: 'DELETE' }).then(() => {
          // User.userLogout().then(() => {
          //   this.routerRoot('home_index')
          // })
        })
      })
      .null()
  },
})
