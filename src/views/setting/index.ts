/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-09 17:23:32
 */
import { TableColumn } from '@/types/tableColumn';
import { validatePhoneOrTh } from '@/utils/reg';
export const useLoginInfo = (t: any): TableColumn[] => [
  {
    title: t('setting.pdtName'),
    dataIndex: 'name',
    formProps: {
      type: 'input',
      placeholder: t('setting.pNamePlac'),
      rules: [{ required: true, message: t('setting.pNamePlac') }],
    },
  },
  {
    title: t('setting.tecSup'),
    dataIndex: 'support',
    formProps: {
      type: 'input',
      placeholder: t('setting.pTecPlac'),
      rules: [{ required: true, message: t('setting.pTecPlac') }],
    },
  },
  {
    title: t('setting.conNum'),
    dataIndex: 'contact',
    formProps: {
      type: 'input',
      placeholder: t('setting.pNumPlac'),
      rules: [{ required: true, message: t('setting.pNumPlac'), validator: validatePhoneOrTh }],
    },
  },
];
