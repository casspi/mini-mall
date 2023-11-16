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
  data: {
    visible: false,
    content: '',
  },
  properties: {
    classes: {
      type: String,
      value: '',
    },
    overlayClose: {
      type: Boolean,
      value: false,
    },
    isShow: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: '温馨提示',
    },
    sureText: {
      type: String,
      value: '确认',
    },
    cancelText: {
      type: String,
      value: '取消',
    },
    openType: {
      type: String,
      value: '',
    },
    showCancel: {
      type: Boolean,
      value: true,
    },
  },
  methods: {
    handledOverlay() {
      if (this.data.overlayClose) {
        this.hide(true)
      }
    },
    show(options = {}) {
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
        this.setData({ visible: true, ...options })
      })
    },
    hide(forced) {
      if (forced !== true && this.data.beforeClose) {
        return this.data.beforeClose('cancel', () => this.hide(true))
      }
      if (this.reject) this.reject()
      this.setData({ visible: false })
      this.triggerEvent('cancel')
    },
    handleConfirm(event) {
      if (this.data.beforeClose) {
        return this.data.beforeClose('confirm', () => this.confirm(event))
      }
      this.confirm(event)
    },
    confirm(event) {
      const data = this.inputParams(event)
      if (this.resolve) {
        this.reject = null
        this.resolve(data)
      }
      this.triggerEvent('confirm', data)
      this.setData({ visible: false })
    },
  },
})
