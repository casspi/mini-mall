export const isProd = (() => {
  let result = true
  try {
    if (wx.getAccountInfoSync) {
      const accountInfo = wx.getAccountInfoSync()
      const { envVersion } = accountInfo.miniProgram
      // develop trial release
      if (["develop", "trial"].includes(envVersion)) {
        result = false
      }
    }
  } catch (e) {
    /* empty */
  }
  return result
})()

export default {
  H5_BASE_URL: isProd ? "" : "",
  // 商品列表查询
  REQ_GOODS_LIST: "api/product/query/list",

  // 获取分类数据

  //获取购物车数据
  REQ_SHOP_CART_TOTAL: "api/shop/cart/total",
  REQ_SHOP_CART_LIST: "api/shop/cart/list",

  // 个人中心

  // 隐私政策
  PRIVACY_POLICY: "https://www.baidu.com",
  // 用户协议
  USER_AGREEMENT: "https://www.taobao.com",
}
