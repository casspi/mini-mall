import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Input],
  externalClasses: ['class-external'],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    data: {
      type: Array,
      value: [],
    },
    key: {
      type: String,
      value: 'label',
    },
    index: {
      type: Number,
      value: 0,
    },
    useScroll: {
      type: Boolean,
      value: false,
    },
    classes: {
      type: String,
      value: '',
    },
  },
  methods: {
    handleChange(event) {
      let { index } = this.inputParams(event)
      this.triggerEvent('change', {
        index,
        callback: () => this.setData({ index }),
      })
    },
  },
})
