/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-29 16:02:32
 * @LastEditTime: 2023-09-14 18:39:34
 */
import addCollCfg from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import { bytesLength } from '@/utils/tools';
export const validateName = async (_, value: string) => {
  if (bytesLength(value) > 100 || !value) {
    return Promise.reject();
  } else {
    return Promise.resolve();
  }
};
export const useFormItems = (t): TableColumn[] => [
  {
    title: t('operation.sjlj'),
    dataIndex: 'type',
    formProps: {
      type: 'input',
      placeholder: t('operation.sjljplac'),
      rules: [{ validator: validateName, message: t('operation.rzlxpltip') }],
    },
  },
  {
    title: t('operation.yyfw'),
    dataIndex: 'flag',
    formProps: {
      type: 'select',
      placeholder: t('operation.yyfwpacl'),
      rules: [{ validator: validateName, message: t('operation.rzlxpltips') }],
    },
  },
  {
    title: t('operation.rzsm'),
    dataIndex: 'mark',
    formProps: {
      type: 'textarea',
      placeholder: t('operation.rzsmplac'),
    },
  },
];
export default addCollCfg;
