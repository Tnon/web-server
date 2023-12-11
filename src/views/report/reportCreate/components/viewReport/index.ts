/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-14 14:28:07
 * @LastEditTime: 2023-08-24 17:32:02
 */
import viewReport from './index.vue';
import { createVNode } from 'vue';
import { TableColumn } from '@/types/tableColumn';
import {
  GenerateStatus,
  GenerateStatuList,
  ReportType,
  GenerateStatuSendList,
} from '@/enums/reportType';
import { exportReportExcel } from '@/utils/tools';
import { deleteWordReport } from '@/api/report';

interface optionItem {
  value: number;
  label: string;
}
export const useSelectOptions = (t: any): { generateStatus: optionItem[] } => ({
  generateStatus: [
    {
      value: GenerateStatus.Generated,
      label: t('report.generated'), // 已生成
    },
    {
      value: GenerateStatus.Generating,
      label: t('report.generating'), // 生成中
    },
    {
      value: GenerateStatus.GenerateFailed,
      label: t('report.generateFailed'), // 生成失败
    },
  ],
});

export const useColumns = (t: any, category): TableColumn[] => [
  {
    title: t('report.reportName'), // 报告名称
    dataIndex: 'title',
    width: 150,
  },
  {
    title: t('report.generateTime'), // 生成时间
    dataIndex: 'create_at',
    width: 150,
    sorter: true,
  },
  {
    title: t('report.fileSize'), // 文件大小
    dataIndex: 'file_size',
    width: 150,
  },
  {
    title: t('report.statisticTimeRange'), // 统计时段
    dataIndex: 'time_period',
    width: 150,
  },
  {
    title: t('report.reportStatus'), // 生成状态
    dataIndex: 'status',
    width: 150,
    customRender: ({ text }) => createVNode('span', null, t(`${GenerateStatuList[text - 1]}`)),
  },
  {
    title: t('report.yjfszt'), // 邮件发送状态
    dataIndex: 'send_status',
    width: 150,
    customRender: ({ text }) => createVNode('span', null, t(`${GenerateStatuSendList[text - 1]}`)),
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    width: 200,
    fixed: 'right',
    actions: [
      {
        type: 'groups',
        actionList: [
          //下载
          {
            text: t('report.download'),
            type: 'popconfirm',
            // hidden: () => category === ReportType.Email,
            popConfirmText: (record) => t('report.reportDownloadTip', [record.title]),
            disabled: (record) =>
              record.status !== GenerateStatus.Generated || category === ReportType.Email,
            func: ({ record }) => {
              exportReportExcel(record.url, record.title);
            },
          },
          //删除
          {
            text: t('common.delete'),
            type: 'popconfirm',
            popConfirmText: (record) => t('report.reportDeleteTip', [record.title]),
            func: async ({ record }, callback) => {
              const { code } = await deleteWordReport(record.id + '');
              !code && callback();
            },
          },
        ],
      },
    ],
  },
];
export default viewReport;
