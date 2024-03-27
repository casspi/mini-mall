import Validator from '../../../../mixins/validator.mixin.js'
import Config from '../../../../mixins/config.mixin.js'

export default {
  data: {
    objHidden: {
      beforeAiDataList2: {
        subjectId: 2, //题目ID，第二题存居民用药信息选择，固定为2
        answer: '', //第二题该值为空
        answerMedicine: '[{"medicineId":"1","number":1},{"medicineId":"2","number":2}]', //存问诊用药信息选择，medicineId为第三方药品ID，number为药品数量。该字段是一字符串。
      },
    },
    // 是否需要问诊
    needDiagnosis: true,
    // 问诊字段
    objInput: {
      serviceType: {
        label: '问诊服务类型',
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
        label: '与用药人关系',
        value: '',
        key: 'objInput.relationship',
        mode: 'mode-select',
        rangeKey: 'label',
        placeholder: '请选择与用药人关系',
        options: Config.data.config$.DIAGNOSIS_RELATIONSHIP,
        use: [{ nonempty: true, prompt: '请选择与用药人关系' }],
      },
      beforeAiDataList1: {
        label: '症状',
        value: '',
        subjectId: 1,
        key: 'objInput.beforeAiDataList1',
        mode: 'select-view',
        url: 'select_index',
        title: '请选择症状',
        multiple: true,
        labelKey: 'label',
        options: Config.data.config$.DIAGNOSIS_SYMPTOM,
        use: [
          { nonempty: true, prompt: '请选择症状' },
          { rule: (v) => v.length, prompt: '请选择确诊疾病' },
        ],
        disabled: false,
      },
      beforeAiDataList3: {
        label: '是否使用过此类药物',
        value: '',
        subjectId: 3,
        key: 'objInput.beforeAiDataList3',
        mode: 'radio-group',
        options: [
          { label: '是', value: '是' },
          { label: '否', value: '否' },
        ],
        use: [{ nonempty: true, prompt: '请选择是否使用过此类药物' }],
      },
      beforeAiDataList4: {
        label: '是否有药物过敏史（青霉素,红霉素等）',
        value: '',
        subjectId: 4,
        key: 'objInput.beforeAiDataList4',
        mode: 'radio-group',
        options: [
          { label: '是', value: '是' },
          { label: '否', value: '否' },
        ],
        use: [{ nonempty: true, prompt: '请选择是否有药物过敏史' }],
      },
      beforeAiDataList5: {
        label: '肝肾功能是否有异常',
        value: '',
        subjectId: 5,
        key: 'objInput.beforeAiDataList5',
        mode: 'radio-group',
        options: [
          { label: '是', value: '是' },
          { label: '否', value: '否' },
        ],
        use: [{ nonempty: true, prompt: '请选择肝肾功能是否有异常' }],
      },
    },
  },
}
