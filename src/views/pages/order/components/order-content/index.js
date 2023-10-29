import "./index.json"
import "./index.wxml"
import "./index.scss"

import WowComponent from "wow-wx/lib/component"

new WowComponent({
  mixins: [
    WowComponent.wow$.mixins.Router,
    WowComponent.wow$.mixins.Input,
    WowComponent.wow$.mixins.Jump,
    WowComponent.wow$.mixins.Modal,
    WowComponent.wow$.mixins.Paging,
    WowComponent.wow$.mixins.Curl,
  ],
  externalClasses: ["class-external", "class-image-box", "class-image"],
  options: {
    multipleSlots: true,
  },
  properties: {
    classes: {
      type: String,
      value: "column-3",
    },
    data: {
      type: Object,
      value: "",
    },
  },
  lifetimes: {
    attached: function () {
      console.log(this.data.data)
      // 在组件实例进入页面节点树时执行
      this.pagingRefresh()
    },
  },
  methods: {
    handleCart() {
      //获取参数
      console.log(this.data.data)
      this.modalToast("已加入购物车~")
    },
    pagingGetUrlParamsOptions() {
      let { api$, data } = this.data

      return {
        url: api$.REQ_ORDER_LIST,
        params: { status: data.status },
        options: {
          useAuth: true,
          methods: "get",
        },
      }
    },
    pagingRefresh1() {
      this.setData({
        pagingNumTotal: 2,
        pagingTotal: 1,
        pagingData: [
          [
            {
              storeName: "京东大药房",
              orderDetailList: [
                {
                  pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
                },
                {
                  pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
                },
              ],
              pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
              name: "阿司匹林",
              spec: "99.00",
              price: "39g*10",
              payAmount: "39.00",
              company:
                "同年，拜耳成为股票在东京股市上市的德国工业公司。也是在这一年，拜耳在美国的所有活动由位于美国宾夕法尼亚州匹兹堡市的拜耳美国管理控股公司统一管理",
            },
            {
              storeName: "京东大药房",
              orderDetailList: [
                {
                  pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
                },
                {
                  pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
                },
              ],
              pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
              name: "阿司匹林",
              spec: "99.00",
              price: "39",
              company: "11",
            },
            {
              storeName: "京东大药房",
              orderDetailList: [
                {
                  pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
                },
                {
                  pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
                },
              ],
              pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
              name: "阿司匹林",
              spec: "99.00",
              price: "39",
              company: "11",
            },
            {
              storeName: "京东大药房",
              orderDetailList: [
                {
                  pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
                },
                {
                  pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
                },
              ],
              pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
              name: "阿司匹林",
              spec: "99.00",
              price: "39",
              company: "11",
            },
            {
              storeName: "京东大药房",
              orderDetailList: [
                {
                  pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
                },
                {
                  pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
                },
              ],
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
