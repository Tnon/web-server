/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2022-10-25 14:05:27
 */
import { TableColumn } from '@/types/tableColumn';
import modifyModal from './index.vue';
import { validatePhone, validateTel } from '@/utils/reg/index';

interface Type {
  email: TableColumn[];
  mobile: TableColumn[];
  telephone: TableColumn[];
}
export const useFormItems = (t: any): Type => {
  return {
    email: [
      {
        dataIndex: 'email',
        formProps: {
          type: 'input',
          placeholder: t('user.pIptAcc'),
          rules: [{ required: true, message: t('user.pIptAcc') }],
        },
      },
    ],
    mobile: [
      {
        dataIndex: 'mobile',
        formProps: {
          type: 'input',
          placeholder: t('user.pIptPnum'),
          rules: [{ required: true, message: t('user.pIptPnum'), validator: validatePhone }],
        },
      },
    ],
    telephone: [
      {
        dataIndex: 'telephone',
        formProps: {
          type: 'input',
          placeholder: t('user.pIptMnum'),
          rules: [{ required: true, message: t('user.pIptMnum'), validator: validateTel }],
        },
      },
    ],
  };
};
export default modifyModal;
