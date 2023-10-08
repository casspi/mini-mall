//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"
import DataMixin from "./data.mixin"

new WowPage({
  mixins: [DataMixin, WowPage.wow$.mixins.Jump, WowPage.wow$.mixins.Router],
})
