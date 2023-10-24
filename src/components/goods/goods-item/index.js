import "./index.json"
import "./index.wxml"
import "./index.scss"

import WowComponent from "wow-wx/lib/component"

new WowComponent({
  mixins: [
    WowComponent.wow$.mixins.Router,
    WowComponent.wow$.mixins.Input,
    WowComponent.wow$.mixins.Jump,
    WowComponent.wow$.mixins.Modal,
  ],
  externalClasses: ["class-external", "class-image-box", "class-image"],
  options: {
    multipleSlots: true,
  },
  properties: {
    classes: {
      type: String,
      value: "column-3",
    },
    data: {
      type: Object,
      value: "",
    },
  },
  methods: {
    handleCart() {
      //获取参数
      console.log(this.data.data)
      this.modalToast("已加入购物车~")
      // eslint-disable-next-line no-undef
      var appInstance = getApp()
      appInstance.globalData.cart.push(this.data.data)
      appInstance.setCartTabBarBadge()
    },
  },
})
