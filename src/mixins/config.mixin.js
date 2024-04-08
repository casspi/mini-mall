const config = {
  // 问诊相关
  // 与用药人关系
  DIAGNOSIS_RELATIONSHIP: [
    { label: '本人', value: 1 },
    { label: '父母', value: 2 },
    { label: '配偶', value: 3 },
    { label: '子女', value: 4 },
    { label: '其他', value: 5 },
  ],
  // 问诊症状
  DIAGNOSIS_SYMPTOM: [
    { label: '咳嗽', value: 0 },
    { label: '呼吸道感染', value: 1 },
    { label: '感冒', value: 2 },
    { label: '咽炎', value: 3 },
    { label: '支气管炎', value: 4 },
    { label: '头痛', value: 5 },
    { label: '哮喘', value: 6 },
    { label: '咽痛', value: 7 },
    { label: '发热', value: 8 },
    { label: '鼻炎', value: 9 },
    { label: '扁桃体炎', value: 10 },
    { label: '牙周炎', value: 11 },
    { label: '牙痛', value: 12 },
    { label: '中耳炎', value: 13 },
    { label: '胃痛', value: 14 },
    { label: '胃肠炎', value: 15 },
    { label: '腹泻', value: 16 },
    { label: '幽门螺旋杆菌感染', value: 17 },
    { label: '腹痛', value: 18 },
    { label: '胃炎', value: 19 },
    { label: '胃胀', value: 20 },
    { label: '高血压', value: 21 },
    { label: '冠心病', value: 22 },
    { label: '心血管综合', value: 23 },
    { label: '高脂血症', value: 24 },
    { label: '头晕', value: 25 },
    { label: '糖尿病', value: 26 },
    { label: '关节炎', value: 27 },
    { label: '关节痛', value: 28 },
    { label: '风湿', value: 29 },
    { label: '尿道炎', value: 30 },
    { label: '前列腺炎', value: 31 },
    { label: '阴道炎', value: 32 },
    { label: '皮炎', value: 33 },
    { label: '结膜炎', value: 34 },
    { label: '其他', value: 35 },
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
    ORDER_CHCK_REFUSE: 7, //下单审核未通过，
    RETURNED_CHECK: 8, //退货待审核
    RETURNED_CHECK_REFUSE: 9, //退货审核未通过
    DIAGNOSIS_ING: 10, //问诊中
    DIAGNOSIS_FAIL: 11, //开方失败
    INVALID: 12, //订单失效
  },
  // 订单对应的文案
  ORDER_STATUS_TIP: {
    0: '待付款',
    1: '待收货',
    2: '已完成',
    3: '待退货',
    4: '退货中',
    5: '已退货',
    6: '待审核',
    7: '审核未通过',
    8: '退货待审核',
    9: '退货审核未通过',
    10: '问诊中',
    11: '开方失败',
    12: '订单失效',
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
