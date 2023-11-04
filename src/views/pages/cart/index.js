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
  },
  onShow() {
    this.handleRefresh()
    this.reqShopCartTotal()
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
  pagingFormatResult(res) {
    if (res && Array.isArray(res.dataList)) {
      res.dataList = res.dataList.map((item) => {
        item = { ...item, ...item.wtProduct }
        delete item.wtProduct
        return item
      })
    }
    return res
  },
  handleAllSelect() {
    let { isAllSelected, pagingData } = this.data
    isAllSelected = !isAllSelected
    pagingData.forEach((arrItem) => {
      arrItem.forEach((item) => {
        item.selected = isAllSelected
      })
    })
    this.setData({ isAllSelected, pagingData })
    this.judgeItemSelect()
  },
  handleItemSelect(event) {
    let { arrindex, index } = this.inputParams(event)
    let { pagingData } = this.data
    console.log(arrindex, index, pagingData, pagingData[arrindex][index])
    this.setData({ [`pagingData[${arrindex}][${index}].selected`]: !pagingData[arrindex][index].selected })
    this.judgeItemSelect()
  },
  judgeItemSelect() {
    let { pagingData } = this.data
    let numAmount = 0
    let isAllSelected = true
    if (!pagingData.length) {
      isAllSelected = false
    }
    pagingData.forEach((arrItem) => {
      arrItem.forEach((item) => {
        let { productCount, price, selected } = item
        if (selected) {
          numAmount += +productCount * +price
        } else {
          isAllSelected = false
        }
        if (numAmount < 0) {
          numAmount = 0
        }
      })
    })

    this.setData({ numAmount, isAllSelected, pagingData })
  },
  handleSubmit() {
    let { numAmount, pagingData } = this.data
    if (!numAmount) {
      return null
    }
    let arrArrResult = []
    pagingData.forEach((arrItem) => {
      arrItem.forEach((item) => {
        if (item.selected) arrArrResult.push(item)
      })
    })
    this.routerPush("cart_confirm_index", { arrData: arrArrResult, numAmount: 1 })
  },
  handleDelete() {
    let { pagingData, api$ } = this.data
    let arrData = []
    pagingData.forEach((arrItem) => {
      arrItem.forEach((item) => {
        if (item.selected) {
          arrData.push(item.id)
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
    let { arrindex, index, number } = this.inputParams(event)
    console.log(arrindex, index, number)
    let { productCount, productId, price } = pagingData[arrindex][index]
    productCount = +productCount + number
    if (productCount <= 0) {
      return null
    }
    this.curl(
      api$.REQ_ADD_CART,
      {
        productId,
        productCount,
        productPrice: price,
      },
      {
        method: "put",
      },
    )
      .then(() => {
        this.setData({
          [`pagingData[${arrindex}][${index}].productCount`]: productCount,
        })
        this.judgeItemSelect()
      })
      .toast()
  },
})
