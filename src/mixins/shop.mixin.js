export default {
  data: {
    shopTotal$: "",
  },
  reqShopCartTotal() {
    console.log("api$.REQ_SHOP_CART_TOTAL")

    let { api$ } = this.data
    let number = 33 || 0
    let text = number > 99 ? "..." : number <= 0 ? "" : `${number}`
    this.setData({ shopTotal$: { text, number } })
    this.tabBarBadgeShow({ index: 2, text }).null()
    this.curl(
      api$.REQ_SHOP_CART_TOTAL,
      {},
      {
        useAuth: true,
        loading: false,
      },
    )
      .then((res) => {
        let number = +res.total || 0
        let text = number > 99 ? "..." : number <= 0 ? "" : `${number}`
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
