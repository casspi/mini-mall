import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Input],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    key: {
      type: String,
      value: '',
    },
    tabs: {
      type: Array,
      value: [],
    },
    value: {
      type: Number,
      value: '',
    },
    useControl: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    handleChange(event) {
      let { current, value } = this.inputParams(event)
      if (typeof value === 'undefined') value = current
      const { tabs, useControl } = this.data
      if (!useControl) {
        this.setData({ value })
      }
      this.triggerEvent('change', { value, option: tabs[value] })
    },
  },
})
