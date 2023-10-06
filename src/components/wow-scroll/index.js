import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

let prevTime = 0
new WowComponent({
  mixins: [WowComponent.wow$.mixins.Input],
  data: {
    numY: 0,
    isRefresh: false,
    strRefreshPrompt: '',
    scrollTop: 0,
  },
  properties: {
    numMax: {
      // 最大距离
      type: Number,
      value: 90,
    },
    numMin: {
      // 最小距离
      type: Number,
      value: 80,
    },
    isNoMore: {
      type: Boolean,
      value: false,
    },
  },
  scrollTop: 0,
  startClientY: 0,
  methods: {
    resume() {
      this.setData({ numY: 0 })
    },
    returnTop(scrollTop = 0.1) {
      this.setData({ scrollTop })
    },
    handleScroll(event) {
      this.scrollTop = event.detail.scrollTop
    },
    handleScrollToUpper() {
      this.scrollTop = 0
      setTimeout(() => {
        this.scrollTop = 0
      }, 100)
    },
    handleTouchStart(event) {
      let { isRefresh } = this.data
      if (isRefresh) return null
      let [objStart] = event.touches
      if (objStart) this.startClientY = objStart.clientY
      this.setData({ strRefreshPrompt: '', isRefresh: false })
    },
    handleTouchMove(event) {
      let { isRefresh, numY } = this.data
      if (isRefresh) return null
      if (this.scrollTop > 0) return null
      let [objEnd] = event.touches
      numY = objEnd.clientY - this.startClientY
      if (numY > this.data.numMax) {
        numY = this.data.numMax
      }
      this.data.numY = numY
      if (Date.now() - prevTime > 30) {
        this.setData({ numY }, () => {
          prevTime = Date.now()
        })
      }
    },
    handleTouchEnd() {
      let { numY, numMin, isRefresh } = this.data
      if (isRefresh) return null
      if (numY < numMin) {
        numY = 0
      } else {
        numY = numMin
        isRefresh = true
      }
      this.setData({ numY, isRefresh })
      if (!isRefresh) {
        return this.setData({ numY: 0 })
      }
      this.triggerEvent('refresh', {
        callback: (res) => {
          let { strPrompt = '刷新完成' } = res || {}
          this.setData({ strRefreshPrompt: strPrompt })
          setTimeout(() => this.setData({ numY: 0 }), 300)
          setTimeout(() => this.setData({ isRefresh: false }), 550)
        },
      })
    },
  },
})
