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
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Validate,
    WowPage.wow$.mixins.Form,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Image,
    WowPage.wow$.mixins.File,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.Pages,
    WowPage.wow$.mixins.Jump,
  ],
  data: {
    isAgreement: false,
    objPatient: '',
  },
  onLoad(options) {
    this.routerGetParams(options)
    let { params$, objInput } = this.data
    let {
      objPrescription: { id, patient },
    } = params$
    if (id) {
      this.validateAssignment(this, patient, objInput, 'objInput')
    }
  },
  onShow() {
    this.reqPatientList()
  },
  handleSubmit() {
    let { params$, objPatient, api$, objInput, isAgreement } = this.data
    if (!isAgreement) {
      this.modalToast('请确认已确诊此疾病并使用过该药，无过敏史、无相关禁忌症和不良反应。确认处方药须凭处方在药师指导下购买和使用')
      return
    }

    if (this.validateCheck(objInput)) {
      return null
    }
    let options = this.validateInput(objInput)
    console.log(options)
    const { caseFileIds, labelFileIds, ...wtPatient } = options
    const params = {}
    params.caseFileIds = caseFileIds.map((item) => item.id)
    params.labelFileIds = labelFileIds.map((item) => item.id)
    if (objPatient && objPatient.id) {
      params.patientId = objPatient.id
    } else {
      this.modalToast('请添加用药人信息')
      return
    }
    // params.wtPatient = wtPatient
    this.curl(api$.REQ_ADD_PRESCRIPTION, params, {}).then((res) => {
      this.backToOrder({
        patient: { ...res.wtPatient, caseFileIds, labelFileIds },
        id: res.id,
      })
    })
  },
  backToOrder(objPrescription) {
    let objPage = this.pagesGetByIndex(1)
    if (objPage) {
      objPage.setData({ objPrescription })
    }
    this.routerPop()
  },
  reqPatientList() {
    let { api$, objPatient, params$ } = this.data
    this.curl(
      api$.REQ_PATIENT_LIST,
      {
        def: 1,
      },
      {
        method: 'post',
      },
    )
      .then((res) => {
        res = res || []

        if (objPatient) {
          objPatient = res.filter((item) => item.id === objPatient.id)[0]
        }
        // 订单确认页过来的
        if (!objPatient && params$.objPrescription) {
          objPatient = res.filter((item) => item.id === params$.objPrescription.patient.id)[0]
        }
        // 有默认取默认，无默认取第一个
        if (!objPatient) {
          objPatient = res.filter((item) => item.def === 1)[0]
        }
        if (!objPatient) {
          objPatient = res[0]
        }
        this.setData({ objPatient: objPatient || '' })
      })
      .toast()
  },
})
