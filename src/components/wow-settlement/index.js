import "./index.json"
import "./index.wxml"
import "./index.scss"

import WowComponent from "wow-wx/lib/component"

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Input],
  externalClasses: ["class-external"],
  options: {
    multipleSlots: true,
  },
  properties: {
    buttonText: {
      type: String,
      value: "下单",
    },
    amount: {
      type: String,
      value: "0",
    },
    disabled: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    handleClick() {
      if (this.data.disabled) {
        return null
      }
      this.triggerEvent("click")
    },
  },
})
