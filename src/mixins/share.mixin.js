import { s } from 'src/mixins/src.mixin'

export default {
  shareHandle(options) {
    const { params$ } = this.data
    const { scheme = '', scene = '', to = params$.to, ...params } = options
    Object.assign(params, params$)
    if (to) {
      const callback = () => this.routerPush(to, params)
      if (!params.a) return callback()
      this.userGet()
        .then(callback)
        .catch(() => {
          setTimeout(() => (this.data.callback = callback), 100)
          this.routerPush('login_index')
        })
      return
    }
    if (scene || scheme) {
      this.cacheSet('$$USER_SOURCE', options)
      return this.userLogout().finally(() => {
        setTimeout(() => this.routerPush('login_index'), 300)
      })
    }
  },

  shareGetConfig() {
    return {}
  },

  shareStringify(params = {}, path = 'pages/home/index') {
    const query = Object.keys(params)
      .reduce((res, k) => {
        res.push(`${k}=${params[k]}`)
        return res
      }, [])
      .join('&')
    return `${path}${path.includes('?') ? '&' : '?'}${query}`
  },

  onShareAppMessage(options) {
    return Object.assign(
      {
        title: '小程序名称',
        path: 'pages/home/index',
        imageUrl: s('icon-share.jpg'),
      },
      this.shareGetConfig(options),
    )
  },
}
