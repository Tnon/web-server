import { TableColumn } from '@/types/tableColumn';
import { FormItem } from '@/types/schema';
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
export const useDataType = (t: any) => [
  {
    title: t('overview.alarm'),
    dataIndex: 'attack',
    icon: '#ax-Mnav-risk',
  },
  {
    title: t('overview.event'),
    dataIndex: 'risk',
    icon: '#ax-Mnav-attack',
  },
  {
    title: t('log.behavior'),
    dataIndex: 'behavior',
    icon: '#ax-wh-hostbehaviorjournal',
  },
  {
    title: t('menu.assets'),
    dataIndex: 'asset',
    icon: '#ax-Mnav-property',
  },
];
export const useRoundOptions = (t): FormItem[] => [
  {
    label: t('strategy.min', [30]),
    value: 30,
  },
  {
    label: t('strategy.hour', [1]),
    value: 60,
  },
  {
    label: t('strategy.hour', [2]),
    value: 120,
  },
  {
    label: t('strategy.hour', [6]),
    value: 360,
  },
  {
    label: t('strategy.hour', [12]),
    value: 720,
  },
  {
    label: t('strategy.hour', [24]),
    value: 1440,
  },
];

export const useWeekData = (): FormItem[] => [
  {
    label: 'Monday',
    value: 1,
  },
  {
    label: 'Tuesday',
    value: 2,
  },
  {
    label: 'Wednesday',
    value: 3,
  },
  {
    label: 'Thursday',
    value: 4,
  },
  {
    label: 'Friday',
    value: 5,
  },
  {
    label: 'Saturday',
    value: 6,
  },
  {
    label: 'Sunday',
    value: 0,
  },
];
