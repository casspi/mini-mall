import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Input, WowComponent.wow$.mixins.Image, WowComponent.wow$.mixins.Curl],
  externalClasses: ['class-external'],
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
    handlePreview(event) {
      const { api$ } = this.data
      let { index, item } = this.inputParams(event)
      const urls = item.map((o) => api$.IMAGE_BASE_URL + o.imagePath)
      console.log(urls, index)
      this.imagePreview({
        current: urls[index],
        urls,
      }).toast()
    },
  },
})
