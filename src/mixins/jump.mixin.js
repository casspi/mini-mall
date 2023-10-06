import InputMixin from 'wow-wx/mixins/wx/input.mixin'
import RouterMixin from 'wow-wx/mixins/wx/router.mixin'
import ModalMixin from 'wow-wx/mixins/wx/modal.mixin'

export default {
  mixins: [InputMixin, RouterMixin, ModalMixin],
  jumpPageOrFireFn(e) {
    const { item, ...rest } = this.inputParams(e)
    let {
      url,
      params,
      fn,
      async,
      sync,
      disabled,
      close = false,
      event,
      filter,
      premise = '',
    } = Object.assign({}, rest, typeof item === 'object' ? item : {})

    if (disabled) {
      return null
    }

    // 过滤拦截器
    if (filter) {
      filter = filter.split(',')
      for (let i = 0, len = filter.length; i < len; i++) {
        let result = this[filter[i]](params || item)
        if (result) {
          return true
        }
      }
    }

    const fireFn = () => {
      if (url) {
        this.routerPush(url, params || item, !!close)
      }
      if (fn && this[fn]) {
        this[fn](params || item, e)
      }
      if (event) {
        this.triggerEvent(event, params || item)
      }
    }

    if (typeof sync !== 'undefined' && !sync) {
      return this.routerPush('login_index')
    }

    if (async || premise) {
      return this.userGet()
        .then((res) => {
          const { IsTestPlan, IsBindMachine, UserNewAct, Identity } = res
          const { IsNewUser, IsDrawPrize, PrizeBasic } = UserNewAct || {}
          const { PrizeBasicId } = PrizeBasic || {}
          premise = premise.split(',')
          for (let i = 0, len = premise.length; i < len; i++) {
            const p = premise[i]
            // 未绑定机器
            if (p === 'isBindDevice' && !IsBindMachine) {
              return this.modalConfirm({
                confirmText: '立即绑定',
                cancelText: '以后再说',
                content: '请先绑定您的血糖仪，绑定罗氏血糖仪，获取更多积分',
              })
                .then(() => {
                  this.routerPush('device_ocr_index')
                })
                .catch(() => {
                  fireFn()
                })
            }

            // 新客身份 是否选择
            if (
              p === 'isGuestIdentity' &&
              IsNewUser && // 新客
              !IsDrawPrize // 没有抽奖
            ) {
              // 没有身份 或者身份不是糖尿病患者
              if (Identity !== 1) {
                return this.jumpPopupGuestHandle()
              }
              // 没有建档
              if (!IsTestPlan) {
                return this.routerPush('measure_diagnose_index')
              }
              // 没有抽奖
              if (!IsDrawPrize && PrizeBasicId) {
                return this.routerPush('turntable_index', {
                  Type: 2,
                  PrizeBasicId,
                })
              }
            }
          }
          fireFn()
        })
        .catch((err) => {
          console.log(err)
          this.routerPush('login_index')
        })
    }
    fireFn()
  },

  jumpPopupGuestHandle() {
    const refPopupGuest = this.selectComponent('#refPopupGuest')
    if (refPopupGuest && refPopupGuest.show) {
      this.userGet()
        .then((res) => refPopupGuest.show(res))
        .null()
    } else {
      this.triggerEvent && this.triggerEvent('guest')
    }
  },

  // 跳转到小程序
  jumpMiniProgram(event) {
    const { appid: appId, path } = this.inputParams(event)
    wx.navigateToMiniProgram({
      appId, // 小程序appid
      path, // 跳转关联小程序app.json配置里面的地址
      envVersion: 'release',
      success(res) {
        console.log('打开成功 => ', res)
      },
      fail(err) {
        console.log('打开失败 => ', err)
      },
    })
  },

  jumpTabBarPage(e) {
    const { url } = this.inputParams(e)
    this.routerRoot(url)
  },
}
