export default {
  pagesGetByIndex(index = 0) {
    // eslint-disable-next-line no-undef
    let pages = getCurrentPages()
    return pages[pages.length - 1 - index]
  },
}
