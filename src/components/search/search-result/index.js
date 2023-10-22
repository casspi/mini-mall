import "./index.json"
import "./index.wxml"
import "./index.scss"

import WowComponent from "wow-wx/lib/component"
import DataMixin from "./data.mixin"

new WowComponent({
  mixins: [
    DataMixin,
    WowComponent.wow$.mixins.Input,
    WowComponent.wow$.mixins.Tabs,
  ],
  externalClasses: ["class-external"],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer(value) {},
    },
    keyword: {
      type: String,
      value: "",
    },
    params: {
      type: Object,
      value: "",
    },
  },
})
