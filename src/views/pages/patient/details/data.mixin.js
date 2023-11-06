export default {
  data: {
    objInput: {
      userName: {
        label: "真实姓名",
        value: "",
        key: "objInput.userName",
        placeholder: " 药品使用人姓名",
        mode: "mode-input",
        iconRight: "",
        use: [{ nonempty: true, prompt: "请输入药品使用人姓名" }],
      },

      phone: {
        label: "联系电话",
        value: "",
        key: "objInput.phone",
        placeholder: "药品使用人联系电话",
        mode: "mode-input",
        type: "number",
        maxlength: 11,
        iconRight: "",
        use: [
          { nonempty: true, prompt: "请输入药品使用人联系电话" },
          { rule: (v) => v.length === 11, prompt: "请输入11位手机号" },
          { rule: (v) => /'^1\d{10}$'/.test(v), prompt: "手机号不合法" },
        ],
      },
      idCard: {
        label: "身份证号",
        value: "",
        key: "objInput.idCard",
        placeholder: "请输入药品使用人身份证号",
        mode: "mode-input",
        iconRight: "",
        maxlength: 18,
        use: [
          { nonempty: true, prompt: "请输入药品使用人身份证号" },
          {
            rule: (v) =>
              /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
                v,
              ),
            prompt: "身份证号不合法",
          },
        ],
      },
      healthInfo: {
        label: "健康信息",
        value: "",
        key: "objInput.healthInfo",
        placeholder: " 药品使用人健康信息",
        url: "health_index",
        mode: "mode-health",
        iconRight: "",
        use: [{ nonempty: true, prompt: "请选择健康信息" }],
      },
      def: {
        value: false,
        key: "objInput.def",
        useTopBlock: true,
        label: "设为默认用药人",
        mode: "mode-switch",
      },
    },
  },
}
