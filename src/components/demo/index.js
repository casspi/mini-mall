import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {},
})
