/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-07 17:05:50
 * @LastEditTime: 2021-08-05 09:28:10
 */
import customTag from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import { ValidateTag } from '@/utils/reg';
export const useFormItems = (t): TableColumn[] => [
  {
    dataIndex: 'tagName',
    formProps: {
      type: 'input',
      // placeholder: '请输入主机标签名称，长度为1-15个字符',
      placeholder: t('asset.htghder'),
      rules: [
        {
          // message: '请输入正确的主机标签名称（1-15个字符）',
          message: t('asset.htghrder'),
          validator: ValidateTag,
        },
      ],
    },
  },
];
export default customTag;
