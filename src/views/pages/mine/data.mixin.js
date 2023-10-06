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
      unsendOrderNum: {
        label: '待发货',
        value: '',
        icon: 'iconPackage',
        url: 'order_index',
        index: 2,
      },
      sendOrderNum: {
        label: '待收货',
        value: '',
        icon: 'iconTransit',
        url: 'order_index',
        index: 3,
      },
    },
    objMenu: {
      address: {
        label: '收货地址',
        url: 'mine_address_index',
        from: 'mine_index',
      },
      help: {
        label: '在线客服',
        fn: 'handleCustomerService',
      },
      // setting: {
      //   label: '设置',
      //   url: 'setting_index',
      // },
    },
  },
}
