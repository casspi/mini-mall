import "./index.json"
import "./index.wxml"
import "./index.scss"

import WowComponent from "wow-wx/lib/component"

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Input],
  externalClasses: ["class-external"],
  properties: {
    data: {
      type: Array,
      value: [],
    },
    columns: {
      type: Number,
      value: 5,
    },
    iconKey: {
      type: String,
      value: "icon",
    },
    textKey: {
      type: String,
      value: "text",
    },
  },
  methods: {
    handleSelect(event) {
      let { item, index } = this.inputParams(event)
      this.triggerEvent("select", { item, index })
    },
  },
})
