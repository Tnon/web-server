import addModal from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import { bytesLength } from '@/utils/tools';
const validateName = async (_, value: string) => {
  if (bytesLength(value) >= 4 && bytesLength(value) <= 40) {
    return Promise.resolve();
  }
  return Promise.reject();
};
export const useFormItems = (T): TableColumn[] => [
  {
    dataIndex: 'name',
    formProps: {
      type: 'input',
      placeholder: T('strategy.strPlac'),
      rules: [{ validator: validateName, message: T('strategy.strPlac') }],
    },
  },
];
export default addModal;
