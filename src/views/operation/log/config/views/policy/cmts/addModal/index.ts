/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-29 16:02:32
 * @LastEditTime: 2023-09-14 15:23:08
 */
import addModal from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import { bytesLength } from '@/utils/tools';
const validateName = async (_, value: string) => {
  if (bytesLength(value) > 100 || !value) {
    return Promise.reject();
  } else {
    return Promise.resolve();
  }
};
export const useFormItems = (t): TableColumn[] => [
  {
    title: t('operation.rzlx'),
    dataIndex: 'name',
    formProps: {
      type: 'input',
      placeholder: t('operation.xzrilx'),
      rules: [{ validator: validateName, message: t('operation.rzlxpltip') }],
    },
  },
  {
    title: t('operation.rzbs'),
    dataIndex: 'flag',
    formProps: {
      type: 'input',
      placeholder: t('operation.rzbsplac'),
      rules: [{ validator: validateName, message: t('operation.rzlxpltips') }],
    },
  },
  {
    title: t('operation.rzsm'),
    dataIndex: 'desc',
    formProps: {
      type: 'textarea',
      placeholder: t('operation.rzsmplac'),
    },
  },
];
export default addModal;
