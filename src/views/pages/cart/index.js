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
  },
  onShow() {
    this.handleRefresh()
  },
  handleRefresh(cb) {
    this.pagingRefresh(cb)
  },
  pagingGetUrlParamsOptions() {
    const { api$ } = this.data
    return {
      url: api$.REQ_SHOP_CART_LIST,
      options: {
        useAuth: true,
        method: "post",
        loading: false,
      },
    }
  },
  handleAllSelect() {
    let { isAllSelected, pagingData } = this.data
    isAllSelected = !isAllSelected
    pagingData.forEach((item) => {
      item.selected = isAllSelected
    })
    this.setData({ isAllSelected, pagingData })
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
    pagingData.forEach((item) => {
      let { num, price, selected } = item
      if (selected) {
        numAmount += +num * +price
      } else {
        isAllSelected = false
      }
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
    let { index, number } = this.inputParams(event)
    let { num, cartItemId } = pagingData[index]
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
          [`pagingData[${index}][num]`]: num,
        })
        this.judgeItemSelect()
      })
      .toast()
  },
})
