export default {
  data: {
    objInput: {
      // userName: {
      //   label: "真实姓名",
      //   value: "",
      //   key: "objInput.userName",
      //   placeholder: " 药品使用人姓名",
      //   mode: "mode-input",
      //   iconRight: "",
      //   use: [{ nonempty: true, prompt: "请输入药品使用人姓名" }],
      // },

      // phone: {
      //   label: "联系电话",
      //   value: "",
      //   key: "objInput.phone",
      //   placeholder: "药品使用人联系电话",
      //   mode: "mode-input",
      //   type: "number",
      //   maxlength: 11,
      //   iconRight: "",
      //   use: [
      //     { nonempty: true, prompt: "请输入药品使用人联系电话" },
      //     { rule: (v) => v.length === 11, prompt: "请输入11位手机号" },
      //   ],
      // },
      // idCard: {
      //   label: "身份证号",
      //   value: "",
      //   key: "objInput.idCard",
      //   placeholder: "请输入药品使用人身份证号",
      //   mode: "mode-input",
      //   iconRight: "",
      //   maxlength: 18,
      //   use: [{ nonempty: true, prompt: "请输入药品使用人身份证号" }],
      // },
      // healthInfo: {
      //   label: "健康信息",
      //   value: "",
      //   key: "objInput.healthInfo",
      //   placeholder: " 药品使用人健康信息",
      //   url: "health_index",
      //   mode: "mode-health",
      //   iconRight: "",
      //   use: [{ nonempty: true, prompt: "请选择健康信息" }],
      // },
      // def: {
      //   value: false,
      //   key: "objInput.def",
      //   useTopBlock: true,
      //   label: "设为默认用药人",
      //   mode: "mode-switch",
      // },
      labelFileIds: {
        value: [],
        key: 'objInput.labelFileIds',
        label: '病例信息和处方',
        mode: 'mode-upload',
        maxlength: 2,
        useTopBlock: true,
        storeKey: 'drug-prescription',
        use: [
          { nonempty: true, prompt: '请上传病例信息和处方' },
          {
            rule: (v, obj) => obj.labelFileIds.value.length, //obj.caseFileIds.value.length || obj.labelFileIds.value.length,
            prompt: '请上传病例信息和处方',
          },
        ],
      },
      caseFileIds: {
        value: [],
        key: 'objInput.caseFileIds',
        label: '身份证正反面',
        mode: 'mode-upload',
        maxlength: 2,
        useTopBlock: true,
        storeKey: 'drug-prescription',
        use: [
          { nonempty: true, prompt: '请上传身份证照片' },
          {
            rule: (v, obj) => obj.caseFileIds.value.length === 2,
            prompt: '请上传身份证正反面',
          },
        ],
        // 对接问诊平台这里不需要了
        hidden: false,
      },
    },
  },
}
