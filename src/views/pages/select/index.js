//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'
import DataMixin from './data.mixin'
import Tools from 'src/mixins/tools.mixin'

new WowPage({
  mixins: [DataMixin, WowPage.wow$.mixins.Router, WowPage.wow$.mixins.Config, WowPage.wow$.mixins.Input, WowPage.wow$.mixins.Page, WowPage.wow$.mixins.Modal, Tools],
  onLoad(o) {
    this.routerGetParams(o)
    const { title, value } = this.data.params$
    wx.setNavigationBarTitle({ title })
    this.setData(
      {
        value: value || [],
      },
      () => {
        this.renderSelected()
      },
    )
  },
  itemHandle(event) {
    const { item } = this.inputParams(event)
    let { params$, value } = this.data
    if (params$.multiple) {
      if (value.find((o) => o.value === item.value)) {
        value = value.filter((o) => o.value !== item.value)
      } else {
        value.push(item)
      }
    } else {
      value = [item]
    }
    this.setData(
      {
        value,
      },
      () => {
        this.renderSelected()
      },
    )
  },
  handleConfirm() {
    const { params$, value } = this.data
    console.log('params$', params$)
    const { confirm, key } = params$
    const refPage = this.pagesGetByIndex(1)
    console.log(refPage.setData)
    if (refPage) {
      if (confirm && refPage[confirm]) {
        refPage[confirm]({ ...params$, value: value.length ? value : '' })
      } else {
        refPage.setData({
          [`${key}.value`]: value.length ? value : '',
        })
      }
    }
    this.routerPop()
  },
  renderSelected() {
    const { params$, value } = this.data
    if (!params$.multiple) return
    const res = Tools.pickByKey(params$.options, value, 'value').map((item) => item.label)
    this.setData({
      selectedText: res.length ? res.join(',') : '',
    })
  },
})
