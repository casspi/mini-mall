import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Config, WowComponent.wow$.mixins.Jump, WowComponent.wow$.mixins.Router, WowComponent.wow$.mixins.Input, WowComponent.wow$.mixins.Modal, WowComponent.wow$.mixins.Curl],
  externalClasses: ['class-external'],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    data: {
      type: Object,
      value: '',
    },
    status: {
      type: Number,
      value: '',
    },
    from: {
      type: String,
      value: '',
    },
  },
  methods: {
    handleConfirmReceived() {
      let { data, api$ } = this.data
      this.modalConfirm(`确认已收货？`)
        .then(() => {
          return this.curl(
            api$.REQ_RECEIPT_ORDER,
            {
              id: data.id,
            },
            { method: 'put' },
          )
        })
        .then(() => {
          this.modalToast('收货成功')
          this.triggerEvent('refresh')
        })
        .toast()
    },
    handleReturn() {
      let { data, api$ } = this.data
      this.triggerEvent('return', data)
    },
    handleDiagnosis() {
      let { data, api$ } = this.data
      this.triggerEvent('diagnosis', data)
    },
    handleOrder() {
      let { data, api$ } = this.data
      this.triggerEvent('order', data)
    },
  },
})
