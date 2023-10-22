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
    classes: {
      type: String,
      value: "border-bottom cursor-pointer",
    },
    label: {
      type: String,
      value: "左边",
    },
    value: {
      type: String,
      value: "",
    },
    iconRight: {
      type: String,
      value: "iconMore",
    },
    iconLeft: {
      type: String,
      value: "",
    },
    useRight: {
      type: Boolean,
      value: true,
    },
    useRightContent: {
      type: Boolean,
      value: true,
    },
    type: {
      type: String,
      value: "text",
    },
    maxlength: {
      type: String,
      value: "",
    },
    placeholder: {
      type: String,
      value: "",
    },
  },
  methods: {
    handleInput(event) {
      let { value } = this.inputParams(event)
      this.triggerEvent("input", { value })
    },
  },
})
