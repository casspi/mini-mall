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
    data: {
      type: Array,
      value: [],
    },
    numCurrIndex: {
      type: Number,
      value: 0,
    },
  },
  methods: {
    handleTap(event) {
      let { index, item } = this.inputParams(event)
      this.triggerEvent("change", { index, item })
    },
  },
})
