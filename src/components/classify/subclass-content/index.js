import "./index.json"
import "./index.wxml"
import "./index.scss"

import WowComponent from "wow-wx/lib/component"

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Curl, WowComponent.wow$.mixins.Paging],
  externalClasses: ["class-external"],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    params: {
      type: Object,
      value: "",
    },
    isShow: {
      type: Boolean,
      value: false,
      observer(value) {
        if (value && this.data.total === -1) {
          this.pagingRefresh()
        }
      },
    },
  },
  methods: {
    getUrlParamsOptions() {
      let { api$, params } = this.data
      return {
        url: api$.REQ_GOODS_LIST_BY_CLASSIFY,
        params: {
          categoryId: params.id,
        },
      }
    },
  },
})
