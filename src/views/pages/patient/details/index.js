//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'
import DataMixin from './data.mixin'

new WowPage({
  mixins: [
    DataMixin,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Navbar,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Validate,
    WowPage.wow$.mixins.Form,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.File,
    WowPage.wow$.mixins.Image,
    WowPage.wow$.mixins.Jump,
  ],
  onLoad(options) {
    this.routerGetParams(options)
    console.log('onLoad', this.data.params$)
    this.assignmentData()
  },
  assignmentData() {
    let { params$, objInput } = this.data
    let { id, def, healthInfo } = params$
    this.navBarSetTitle(id ? '编辑用药人' : '添加用药人')
    if (id) {
      this.validateAssignment(
        this,
        {
          ...params$,
          healthInfo: JSON.parse(healthInfo),
          def: def === 1,
        },
        objInput,
        'objInput',
      )
    }
  },
  handleSubmit() {
    let { params$, api$, objInput } = this.data
    if (this.validateCheck(objInput)) {
      return null
    }
    let options = this.validateInput(objInput)
    options.def = options.def ? '1' : '0'
    options.healthInfo = JSON.stringify(options.healthInfo)
    if (params$.id) {
      options.id = params$.id
    }
    this.curl(
      api$.DO_ADD_PATIENT,
      {
        ...options,
      },
      {
        method: params$.id ? 'put' : 'post',
      },
    )
      .then(() => {
        this.modalToast(params$.id ? '修改成功' : '添加成功')
        setTimeout(this.routerPop.bind(this), 1000)
      })
      .toast()
  },
  handleDelete() {
    let { api$, params$ } = this.data
    this.modalConfirm(`确认删除该用药人吗？`)
      .then(() => {
        return this.curl(
          api$.DO_ADD_PATIENT + '?idList=' + params$.id,
          {},
          {
            method: 'delete',
          },
        )
      })
      .then(() => {
        this.modalToast('删除成功')
        setTimeout(this.routerPop.bind(this), 1000)
      })
      .toast()
  },
})
