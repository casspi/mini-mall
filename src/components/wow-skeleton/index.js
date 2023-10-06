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
    error: {
      type: String,
      value: '',
    },
    errorBtnText: {
      type: String,
      value: '重 试',
    },
    isLoading: {
      type: Boolean,
      value: true,
    },
    paddingBottom: {
      type: String,
      value: '80',
    },
    emptyPrompt: {
      type: String,
      value: '暂无数据~',
    },
  },
})
