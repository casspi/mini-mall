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
    index: 1,
  },
  properties: {
    data: {
      type: Object,
      value: {},
    },
  },
  methods: {
    handleChange(event) {
      let { current } = this.inputParams(event)
      this.setData({ index: current + 1 })
    },
  },
})
