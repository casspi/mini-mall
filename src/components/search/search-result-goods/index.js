import "./index.json"
import "./index.wxml"
import "./index.scss"

import WowComponent from "wow-wx/lib/component"

new WowComponent({
  mixins: [
    WowComponent.wow$.mixins.Http,
    WowComponent.wow$.mixins.Input,
    WowComponent.wow$.mixins.Paging,
  ],
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
      let { api$, keyword, orderByType, params } = this.data
      return {
        url: api$.REQ_GOODS_LIST,
        params: {
          key: keyword,
          orderByType,
          storeId: params.storeId || "",
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
        if (numTypeIndex === 1) {
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
    pagingRefresh() {
      this.setData({
        pagingNumTotal: 2,
        pagingTotal: 1,
        pagingData: [
          [
            {
              pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
              name: "阿司匹林",
              spec: "99.00",
              price: "39g*10",
              company:
                "同年，拜耳成为股票在东京股市上市的德国工业公司。也是在这一年，拜耳在美国的所有活动由位于美国宾夕法尼亚州匹兹堡市的拜耳美国管理控股公司统一管理",
            },
            {
              pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
              name: "阿司匹林",
              spec: "99.00",
              price: "39",
              company: "11",
            },
            {
              pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
              name: "阿司匹林",
              spec: "99.00",
              price: "39",
              company: "11",
            },
            {
              pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
              name: "阿司匹林",
              spec: "99.00",
              price: "39",
              company: "11",
            },
            {
              pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
              name: "阿司匹林",
              spec: "99.00",
              price: "39",
              company: "11",
            },
          ],
        ],
        pagingIndex: 1,
      })
    },
  },
})
