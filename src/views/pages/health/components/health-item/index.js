import "./index.json"
import "./index.wxml"
import "./index.scss"

import WowComponent from "wow-wx/lib/component"

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Jump, WowComponent.wow$.mixins.Router, WowComponent.wow$.mixins.Input],
  externalClasses: ["class-external"],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    classes: {
      type: String,
      value: "health-item",
    },
    index: {
      type: Number,
      value: 0,
    },
    data: {
      type: Object,
      value: "",
    },
  },
  methods: {
    radioHandle(e) {
      const { index } = this.data
      const { value } = this.inputParams(e)
      this.triggerEvent("change", { index, value, valueKey: "value" })
    },
    textareaChange(e) {
      const { index } = this.data
      const { value } = this.inputParams(e)
      this.triggerEvent("change", { index, value, valueKey: "other" })
    },
    optionHandle(e) {
      const { index } = this.data
      const { selected, item } = this.inputParams(e)
      console.log(selected, item)
      const sIndex = selected.indexOf(item)
      sIndex === -1 ? selected.push(item) : selected.splice(sIndex, 1)
      this.triggerEvent("change", { index, value: selected, valueKey: "selected" })
    },
  },
})
