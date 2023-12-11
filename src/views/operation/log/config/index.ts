/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-09-21 14:22:39
 * @LastEditTime: 2023-09-21 14:22:42
 */
import { TableColumn } from '@/types/tableColumn';
import { validateIp, ValidatePort } from '@/utils/reg';
export const useFormItems = (t: any): TableColumn[] => [
  {
    title: 'IP',
    dataIndex: 'ip',
    formProps: {
      type: 'input',
      placeholder: t('setting.ipPlac'),
      rules: [{ required: true, message: t('setting.ipPlac'), validator: validateIp }],
    },
  },
  {
    title: t('setting.port'),
    dataIndex: 'port',
    formProps: {
      type: 'input',
      placeholder: t('setting.portPlac'),
      rules: [{ required: true, message: t('setting.portPlac'), validator: ValidatePort }],
    },
  },
  {
    title: t('setting.agmY'),
    dataIndex: 'protocol',
    formProps: {
      type: 'select',
      placeholder: t('setting.proPlac'),
      options: [
        {
          value: 'udp',
          label: 'udp',
        },
        {
          value: 'tcp',
          label: 'tcp',
        },
      ],
      rules: [{ required: true, message: t('setting.proPlac') }],
    },
  },
];
