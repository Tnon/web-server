import addModal from './index.vue';
import { RuleObject } from 'ant-design-vue/es/form/interface';
import { TableColumn } from '@/types/tableColumn';
import { bytesLength } from '@/utils/tools';
const validateName = async (rule: RuleObject, value: string) => {
  if (bytesLength(value) > 40) {
    return Promise.reject();
  } else {
    return Promise.resolve();
  }
};
export const useFormItems = (T): TableColumn[] => [
  {
    dataIndex: 'group_name',
    formProps: {
      type: 'input',
      placeholder: T('operation.newGPlacPre') + ',' + T('operation.newGPlacNext'),
      rules: [
        { required: true, message: T('operation.newGPlacPre') },
        { validator: validateName, message: T('operation.newGPlacNext') },
      ],
    },
  },
];
export default addModal;
