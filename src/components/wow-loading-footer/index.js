import "./index.json"
import "./index.wxml"
import "./index.scss"

import WowComponent from "wow-wx/lib/component"

new WowComponent({
  externalClasses: ["class-external"],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    prompt: {
      type: String,
      value: "",
    },
    isLoading: {
      type: Boolean,
      value: true,
    },
  },
})
