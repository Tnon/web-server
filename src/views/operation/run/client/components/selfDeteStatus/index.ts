import selfDeteStatus from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
export const useColumns = (t): TableColumn[] => [
  {
    title: t('operation.name'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: t('operation.status'),
    dataIndex: 'status',
    key: 'status',
    customRender: ({ text }) =>
      createVNode(
        'span',
        {
          style: { color: text ? '#18b666' : '#FF0000' },
        },
        text ? t('operation.fileIsNormal') : t('operation.fileIsMissing'),
      ),
  },
];

export default selfDeteStatus;
