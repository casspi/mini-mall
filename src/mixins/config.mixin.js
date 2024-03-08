const config = {
  // 订单状态
  ORDER_STATUS: {
    UN_PAY: 0, // 待付款
    SEND: 1, // 待收货
    SUCCESS: 2, // 订单完成
    UN_RETURN: 3, //"待退货",
    RETURNING: 4, //"退货中",
    RETURNED: 5, //"已退货",
  },
  // 订单对应的文案
  ORDER_STATUS_TIP: {
    0: '待付款',
    1: '待收货',
    2: '已完成',
    3: '退货待审核',
    4: '退货中',
    5: '已退货',
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
