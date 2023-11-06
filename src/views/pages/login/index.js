//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"
import User from "wow-wx/mixins/utils/user.mixin"

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.User,
    WowPage.wow$.mixins.Modal,
  ],
  data: {
    isAgreement: false,
    phone: "",
    code: "",
    count: "",
  },
  onLoad(o) {
    console.log("decodeURIComponent", o)
    console.log(this.data)
  },
  // 获取验证码
  handleCode() {
    const { phone, code, api$ } = this.data
    console.log(phone, code)
    this.countDown()
    this.curl(api$.REQ_CODE + "?phone=" + phone, {}, { method: "post" })
      .then(() => {})
      .toast()
  },
  // 倒计时
  countDown() {
    let count = 10
    this.setData({
      count,
    })
    const timer = setInterval(() => {
      if (count > 0) {
        this.setData({
          count: --count,
        })
      } else {
        clearInterval(timer)
      }
    }, 1000)
  },
  handleLogin() {
    const { phone, code, api$ } = this.data
    this.curl(
      api$.REQ_LOGIN,
      { userId: phone, password: code, mode: "phoneCode", mac: "string" },
      {
        method: "post",
        // header: {
        //   "content-type": "application/x-www-form-urlencoded",
        // },
      },
    )
      .then((res) => {
        const { token } = res
        User.userUpdate({
          token,
        })
        this.routerRoot("home_index")
        // wx.setStorageSync("home_refresh", "1")
      })
      .toast()
  },
})
