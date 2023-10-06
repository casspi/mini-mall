import InputMixin from 'wow-wx/mixins/wx/input.mixin'

export default {
  mixins: [InputMixin],

  data: {
    pagingIndex: 1,
    pagingSize: 10,
    pagingTotal: -1,
    pagingData: '', // 二维数组
    pagingIsLoading: false,
    pagingNumTotal: -1, // 加载的 total
  },

  pagingRefresh(event, cb) {
    const {
      loading = typeof event === 'boolean' ? event : false,
      callback = cb,
    } = this.inputParams(typeof event === 'object' ? event : {})
    this.pagingReqDataList(1, loading, callback)
  },

  pagingGetUrlParamsOptions() {
    return { url: '', params: {}, options: {} }
  },

  pagingReqDataList(pagingIndex = 1, loading = false, callback) {
    this.setData({ pagingIsLoading: true })
    let {
      url,
      params = {},
      options = {},
    } = this.pagingGetUrlParamsOptions({ pagingIndex })
    let { pagingSize, pagingData, pagingNumTotal } = this.data
    options = {
      loading: loading && typeof callback !== 'function',
      useError: true,
      ...options,
    }
    this.curl(
      url,
      {
        PageIndex: pagingIndex,
        PageSize: pagingSize,
        ...params,
      },
      options,
    )
      .then((res) => {
        const { Count: pagingTotal = 0, Data: list = [] } =
          this.pagingFormatResult(res)
        if (this.pagingCallbackResult) {
          this.pagingCallbackResult(
            {
              list,
              pagingIndex,
            },
            () => {
              if (pagingIndex === 1) {
                pagingNumTotal = 0
                pagingNumTotal += list.length
              } else {
                pagingNumTotal += list.length
              }
              this.setData({ pagingNumTotal, pagingTotal, pagingIndex })
            },
          )
          return
        }
        if (pagingIndex === 1) {
          pagingData = []
          pagingNumTotal = 0
          pagingNumTotal += list.length
          pagingData[0] = list
          this.setData({
            pagingNumTotal,
            pagingTotal,
            pagingData,
            pagingIndex,
          })
        } else {
          pagingNumTotal += list.length
          this.setData({
            pagingNumTotal,
            pagingTotal,
            pagingIndex,
            [`pagingData[${pagingIndex - 1}]`]: list,
          })
        }
      })
      .toast()
      .finally(() => {
        typeof callback === 'function' && callback()
        this.setData({ pagingIsLoading: false })
      })
  },

  pagingFormatResult(res) {
    if (Array.isArray(res)) {
      res = { Count: res.length, Data: res }
    }
    return res
  },

  pagingLoad() {
    const {
      pagingTotal,
      pagingData,
      pagingNumTotal,
      pagingIsLoading,
      pagingIndex,
    } = this.data
    if (pagingIsLoading) {
      return console.log('正在加载中...')
    }
    if (pagingData && pagingTotal <= pagingNumTotal) {
      return console.log('没有更多了...')
    }
    this.pagingReqDataList(pagingIndex + 1)
  },
}
