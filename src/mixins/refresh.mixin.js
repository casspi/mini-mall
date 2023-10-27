export default {
  onPullDownRefresh() {
    this.pagingRefresh &&
      this.pagingRefresh(() =>
        setTimeout(() => {
          wx.stopPullDownRefresh()
        }, 500),
      )
  },
}
