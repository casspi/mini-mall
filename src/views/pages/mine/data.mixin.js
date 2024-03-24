import Config from '../../../mixins/config.mixin.js'

export default {
  data: {
    objOrder: {
      ['order' + Config.data.config$.ORDER_STATUS.ORDER_CHCK]: {
        label: '待审核',
        value: '',
        icon: '_iconfont _icon-daishenhedingdan',
        url: 'order_index',
        index: 1,
      },
      ['order' + Config.data.config$.ORDER_STATUS.ORDER_CHCK_REFUSE]: {
        label: '未通过',
        value: '',
        icon: '_iconfont _icon-yibohui',
        url: 'order_index',
        index: 2,
      },
      ['order' + Config.data.config$.ORDER_STATUS.UN_PAY]: {
        label: '待付款',
        value: '',
        icon: 'iconWallet',
        url: 'order_index',
        index: 3,
      },
      ['order' + Config.data.config$.ORDER_STATUS.SEND]: {
        label: '待收货',
        value: '',
        icon: 'iconTransit',
        url: 'order_index',
        index: 4,
      },
      ['order' + Config.data.config$.ORDER_STATUS.SUCCESS]: {
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
        label: '企业资质',
        url: 'qualification_index',
      },
      logout: {
        label: '退出登录',
        fn: 'logout',
      },
    },
  },
}
