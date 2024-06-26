import Validator from '../../../../mixins/validator.mixin.js'
import Config from '../../../../mixins/config.mixin.js'

export default {
  data: {
    //问诊平台需要的其他字段
    objHidden: {
      beforeAiDataList2: {
        value: {
          subjectId: 2, //题目ID，第二题存居民用药信息选择，固定为2
          answer: '', //第二题该值为空
          answerMedicine: '', //'[{"medicineId":"1","number":1},{"medicineId":"2","number":2}]' 存问诊用药信息选择，medicineId为第三方药品ID，number为药品数量。该字段是一字符串。
        },
      },
    },
    // 是否需要问诊
    isDiagnosis: true,
    // 问诊字段
    objInput: {
      serviceType: {
        label: '问诊服务类型',
        value: 0,
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
        key: 'objInput.userFamilyName',
        placeholder: ' 请输入用药人姓名(汉字)',
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
      isPregnantWoman: {
        label: '是否是孕妇',
        value: '',
        key: 'objInput.isPregnantWoman',
        mode: 'radio-group',
        options: [
          { label: '是', value: 1 },
          { label: '否', value: 0 },
        ],
        use: [{ nonempty: true, prompt: '请选择是否是孕妇' }],
      },
      isLactation: {
        label: '是否在哺乳期',
        value: '',
        key: 'objInput.isLactation',
        mode: 'radio-group',
        options: [
          { label: '是', value: 1 },
          { label: '否', value: 0 },
        ],
        use: [{ nonempty: true, prompt: '请选择是否在哺乳期' }],
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
        value: '是',
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
        value: '否',
        subjectId: 4,
        key: 'objInput.beforeAiDataList4',
        mode: 'radio-group',
        options: [
          { label: '是', value: '是' },
          { label: '否', value: '否' },
        ],
        // use: [{ nonempty: true, prompt: '请选择是否有药物过敏史' }],
      },
      beforeAiDataList5: {
        label: '肝肾功能是否有异常',
        value: '否',
        subjectId: 5,
        key: 'objInput.beforeAiDataList5',
        mode: 'radio-group',
        options: [
          { label: '是', value: '是' },
          { label: '否', value: '否' },
        ],
        // use: [{ nonempty: true, prompt: '请选择肝肾功能是否有异常' }],
      },
    },
  },
  formartDiagnosisParams(data) {
    //是否需要审方（0为不需要，1为需要）
    data.isExamine = 1
    //来源:0为微信小程序，1为APP，2为H5，3为支付宝小程序
    data.souceFrom = 0

    data.beforeAiDataList = Array.from(Array(5), (_, index) => {
      const subjectId = index + 1
      const subject = {
        subjectId,
        answer: data[`beforeAiDataList${subjectId}`] || '',
      }
      if (subjectId === 1) {
        subject.answer = subject.answer.map((_) => _.label).join(',')
      }
      if (subjectId === 2) {
        let { arrData } = this.data.params$
        arrData = arrData.map((item) => {
          return {
            number: item.productCount,
            medicineId: item.productId,
          }
        })
        subject.answerMedicine = JSON.stringify(arrData)
        subject.answer = ''
      }
      delete data[`beforeAiDataList${subjectId}`]
      return subject
    })

    const DIAGNOSIS_RELATIONSHIP = Config.data.config$.DIAGNOSIS_RELATIONSHIP
    data.relationship = DIAGNOSIS_RELATIONSHIP.find((_) => _.label === data.relationship).value

    return data
  },
}
