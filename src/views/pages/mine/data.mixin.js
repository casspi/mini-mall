export default {
  data: {
    objOrder: {
      orderCheckNum: {
        label: '待审核',
        value: '11',
        icon: '_iconfont _icon-daishenhedingdan',
        url: 'order_index',
        index: 1,
      },
      orderCheckRefuseNum: {
        label: '已驳回',
        value: '11',
        icon: '_iconfont _icon-yibohui',
        url: 'order_index',
        index: 2,
      },
      unpayOrderNum: {
        label: '待付款',
        value: '151',
        icon: 'iconWallet',
        url: 'order_index',
        index: 3,
      },
      sendOrderNum: {
        label: '待收货',
        value: '',
        icon: 'iconTransit',
        url: 'order_index',
        index: 4,
      },
      unsendOrderNum: {
        label: '已完成',
        value: '',
        icon: 'iconPackage',
        url: 'order_index',
        index: 5,
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
      qualification: {
        label: '公司资质',
        url: 'qualification_index',
      },
      logout: {
        label: '退出登录',
        fn: 'logout',
      },
    },
  },
}
