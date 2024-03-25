//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [WowPage.wow$.mixins.Router, WowPage.wow$.mixins.Input, WowPage.wow$.mixins.Modal, WowPage.wow$.mixins.Image, WowPage.wow$.mixins.Share],
  data: {
    arrData: [
      {
        label: 'ICP备案',
        value: 'ICP备案：浙ICP备2024058447',
      },
      {
        label: '医疗器械经营诈可证',
        value: '浙舟药监械经营 许20230004号',
        url: ['https://www.rs-superlink.com/zj2.jpeg'],
      },
      {
        label: '互联网药品信息服务资格备案凭证',
        value: '（浙）一经营性-2024-0233（备）',
        url: ['https://www.rs-superlink.com/zj4.jpeg'],
      },
      {
        label: '食品经营许可证',
        value: 'JY13309030171633',
        url: ['https://www.rs-superlink.com/zj3.jpeg'],
      },
      {
        label: '药品经营许可证',
        value: '浙15800437',
        url: ['https://www.rs-superlink.com/zj5.jpeg'],
      },
      {
        label: '营业执照',
        value: '91330900MA7GDX1P6G',
        url: ['https://www.rs-superlink.com/zj1.jpeg'],
      },
      {
        label: '执业药师注册证',
        value: '',
        url: ['https://www.rs-superlink.com/doctor1.jpeg', 'https://www.rs-superlink.com/doctor2.jpeg'],
      },
    ],
  },
  handleqQualification(e) {
    let { item } = this.inputParams(e)
    if (item.url) {
      this.imagePreview({ urls: item.url })
    } else {
      this.modalToast(item.value)
    }
  },
  shareGetConfig() {
    return {
      path: '/pages/qualification/index',
    }
  },
})
