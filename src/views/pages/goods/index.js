//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"

new WowPage({
  mixins: [WowPage.wow$.mixins.Router],
  data: {
    arrBanner: [
      "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
      "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
      "https://img30.360buyimg.com/babel/s320x320_jfs/t1/118182/26/17983/255703/5f61b07aE48622c4f/224c98e42d16e58b.png!cc_320x320.webp",
    ],
  },
})
