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

  // 获取分类
  REQ_CLASSIFY_LIST: "app/drug/wtProductType/listDic",

  // 商品列表查询
  REQ_GOODS_LIST: "app/drug/wtProduct/page",

  // 获取分类数据

  //获取购物车数据
  REQ_SHOP_CART_TOTAL: "api/shop/cart/total",

  REQ_SHOP_CART_LIST: "wtShoppingCartRelProduct/list",

  // 地址列表
  REQ_ADDRESS_LIST: "wtAddress/list",

  // 订单列表
  REQ_ORDER_LIST: "wtOrder",

  // 获取手机号验证码
  REQ_CODE: "app/system/phone/sendCode",
  // 登录
  REQ_LOGIN: "login",
  // 获取用户信息
  REQ_USER_INFO: "user/info",

  // 隐私政策
  PRIVACY_POLICY: "https://www.baidu.com",
  // 用户协议
  USER_AGREEMENT: "https://www.taobao.com",
}
