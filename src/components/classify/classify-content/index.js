import "./index.json"
import "./index.wxml"
import "./index.scss"

import WowComponent from "wow-wx/lib/component"

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Input, WowComponent.wow$.mixins.Router],
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
    storeId: {
      type: String,
      value: "",
    },
  },
  methods: {
    handleSelect(event) {
      let { item } = this.inputParams(event)
      this.routerPush("search_index", { item })
    },
  },
})
