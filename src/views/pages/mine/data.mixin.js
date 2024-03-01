export default {
  data: {
    objOrder: {
      unpayOrderNum: {
        label: '待付款',
        value: '',
        icon: 'iconWallet',
        url: 'order_index',
        index: 1,
      },
      sendOrderNum: {
        label: '待收货',
        value: '',
        icon: 'iconTransit',
        url: 'order_index',
        index: 2,
      },
      unsendOrderNum: {
        label: '已完成',
        value: '',
        icon: 'iconPackage',
        url: 'order_index',
        index: 3,
      },
    },
    objMenu: {
      address: {
        label: '收货地址',
        url: 'address_index',
        from: 'mine_index',
      },
      // call: {
      //   label: '电话客服',
      //   fn: 'callService',
      // },
      online: {
        label: '在线客服',
      },
      logout: {
        label: '退出登录',
        fn: 'logout',
      },
    },
  },
}
