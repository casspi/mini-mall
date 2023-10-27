module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  globals: {
    wx: true,
  },

  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  overrides: [
    {
      files: ["*.wxml"],
      plugins: ["wxml"],
      // processor: 'wxml/wxml',
      parser: "@wxml/parser",
      rules: {
        "wxml/no-dot-this-in-wx-key": "error", // 禁止使用this作为key
        "wxml/empty-tag-self-closing": "error", // 强制空标签自闭合
        "wxml/event-binding-style": ["error", "no-colon"], // 强制事件绑定样式 colon: bind:tap no-colon bindtap
        "wxml/max-len": "error", // 设置单行代码最大宽度
        "wxml/no-duplicate-attributes": "error", // 禁止使用重复的属性
        "wxml/no-inconsistent-tagname": "error", // 禁止不配对的标签名
        "wxml/no-inline-wxs": "error", // 禁止使用内联wxs
        "wxml/no-unexpected-string-bool": "error", // 禁止使用布尔字符串 关键字需要在双引号之内
        "wxml/no-vue-directive": "error", // 禁止在微信小程序里错误的使用vuejs指令
        "wxml/no-wx-for-with-wx-if": "error", // 禁止wx:for和wx:if|wx:elseif|wx:else在同一个标签使用
        "wxml/report-wxml-syntax-error": "error", // 允许提示wxml语法错误
        "wxml/report-wxs-syntax-error": "error", // 允许提示内联wxs里的js语法错误
        "wxml/wx-key": "error", // wx:for循环时必须声明wx-key
        "max-len": 0,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn",
    "single-quote": "off",
    "no-useless-escape": "off",
  },
}
