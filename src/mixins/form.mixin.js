export default {
  formAddressHandle(event) {
    let { code, postcode, value, item } = this.inputParams(event)
    let { objHidden } = this.data
    let [province, city, region] = value
    if (objHidden) {
      this.validateAssignment(
        this,
        { province, city, region },
        objHidden,
        "objHidden",
      )
    }
    this.setData({ [`${item.key}.value`]: value.join(" ") })
  },

  formUploadHandle(event) {
    let { item } = this.inputParams(event)
    let { api$ } = this.data
    this.modalActionSheet(["从手机相册选择", "拍照"])
      .then((res) => {
        let sourceType = [["album"], ["camera"]]
        return this.imageChoose({ sourceType: sourceType[res.tapIndex] })
      })
      .then((res) => {
        return this.fileToBase64(res.tempFilePaths[0])
      })
      .then((res) => {
        return this.httpRequest(api$.DO_IMAGE_UPLOAD, {
          fileType: "jpg",
          fileExt: "jpg",
          base64FileContent: res,
        })
      })
      .then((res) => {
        item.value.push(res.url)
        this.setData({ [`${item.key}.value`]: item.value })
      })
      .toast()
  },

  formUploadDeleteHandle(event) {
    let { index, item } = this.inputParams(event)
    item.value.splice(index, 1)
    this.setData({ [`${item.key}.value`]: item.value })
  },
}
