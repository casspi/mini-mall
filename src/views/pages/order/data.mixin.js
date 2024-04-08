export default {
  // 0：待付款 1：待收货 2： 已完成
  data: {
    arrStatus: [
      {
        label: '全部',
        status: '',
      },
      {
        label: '问诊中',
        status: '10',
        badge: '',
      },
      {
        label: '开方失败',
        status: '11',
        badge: '',
      },
      {
        label: '待审核',
        status: '6',
        badge: '',
      },
      {
        label: '未通过',
        status: '7',
        badge: '',
      },
      {
        label: '待付款',
        status: '0',
        badge: '',
      },
      {
        label: '待收货',
        status: '1',
        badge: '',
      },
      {
        label: '已完成',
        status: '2',
        badge: '',
      },
    ],
  },
}
