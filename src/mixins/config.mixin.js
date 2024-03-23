const config = {
  // 与用药人关系
  DIAGNOSIS_RELATIONSHIP: [
    { label: '本人', value: 1 },
    { label: '父母', value: 2 },
    { label: '配偶', value: 3 },
    { label: '子女', value: 4 },
    { label: '其他', value: 5 },
  ],
  // 订单状态
  ORDER_STATUS: {
    UN_PAY: 0, // 待付款
    SEND: 1, // 待收货
    SUCCESS: 2, // 订单完成
    UN_RETURN: 3, //"待退货",
    RETURNING: 4, //"退货中",
    RETURNED: 5, //"已退货",
    ORDER_CHCK: 6, //下单待审核
    ORDER_CHCK_REFUSE: 7, //下单审核不通过，
    RETURNED_CHECK: 8, //退货待审核
    RETURNED_CHECK_REFUSE: 9, //退货审核不通过
  },
  // 订单对应的文案
  ORDER_STATUS_TIP: {
    0: '待付款',
    1: '待收货',
    2: '已完成',
    3: '退货待审核',
    4: '退货中',
    5: '已退货',
    6: '待审核',
    7: '审核不通过',
    8: '退货待审核',
    9: '退货审核不通过',
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
