const config = {
  // 订单状态
  ORDER_STATUS: {
    UN_PAY: "0", // 待付款
    SEND: "1", // 待收货
    SUCCESS: "2", // 订单完成
    // UN_SEND: "2", // 待发货
    // CLOSE: "5", // 关闭
    // UN_COMMENT: "6", // 待评价
  },
  // 订单对应的文案
  ORDER_STATUS_TIP: {
    0: "待付款",
    1: "待收货",
    2: "已完成",
    // 2: "待发货",
    // 5: "已取消",
    // 6: "待评价",
  },
}

for (let k in config) {
  let item = config[k]
  if (item.options) {
    const valueByKey = {}
    const labelByValue = {}
    item.options.forEach((it) => {
      let { key, label, value } = it
      valueByKey[key] = value
      labelByValue[value] = label
    })
    Object.assign(item, { valueByKey, labelByValue })
  }
}

export default {
  data: {
    config$: config,
  },
}
