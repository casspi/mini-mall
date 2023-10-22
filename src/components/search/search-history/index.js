import "./index.json"
import "./index.wxml"
import "./index.scss"

import WowComponent from "wow-wx/lib/component"

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Input],
  externalClasses: ["class-external"],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    data: {
      type: Array,
      value: "",
    },
  },
  methods: {
    handleKeyword(event) {
      let { item: keyword } = this.inputParams(event)
      this.triggerEvent("keyword", { keyword })
    },
  },
})
