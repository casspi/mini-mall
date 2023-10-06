export default {
  formatDate(fmt = 'yyyy-MM-dd hh:mm:ss', date = new Date()) {
    if (typeof date === 'string') {
      date = date.replace(/-/gi, '/')
    }
    if (!(date instanceof Date)) {
      date = new Date(date)
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds(),
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length),
      )
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length),
        )
      }
    }
    return fmt
  },
  formatGetTime(v) {
    return +v.replace(/[^0-9-]/gi, '')
  },
  formatPhone(value, type) {
    if (type) {
      return value ? value.substring(0, 3) + '****' + value.substring(7) : ''
    }
    return value ? value.substring(0, 3) + ' **** ' + value.substring(7) : ''
  },
  splitArray(arr, size) {
    const result = []
    for (let i = 0, len = arr.length; i < len; i += size) {
      result.push(arr.slice(i, i + size))
    }
    return result
  },
}
