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
}
