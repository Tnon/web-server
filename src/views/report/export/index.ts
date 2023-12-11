/*
 * @Author: Caocong.dw
 * @LastEditors: Delevin.TnT
 * @Date: 2022-01-26 13:49:06
 * @LastEditTime: 2023-10-26 20:09:19
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import { statusType } from './component/statusType';
import { reportAction } from './component/reportAction';

export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('report.reportTime'),
    dataIndex: 'report_time',
    width: 150,
  },
  {
    title: t('report.reportFileType'),
    dataIndex: 'catagory',
    width: 100,
  },
  {
    title: t('report.reportFileName'),
    dataIndex: 'filename',
    width: 150,
  },
  {
    title: t('report.reportStatus'),
    dataIndex: 'status_text',
    width: 100,
    customRender: ({ record, text }) => createVNode(statusType, { status: record.status, text }),
  },
  {
    title: t('report.reportOption'),
    dataIndex: 'action',
    width: 100,
    customRender: ({ record }) =>
      createVNode(reportAction, {
        url: record.url,
        status: record.status,
        filename: record.filename,
      }),
  },
];
