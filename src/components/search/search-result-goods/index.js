import "./index.json"
import "./index.wxml"
import "./index.scss"

import WowComponent from "wow-wx/lib/component"

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Curl, WowComponent.wow$.mixins.Input, WowComponent.wow$.mixins.Paging],
  externalClasses: ["class-external"],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer(value) {},
    },
    keyword: {
      type: String,
      value: "",
      observer(value, ov) {
        console.log("observer, keyword", value, ov)
        if (value && this.data.pagingTotal === -1) {
          this.pagingRefresh()
        }
      },
    },
    params: {
      type: Object,
      value: "",
    },
  },
  data: {
    orderByType: "",
    numTypeIndex: 0,
    arrType: ["综合", "销量", "价格"],
  },
  methods: {
    pagingGetUrlParamsOptions() {
      let { api$, keyword, orderByType } = this.data
      return {
        url: api$.REQ_GOODS_LIST,
        params: {
          key: keyword,
          orderByType,
        },
      }
    },
    handleSelectType(event) {
      let { index } = this.inputParams(event)
      let { numTypeIndex, orderByType } = this.data
      if (index === 0) {
        orderByType = ""
      } else if (index === 1) {
        orderByType = "SALE"
      } else if (index === 2) {
        if (numTypeIndex === 2) {
          if (orderByType === "PRICE_ASC") {
            orderByType = "PRICE_DESC"
          } else {
            orderByType = "PRICE_ASC"
          }
        } else {
          orderByType = "PRICE_ASC"
        }
      }
      this.setData({ orderByType, numTypeIndex: index })
      this.setData({ arrArrData: "", numTotal: 0 })
      this.pagingRefresh()
    },
  },
})
