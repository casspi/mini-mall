export default {
  data: {
    shopTotal$: '',
  },
  reqShopCartTotal() {
    let { api$ } = this.data
    this.curl(
      api$.REQ_SHOP_CART_LIST,
      {},
      {
        useAuth: true,
        loading: false,
      },
    )
      .then((res) => {
        let number = res.total || 0
        let text = number > 99 ? '...' : number <= 0 ? '' : `${number}`
        console.log('resresres', res, number, text)
        this.setData({ shopTotal$: { text, number } })
        if (text) {
          if (this.tabBarBadgeShow) {
            this.tabBarBadgeShow({ index: 2, text }).null()
          }
        } else {
          if (this.tabBarBadgeHide) {
            this.tabBarBadgeHide({ index: 2 }).null()
          }
        }
      })
      .toast()
  },
}
