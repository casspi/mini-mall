export default {
  data: {
    objHidden: {
      province: { value: "" },
      city: { value: "" },
      county: { value: "" },
    },
    objInput: {
      name: {
        label: "收货人",
        value: "",
        key: "objInput.name",
        placeholder: " 收货人姓名",
        mode: "mode-input",
        iconRight: "",
        use: [{ nonempty: true, prompt: "请输入收货人姓名" }],
      },
      phone: {
        label: "电话",
        value: "",
        key: "objInput.phone",
        placeholder: "收货人联系电话",
        mode: "mode-input",
        type: "number",
        maxlength: 11,
        iconRight: "",
        use: [
          { nonempty: true, prompt: "请输入收货人联系电话" },
          { rule: (v) => v.length === 11, prompt: "请输入11位手机号" },
        ],
      },
      address: {
        label: "收货地址",
        value: "",
        key: "objInput.address",
        placeholder: "选择省市区",
        mode: "mode-region",
        use: [{ nonempty: true, prompt: "请选择省市区" }],
      },
      detail: {
        label: "详细地址",
        value: "",
        key: "objInput.detail",
        placeholder: "请输入详细地址",
        mode: "mode-input",
        iconRight: "",
        use: [{ nonempty: true, prompt: "请输入详细地址" }],
      },
      status: {
        value: false,
        key: "objInput.status",
        useTopBlock: true,
        label: "设为默认地址",
        mode: "mode-switch",
      },
    },
  },
}
