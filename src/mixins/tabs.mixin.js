export default {
  data: {
    numCurrIndex: 0,
  },

  tabsChange(event) {
    let { index, callback, current } = this.inputParams(event)
    this.setData({ numCurrIndex: index || current || 0 })
    callback && this[callback] && this[callback]()
  },
}
