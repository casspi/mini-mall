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
  IMG_SOURCE: "http://101.132.140.21:8080/app/system/icon/viewIconById/",

  DO_UPLOAD: "https://vas-wap.autostreets.com/fileUpload/base64-image",
  // 文件上传
  REQ_UPLOAD_FILE: "app/system/file/upload",

  // 获取分类
  REQ_CLASSIFY_LIST: "app/drug/wtProductType/listDic",

  //所有商品
  REQ_ALL_GOODS: "app/drug/wtProduct/list",
  // 商品列表查询
  REQ_GOODS_LIST: "app/drug/wtProduct/page",
  // 商品详情
  REQ_GOODS_DETAIL: "app/drug/wtProduct/",

  // 获取分类数据
  REQ_HOME_DIC: "app/drug/wtProductType/listTopLevelDic",

  // 活动页
  REQ_ACTIVITY_ALL: "app/drug/wtActivityPage/listAll",

  // 购物车
  REQ_ADD_CART: "app/drug/wtShoppingCartRelProduct",
  // 获取购物车列表
  REQ_SHOP_CART_LIST: "app/drug/wtShoppingCartRelProduct/page",

  // 地址列表
  REQ_ADDRESS_LIST: "app/drug/wtAddress/listAll",

  // 新增地址
  DO_ADD_ADDRESS: "app/drug/wtAddress",

  // 新增处方
  REQ_ADD_PRESCRIPTION: "app/drug/wtPrescription/add",

  // 用药人
  DO_ADD_PATIENT: "app/drug/wtPatient",
  // 查询用药人
  REQ_PATIENT_LIST: "app/drug/wtPatient/listAll",
  // 查询用药人分页
  REQ_PATIENT_PAGE: "app/drug/wtPatient/page",

  // 下单
  DO_ORDER_SUBMIT: "app/drug/wtOrder/add",
  // 订单列表
  REQ_ORDER_LIST: "app/drug/wtOrder/page",

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
