import PageMixin from 'wow-wx/mixins/wx/page.mixin'

let tabItemIndex = 0

export default {
  mixins: [PageMixin],
  onLoad() {
    this.data._flag = true
  },
  onShow() {
    if (!this.data._flag) {
      const index = ['home', 'community', 'mall', 'mine'].findIndex((item) =>
        this.route.includes(item),
      )
      if (tabItemIndex !== index) {
        this.tabItemTapCallback && this.tabItemTapCallback()
      }
      tabItemIndex = index
    }
    this.data._flag = false
  },
}
