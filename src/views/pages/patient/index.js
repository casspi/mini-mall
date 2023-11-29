//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Paging,
    WowPage.wow$.mixins.Helper,
    WowPage.wow$.mixins.Pages,
    WowPage.wow$.mixins.Modal,
  ],
  data: {
    arrData: [],
    classes: 'mode-arrow',
  },
  onLoad(options) {
    this.routerGetParams(options)
    console.log(this.data.params$)
  },
  onShow() {
    let { from } = this.data.params$
    // 暂时只有
    this.setData({
      classes: from === 'prescription_index' ? 'mode-edit' : 'mode-arrow',
    })
    this.reqAddressList()
  },
  handleSelect(event) {
    // let { from } = this.data.params$
    // if (["mine_index", "merchant_index"].indexOf(from) > -1) {
    //   return null
    // }
    let { item } = this.inputParams(event)
    let objPage = this.pagesGetByIndex(1)
    if (objPage) {
      objPage.setData({ objPatient: item })
    }
    this.routerPop()
  },
  reqAddressList() {
    let { api$, params$ } = this.data
    this.curl(
      api$.REQ_PATIENT_LIST,
      {},
      {
        method: 'post',
        loading: false,
      },
    )
      .then((res) => {
        res.forEach((item) => {
          item.source = params$.source
        })
        this.setData({ arrData: res })
      })
      .toast()
  },
  addFilter() {
    const { arrData } = this.data
    if (arrData.length >= 10) {
      this.modalToast('最多添加10个，如需添加请先删除')
      return true
    }
  },
})
