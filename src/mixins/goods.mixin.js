import ModalMixin from 'wow-wx/mixins/wx/modal.mixin'

export default {
  mixins: [ModalMixin],
  data: {},
  judgeGoods(arr) {
    let res = false
    arr.forEach((item) => {
      if (item.status === 1 || item.productCount > item.inventory) {
        this.modalToast('商品库存不足或已下架')
        res = true
        return
      }
    })
    return res
  },
}
