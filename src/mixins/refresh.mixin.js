export default {
  onPullDownRefresh() {
    this.handleRefresh &&
      this.handleRefresh(() =>
        setTimeout(() => {
          wx.stopPullDownRefresh()
        }, 500),
      )
  },
}
