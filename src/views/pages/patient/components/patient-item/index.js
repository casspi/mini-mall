import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Jump, WowComponent.wow$.mixins.Router, WowComponent.wow$.mixins.Input],
  externalClasses: ['class-external'],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    isDefault: {
      type: Boolean,
      value: false,
    },
    classes: {
      type: String,
      value: 'mode-edit',
    },
    data: {
      type: Object,
      value: '',
    },
    currentId: {
      type: String,
      value: '',
    },
    tips: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    handleItemSelect() {
      this.triggerEvent('select')
    },
  },
})
