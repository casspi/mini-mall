import ApiConfig from 'src/config/api.config'

export default {
  formAddressHandle(event) {
    let { code, postcode, value, item } = this.inputParams(event)
    let { objHidden } = this.data
    let [province, city, county] = value
    console.log(value)
    if (objHidden) {
      this.validateAssignment(this, { province, city, county }, objHidden, 'objHidden')
    }
    this.setData({ [`${item.key}.value`]: value.join(' ') })
  },

  formUploadHandle(event) {
    let { item } = this.inputParams(event)
    let { api$ } = this.data
    this.modalActionSheet(['从手机相册选择', '拍照'])
      .then((res) => {
        let sourceType = [['album'], ['camera']]
        return this.imageChoose({ sourceType: sourceType[res.tapIndex] })
      })
      .then((res) => {
        return this.curl(
          api$.DO_UPLOAD_FILE,
          {
            storeKey: item.storeKey, // 存储控价key
            businessId: '',
          },
          {
            filePath: res.tempFilePaths[0],
            loading: true,
            fn: 'uploadFile',
            name: 'file',
          },
        )
      })
      .then((res) => {
        // item.value.push("https://images.autostreets.com/" + res.saveUrl)
        this.setData({ [`${item.key}.value`]: [...item.value, { id: res.id, src: ApiConfig.IMAGE_BASE_URL + res.id }] })
      })
      .toast()
  },

  formUploadDeleteHandle(event) {
    let { index, item } = this.inputParams(event)
    item.value.splice(index, 1)
    this.setData({ [`${item.key}.value`]: item.value })
  },
  formUploadPreviewHandle(event) {
    let { index, item } = this.inputParams(event)
    const urls = item.value.map((item) => item.src)
    this.imagePreview({
      current: urls[index],
      urls,
    }).toast()
  },
}
