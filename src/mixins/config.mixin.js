const config = {}

for (let k in config) {
  let item = config[k]
  if (item.options) {
    const valueByKey = {}
    const labelByValue = {}
    item.options.forEach((it) => {
      let { key, label, value } = it
      valueByKey[key] = value
      labelByValue[value] = label
    })
    Object.assign(item, { valueByKey, labelByValue })
  }
}

export default {
  data: {
    config$: config,
  },
}
