import Validator from '../../../../mixins/validator.mixin.js'
import Config from '../../../../mixins/config.mixin.js'

export default {
  data: {
    objHidden: {
      province: { value: '' },
      city: { value: '' },
      county: { value: '' },
    },
    // 是否需要问诊
    needDiagnosis: false,
    // 问诊字段
    objInput: {
      serviceType: {
        label: '服务类型',
        value: '',
        key: 'objInput.serviceType',
        mode: 'radio-group',
        options: [
          //0为图文，1为视频
          { label: '图文', value: 0 },
          { label: '视频', value: 1 },
        ],
        use: [{ nonempty: true, prompt: '选择服务类型' }],
      },
      userFamilyName: {
        label: '用药人姓名',
        value: '',
        key: 'objInput.name',
        placeholder: ' 请输入用药人姓名',
        mode: 'mode-input',
        iconRight: '',
        use: [{ nonempty: true, prompt: '请输入用药人姓名' }],
      },
      userFamilyIdCard: {
        label: '用药人身份证',
        value: '',
        key: 'objInput.userFamilyIdCard',
        placeholder: '请输入药品使用人身份证',
        mode: 'mode-input',
        iconRight: '',
        maxlength: 18,
        use: [
          { nonempty: true, prompt: '请输入药品使用人身份证' },
          {
            rule: Validator.idCardValidator,
            prompt: '身份证不合法',
          },
        ],
      },
      userFamilyAge: {
        label: '用药人年龄',
        value: '',
        key: 'objInput.userFamilyAge',
        placeholder: '请输入用药人年龄',
        mode: 'mode-input',
        type: 'number',
        iconRight: '',
        maxlength: 3,
        use: [{ nonempty: true, prompt: '请输入用药人年龄' }],
      },
      userFamilyGender: {
        label: '用药人性别',
        value: '',
        key: 'objInput.userFamilyGender',
        mode: 'radio-group',
        options: [
          { label: '女', value: 2 },
          { label: '男', value: 1 },
        ],
        use: [{ nonempty: true, prompt: '请选择用药人性别' }],
      },
      userFamilyPhone: {
        label: '用药人联系电话',
        value: '',
        key: 'objInput.userFamilyPhone',
        placeholder: '用药人联系电话',
        mode: 'mode-input',
        type: 'number',
        maxlength: 11,
        iconRight: '',
        use: [
          { nonempty: true, prompt: '请输入用药人联系电话' },
          { rule: (v) => v.length === 11, prompt: '请输入11位手机号' },
          { rule: (v) => /^1\d{10}$/.test(v), prompt: '手机号不合法' },
        ],
        use: [{ nonempty: true, prompt: '请输入用药人联系电话' }],
      },
      relationship: {
        label: '与患者关系',
        value: '',
        key: 'objInput.relationship',
        mode: 'mode-select',
        rangeKey: 'label',
        placeholder: '请选择与患者关系',
        options: Config.data.config$.DIAGNOSIS_RELATIONSHIP,
        use: [{ nonempty: true, prompt: '请选择与患者关系' }],
      },
    },
  },
}
