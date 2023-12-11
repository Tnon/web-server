/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-02 15:27:39
 * @LastEditTime: 2022-11-02 15:32:21
 */
import initLdapForm from './index.vue';
import { reactive } from 'vue';
import addModal from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import { checkStrong } from '@/utils/tools';
import { validateEmail, validateTel, validatePhone } from '@/utils/reg';

//表单数据
// const state = reactive<{
//   formData: any;
// }>({
//   formData: {},
// });
// 定义密码强弱的等级
export const pwdLevelMode = reactive({
  low: false, // 强度弱
  middle: false, // 强度度中
  high: false, // 强度高
  level: 0, // 等级
});
export const initPwdValidate = () => {
  pwdLevelMode.low = false;
  pwdLevelMode.middle = false;
  pwdLevelMode.high = false;
  pwdLevelMode.level = 0;
};

// 密码强度校验规则
const validatePWD = (value, state) => {
  const results = checkStrong(value ?? '', state.email || '');
  Object.assign(pwdLevelMode, results); // 将两个结果合并
  if (pwdLevelMode.level === 3) {
    // 只有当level等于三也就是密码强度为高的时候返回resolve否则返回reject
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
};
// 确认密码强度校验规则
const validatePWDCheck = (value, state) => {
  if (value !== state.password) {
    // 密码校验，校验密码和输入的密码不一样则返回reject否则返回resolve
    return Promise.reject();
  }
  return Promise.resolve();
};

const useFormItems = (t, state): TableColumn[] => [
  {
    title: t('user.loginEmail'),
    dataIndex: 'email',
    formProps: {
      type: 'input',
      placeholder: t('user.pIptAcc'),
      rules: [{ required: true, message: t('user.pIptAcc'), validator: validateEmail }],
    },
  },
  {
    title: t('user.name'),
    dataIndex: 'name',
    formProps: {
      type: 'input',
      placeholder: t('user.pIptName'),
      rules: [
        {
          required: true,
          message: t('user.pIptName'),
        },
      ],
    },
  },
  {
    title: t('user.mobNum'),
    dataIndex: 'mobile',
    formProps: {
      type: 'input',
      placeholder: t('user.pIptPnum'),
      rules: [{ message: t('user.pIptPnum'), validator: validatePhone }],
    },
  },
  {
    title: t('user.telNum'),
    dataIndex: 'telephone',
    formProps: {
      type: 'input',
      placeholder: t('user.pIptMnum'),
      rules: [{ message: t('user.pIptMnum'), validator: validateTel }],
    },
  },
  {
    title: t('common.password'),
    dataIndex: 'password',
    formProps: {
      type: 'password',
      placeholder: t('common.pIptPwd'),
      mode: pwdLevelMode,
      rules: [
        {
          required: true,
          message: t('common.pIptPwd'),
          validator: (_, value) => validatePWD(value, state),
        },
      ],
    },
  },
  {
    title: t('common.pwdCirm'),
    dataIndex: 'password_p',
    formProps: {
      type: 'password',
      placeholder: t('common.iptPwdAg'),
      rules: [
        {
          required: true,
          message: t('common.pwdFail'),
          validator: (_, value) => validatePWDCheck(value, state),
        },
      ],
    },
  },
];
export { addModal, useFormItems };
export default initLdapForm;
