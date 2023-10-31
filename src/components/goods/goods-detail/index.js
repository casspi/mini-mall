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
  data: {
    index: 0,
  },
  properties: {
    data: {
      type: Object,
      value: {},
    },
  },
  methods: {
    handleChange(event) {
      let { index } = this.inputParams(event)
      this.setData({ index })
    },
  },
})
