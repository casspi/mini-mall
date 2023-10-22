import "./index.json"
import "./index.wxml"
import "./index.scss"

import WowComponent from "wow-wx/lib/component"

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Http, WowComponent.wow$.mixins.Paging],
  externalClasses: ["class-external"],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer(value) {
        if (value && this.data.total === -1) {
          this.handleRefresh()
        }
      },
    },
    keyword: {
      type: String,
      value: "",
    },
  },
  methods: {
    getUrlParamsOptions() {
      let { api$, keyword } = this.data
      return {
        url: api$.REQ_SPECIAL_LIST,
        params: {
          key: keyword,
        },
      }
    },
  },
})
