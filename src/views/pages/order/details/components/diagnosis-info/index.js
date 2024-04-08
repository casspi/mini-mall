import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  mixins: [
    WowComponent.wow$.mixins.Config,
    WowComponent.wow$.mixins.Jump,
    WowComponent.wow$.mixins.Router,
    WowComponent.wow$.mixins.Input,
    WowComponent.wow$.mixins.Modal,
    WowComponent.wow$.mixins.Curl,
    WowComponent.wow$.mixins.Image,
  ],
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
  },
  methods: {
    // 预览处方
    handlePreviewPrescription() {
      const { data } = this.data
      this.imagePreview({ urls: [data.dstFilePath] })
    },
  },
})
