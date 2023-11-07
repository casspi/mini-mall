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
    WowComponent.wow$.mixins.Paging,
    WowComponent.wow$.mixins.Curl,
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
  data: {
    reason: "",
  },
  lifetimes: {
    attached: function () {
      console.log(this.data.data)
      // 在组件实例进入页面节点树时执行
      this.pagingRefresh()
    },
  },
  methods: {
    handleCart() {
      //获取参数
      console.log(this.data.data)
      this.modalToast("已加入购物车~")
    },
    pagingGetUrlParamsOptions() {
      let { api$, data } = this.data
      return {
        url: api$.REQ_ORDER_LIST,
        params: { orderStatus: data.status },
        options: {
          useAuth: true,
          methods: "get",
        },
      }
    },
    handleReturn(data) {
      let { api$, reason } = this.data
      console.log(data)
      return this.selectComponent("#refWowModal")
        .show()
        .then((res) => {
          console.log(reason)
        })
    },
  },
})
