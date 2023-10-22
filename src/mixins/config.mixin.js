const config = {
  // 订单状态
  ORDER_STATUS: {
    UN_PAY: "1", // 待付款
    UN_SEND: "2", // 待发货
    SEND: "3", // 待收货
    SUCCESS: "4", // 订单完成
    CLOSE: "5", // 关闭
    UN_COMMENT: "6", // 待评价
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
