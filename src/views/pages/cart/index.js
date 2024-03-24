import './index.json'
import './index.wxml'
import './index.scss'

import WowPage from 'wow-wx/lib/page'

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
    // WowPage.wow$.mixins.Loadmore,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.Tabbar,
    WowPage.wow$.mixins.Goods,
  ],
  data: {
    isNullLoading: true,
    isAllSelected: false, // 是否全部选择
    numAmount: 0, // 总金额分
  },
  onLoad() {
    this.userGet().finally(() => {
      this.setData({ isNullLoading: false })
    })
  },
  onShow() {
    // 更新登录态
    this.userGet()
    this.handleRefresh(this.judgeItemSelect)
    this.reqShopCartTotal()
  },
  pagingRefreshHandle({ detail }) {
    this.pagingRefresh(false, () => {
      this.judgeItemSelect()
      const { callback } = detail
      callback && callback()
    })
  },
  handleRefresh(cb) {
    this.pagingRefresh(false, cb)
  },
  pagingGetUrlParamsOptions({ pagingIndex }) {
    //刷新列表，需要滚动到顶部
    if (pagingIndex === 1) {
      const refWowScroll = this.selectComponent('#wowScroll')
      if (refWowScroll) {
        refWowScroll.returnTop()
      }
    }
    const { api$ } = this.data
    return {
      url: api$.REQ_SHOP_CART_LIST,
      options: {
        useAuth: true,
        method: 'post',
        loading: false,
      },
    }
  },
  pagingFormatResult(res) {
    if (res && Array.isArray(res.dataList)) {
      res.dataList = res.dataList.map((item) => {
        const { id: wtProductId, ...wtProduct } = item.wtProduct || {}
        if (wtProductId) {
          item = { ...item, wtProductId, ...wtProduct }
          delete item.wtProduct
        }
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
    this.setData({ [`pagingData[${arrindex}][${index}].selected`]: !pagingData[arrindex][index].selected })
    this.judgeItemSelect()
  },
  judgeItemSelect() {
    let { pagingData = [] } = this.data
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
    if (this.judgeGoods(arrArrResult)) return
    this.routerPush('cart_confirm_index', { arrData: arrArrResult })
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
      return this.modalToast('还未勾选商品哦')
    }
    this.modalConfirm(`确认移出这${arrData.length}件宝贝么？`)
      .then(() => {
        return this.curl(api$.REQ_ADD_CART + '?idList=' + arrData, {}, { method: 'DELETE' })
      })
      .then(() => {
        this.handleRefresh(this.judgeItemSelect)
        this.reqShopCartTotal()
        this.modalToast('删除成功')
      })
      .toast()
  },
  handleCountNumber(event) {
    let { pagingData, api$ } = this.data
    let { arrindex, index, number } = this.inputParams(event)
    console.log(arrindex, index, number)
    let { productCount, productId, price, shoppingCartId, id } = pagingData[arrindex][index]
    productCount = +productCount + number
    if (productCount <= 0) {
      return null
    }
    this.curl(
      api$.REQ_ADD_CART,
      {
        productId,
        productCount,
        shoppingCartId,
        id,
      },
      {
        method: 'put',
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
