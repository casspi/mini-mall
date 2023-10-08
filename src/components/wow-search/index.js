import "./index.json"
import "./index.wxml"
import "./index.scss"

import WowComponent from "wow-wx/lib/component"

new WowComponent({
  externalClasses: ["class-external"],
  options: {
    addGlobalClass: true,
  },
  properties: {
    classes: {
      type: String,
      value: "",
    },
    placeholder: {
      type: String,
      value: "",
    },
  },
})
