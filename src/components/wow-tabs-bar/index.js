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
    handleSelect(event) {
      const { item, index: value } = this.inputParams(event)
      if (!this.data.useControl) {
        this.setData({ value })
      }
      this.triggerEvent('change', { value, option: item })
    },
  },
})
