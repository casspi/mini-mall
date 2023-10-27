import "./index.json"
import "./index.wxml"
import "./index.scss"

import WowComponent from "wow-wx/lib/component"
console.log(WowComponent.wow$.mixins.Config)
new WowComponent({
  mixins: [
    WowComponent.wow$.mixins.Config,
    WowComponent.wow$.mixins.Jump,
    WowComponent.wow$.mixins.Router,
    WowComponent.wow$.mixins.Input,
    WowComponent.wow$.mixins.Modal,
    WowComponent.wow$.mixins.Curl,
  ],
  externalClasses: ["class-external"],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    data: {
      type: Object,
      value: "",
    },
    status: {
      type: String,
      value: "",
    },
    from: {
      type: String,
      value: "",
    },
  },
  attached: function () {
    console.log("attached", this.data.config$, this.data.data)
  },
  methods: {
    handleConfirmReceived() {
      let { data, api$ } = this.data
      this.modalConfirm(`确认已收货？`)
        .then(() => {
          return this.curl(api$.DO_ORDER_CONFIRM, {
            orderId: data.orderId,
          })
        })
        .then(() => {
          this.modalToast("收货成功")
          this.triggerEvent("refresh")
        })
        .toast()
    },
    handleReturn() {
      let { data, api$ } = this.data
      console.log(data, api$)
    },
  },
})
