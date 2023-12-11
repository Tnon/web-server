/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-10-27 16:59:10
 * @LastEditTime: 2022-06-21 15:11:21
 */
import { TableColumn } from '@/types/tableColumn';
import { exportLog } from '@/utils/tools';
import importExcel from './index.vue';
export const useEditColumns = (t): TableColumn[] => [
  {
    title: t('asset.iptTime'),
    dataIndex: 'created_at',
    width: 200,
  },
  {
    title: t('asset.iptResult'),
    dataIndex: 'status_text',
    width: 300,
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
    width: 100,
    actions: [
      {
        type: 'icon',
        actionList: [
          {
            text: t('common.download'),
            func: ({ record }) => {
              exportLog('/api/asset/host/downloadimportlog/' + record.id);
            },
          },
        ],
      },
    ],
  },
];
export default importExcel;
