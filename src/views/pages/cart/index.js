import "./index.json"
import "./index.wxml"
import "./index.scss"

import WowPage from "wow-wx/lib/page"

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.User,
    WowPage.wow$.mixins.Shop,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Paging,
    WowPage.wow$.mixins.Refresh,
    WowPage.wow$.mixins.Loadmore,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.Tabbar,
  ],
  data: {
    isNullLoading: true,
    isAllSelected: false, // 是否全部选择
    numAmount: 0, // 总金额分
  },
  onLoad() {
    console.log("cart onShow")
    this.userGet().finally(() => {
      this.setData({ isNullLoading: false })
    })
    this.reqShopCartTotal()
    this.pagingRefresh()
  },
  pagingReqDataList(callback) {
    this.setData({ isLoading: true })
    this.setData({
      pagingNumTotal: 2,
      pagingTotal: 1,
      pagingData: [
        {
          storeName: "京东大药房",
          name: "阿司匹林",
          num: 1,
          spec: "99.00",
          price: "39g*10",
          payAmount: "39.00",
          pic: "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
        },
      ],
      pagingIndex: 1,
    })
    let { api$, pageIndex, count, pagingData, isAllSelected, pagingNumTotal } = this.data
    this.curl(
      api$.REQ_SHOP_CART_LIST,
      {
        pageIndex,
        count,
      },
      {
        useAuth: true,
        loading: false,
      },
    )
      .then((res) => {
        let { total = 0, list = [] } = res || {}
        let length = 0
        list.forEach((item) => {
          item.selected = isAllSelected
          length += item.goodInfoRespDtoList.length
          item.goodInfoRespDtoList.forEach((item) => {
            item.selected = isAllSelected
          })
        })
        if (pageIndex === 1) {
          pagingData = list
          pagingNumTotal = 0
        } else {
          pagingData = this.formatData(pagingData, list)
        }
        pagingNumTotal += length
        this.setData({
          pagingData,
          pagingNumTotal,
          pagingTotal: total,
        })
        this.judgeItemSelect()
      })
      .toast()
      .finally(() => {
        this.setData({ isLoading: false })
        typeof callback === "function" && callback()
      })
  },
  formatData(arr, list) {
    if (list.length) {
      if (arr[0].storeId === list[0].storeId) {
        arr[0].goodInfoRespDtoList.push(...list[0].goodInfoRespDtoList)
        list.shift()
      }
      arr = [...arr, ...list]
    }
    return arr
  },
  handleAllSelect() {
    let { isAllSelected, pagingData } = this.data
    isAllSelected = !isAllSelected
    pagingData.forEach((store) => {
      store.selected = isAllSelected
      store.goodInfoRespDtoList.forEach((item) => {
        item.selected = isAllSelected
      })
    })
    this.setData({ isAllSelected, pagingData })
    this.judgeItemSelect()
  },
  handleStoreSelect(event) {
    let { index } = this.inputParams(event)
    let { pagingData } = this.data
    let isSelected = !pagingData[index].selected
    pagingData[index].goodInfoRespDtoList.forEach((item) => {
      item.selected = isSelected
    })
    this.setData({ pagingData })
    this.judgeItemSelect()
  },
  handleItemSelect(event) {
    let { store: storeIndex, index } = this.inputParams(event)
    let { pagingData } = this.data
    pagingData[storeIndex].goodInfoRespDtoList[index].selected =
      !pagingData[storeIndex].goodInfoRespDtoList[index].selected
    this.setData({ pagingData })
    this.judgeItemSelect()
  },
  judgeItemSelect() {
    let { pagingData } = this.data
    let numAmount = 0
    let isAllSelected = true
    if (!pagingData.length) {
      isAllSelected = false
    }
    pagingData.forEach((store) => {
      let isStoreSelected = true
      store.goodInfoRespDtoList.forEach((item) => {
        let { num, price, selected } = item
        if (selected) {
          numAmount += +num * +price
        } else {
          isStoreSelected = false
          isAllSelected = false
        }
      })
      store.selected = isStoreSelected
      if (numAmount < 0) {
        numAmount = 0
      }
    })
    this.setData({ numAmount, isAllSelected, pagingData })
  },
  handleSubmit() {
    let { numAmount, pagingData } = this.data
    if (!numAmount) {
      return null
    }
    let arrArrResult = pagingData.filter((store) => {
      store.goodInfoRespDtoList = store.goodInfoRespDtoList.filter((item) => item.selected)
      return !!store.goodInfoRespDtoList.length
    })
    this.routerPush("cart_confirm_index", { arrData: arrArrResult, numAmount })
  },
  handleDelete() {
    let { pagingData, api$ } = this.data
    let arrData = []
    pagingData.forEach((store) => {
      store.goodInfoRespDtoList.forEach((item) => {
        if (item.selected) {
          arrData.push(item.cartItemId)
        }
      })
    })
    if (!arrData.length) {
      return this.modalToast("还未勾选商品哦")
    }
    this.modalConfirm(`确认移出这${arrData.length}件宝贝么？`)
      .then(() => {
        return this.curl(api$.DO_SHOP_CART_DELETE, {
          cartItemIdList: arrData,
        })
      })
      .then(() => {
        this.pagingRefresh()
        this.reqShopCartTotal()
        this.modalToast("删除成功")
      })
      .toast()
  },
  handleCountNumber(event) {
    let { pagingData, api$ } = this.data
    let { storeindex: storeIndex, index, number } = this.inputParams(event)
    let { num, cartItemId } = pagingData[storeIndex].goodInfoRespDtoList[index]
    num = +num + number
    if (num <= 0) {
      return null
    }
    this.curl(api$.DO_SHOP_CART_UPDATE, {
      cartItemId,
      num,
    })
      .then(() => {
        this.setData({
          [`pagingData[${storeIndex}].goodInfoRespDtoList[${index}].num`]: num,
        })
        this.judgeItemSelect()
      })
      .toast()
  },
})
