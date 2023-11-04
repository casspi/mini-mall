//index.js
import "./index.json"
import "./index.scss"
import "./index.wxml"

import WowPage from "wow-wx/lib/page"

new WowPage({
  mixins: [WowPage.wow$.mixins.Router, WowPage.wow$.mixins.Page],
  data: {
    arrData: [
      {
        name: "过往病史",
        value: false,
        selected: [],
        other: "",
        options: [
          "糖尿病",
          "高血压",
          "心脑血管疾病",
          "高血脂",
          "肝炎",
          "高尿酸血症",
          "支气管哮喘",
          "结核病",
          "恶性肿瘤",
          "肝病",
          "肾病",
        ],
      },
      {
        name: "药物过敏史",
        value: false,
        selected: [],
        other: "",
        options: [
          "青霉素",
          "头孢类抗生素",
          "破伤风抗毒素（TAT）",
          "普鲁卡因",
          "地卡因",
          "磺胺类药物",
          "维生素B1",
          "泛影葡胺",
          "阿司匹林",
          "链霉素",
          "安定",
          "去痛片",
        ],
      },
      {
        name: "食物/接触过敏史",
        value: false,
        selected: [],
        other: "",
        options: ["鸡蛋", "面粉", "坚果", "海鲜", "豆制品", "花粉", "动物毛发", "酒精", "牛奶", "粉尘", "螨虫"],
      },
      {
        name: "家族遗传病史",
        value: false,
        selected: [],
        other: "",
        options: [
          "高血压",
          "糖尿病",
          "脑梗",
          "脑出血",
          "癌症",
          "过敏性疾病",
          "哮喘",
          "癫痫",
          "白癜风",
          "近视",
          "精神疾病",
          "超重",
          "骨质疏松",
          "冠心病",
        ],
      },
      {
        name: "吸烟",
        value: false,
      },
      {
        name: "饮酒",
        value: false,
      },
    ],
  },
  onLoad(options) {
    // this.routerGetParams(options)
    // console.log(this.data)
  },
  handleChange(options) {
    let { index, valueKey, value } = options.detail
    this.setData({
      [`arrData[${index}].${valueKey}`]: value,
    })
  },
  handleSubmit() {
    const { arrData } = this.data
    let objPage = this.pagesGetByIndex(1)
    if (objPage) {
      objPage.setData({ [`objInput.healthInfo.value`]: arrData })
    }
    this.routerPop()
  },
})
