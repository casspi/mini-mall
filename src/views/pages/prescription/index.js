//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"
import DataMixin from "./data.mixin"

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
  },
  onLoad(options) {
    this.routerGetParams(options)
    console.log(this.data)
    let { params$, objInput } = this.data
    let {
      objPrescription: { id, patient },
    } = params$
    if (id) {
      this.validateAssignment(this, patient, objInput, "objInput")
    }
  },
  onShow() {},
  handleSubmit() {
    let { params$, api$, objInput, isAgreement } = this.data
    if (!isAgreement) {
      this.modalToast(
        "请确认已确诊此疾病并使用过该药，无过敏史、无相关禁忌症和不良反应。确认处方药须凭处方在药师指导下购买和使用",
      )
      return
    }

    if (this.validateCheck(objInput)) {
      return null
    }
    let options = this.validateInput(objInput)
    console.log(options)
    const { caseFileIds, labelFileIds, ...wtPatient } = options
    const caseIds = caseFileIds.map((item) => item.id)
    const labelIds = labelFileIds.map((item) => item.id)
    this.curl(
      api$.REQ_ADD_PRESCRIPTION,
      {
        wtPatient,
        caseFileIds: caseIds,
        labelFileIds: labelIds,
      },
      {},
    ).then((res) => {
      this.backToOrder({
        patient: { ...res.wtPatient, caseFileIds, labelFileIds },
        id: res.id,
      })
    })
    // this.curl(api$.DO_ADD_ADDRESS, { ...options }, {})
  },
  backToOrder(objPrescription) {
    let objPage = this.pagesGetByIndex(1)
    if (objPage) {
      objPage.setData({ objPrescription })
    }
    this.routerPop()
  },
})
