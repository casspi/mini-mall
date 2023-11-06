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
    orderBy: "",
    numTypeIndex: 0,
    arrType: ["综合", "销量", "价格"],
  },
  methods: {
    bindCartChange() {
      this.triggerEvent("cartchange")
    },
    pagingGetUrlParamsOptions() {
      let { api$, keyword, orderBy } = this.data
      return {
        url: api$.REQ_GOODS_LIST,
        params: {
          keyword,
          orderBy,
        },
      }
    },
    handleSelectType(event) {
      let { index } = this.inputParams(event)
      let { numTypeIndex, orderBy } = this.data
      if (index === 0) {
        orderBy = ""
      } else if (index === 1) {
        orderBy = "sale desc"
      } else if (index === 2) {
        if (numTypeIndex === 2) {
          if (orderBy === "price asc") {
            orderBy = "price desc"
          } else {
            orderBy = "price asc"
          }
        } else {
          orderBy = "price asc"
        }
      }
      this.setData({ orderBy, numTypeIndex: index })
      this.setData({ arrArrData: "", numTotal: 0 })
      this.pagingRefresh()
    },
  },
})
