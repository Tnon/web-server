/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-12 09:58:47
 * @LastEditTime: 2023-08-24 17:29:00
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import { ReportKindList, ReportType, TaskStatus, TaskStatusList } from '@/enums/reportType';
import { useModal } from '@/hooks';
import viewReport from './components/viewReport';
import {
  changeTaskStatus,
  deleteReportTask,
  editTaskRequest,
  getReportTaskRecord,
} from '@/api/report';
import groupDetail from './components/groupDetail';
import createTaskForm from './components/createTask';
import acceptEmailSend from './components/acceptEmailSend';
import { exportReportExcel, preendTrim } from '@/utils/tools';
export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('report.taskStatus'), // 任务状态
    dataIndex: 'status',
    width: 200,
    customRender: ({ text }) =>
      createVNode(
        'span',
        { style: { color: `${TaskStatusList[text - 1].split(',')[1]}` } },
        t(`${TaskStatusList[text - 1].split(',')[0]}`),
      ),
  },

  {
    title: t('report.taskName'), // 任务名
    dataIndex: 'title',
    width: 200,
  },
  {
    title: t('report.taskDescription'), // 任务描述
    dataIndex: 'desc_info',
    width: 200,
  },
  {
    title: t('report.createTime'), // 创建时间
    dataIndex: 'create_at',
    sorter: true,
    width: 200,
  },
  {
    title: t('report.taskType'), // 任务类型
    dataIndex: 'category',
    width: 200,
    customRender: ({ text }) =>
      createVNode('span', null, text === ReportType.Email ? t('report.emailt') : t('report.wordt')),
  },
  {
    title: t('report.tjpl'), // 统计频率
    dataIndex: 'type',
    width: 200,
    customRender: ({ text }) => createVNode('span', null, t(`${ReportKindList[text - 1]}`)),
  },
  {
    title: t('report.statisticRange'), // 统计范围
    dataIndex: 'entity_group_list',
    width: 200,
    customRender: ({ record, text }) =>
      createVNode(groupDetail, { all_group: record.all_group, entity_group_list: text }),
  },
  {
    title: t('report.useingTemplate'), // 使用模板
    dataIndex: 'report_template',
    width: 200,
  },
  {
    title: t('report.statisticCount'), // 统计报表数
    dataIndex: 'report_item_count',
    width: 200,
    customRender: ({ record, text }) =>
      createVNode('span', null, record.category === ReportType.Email ? '-' : text),
  },
  {
    title: t('report.updataTime'), // 更新时间
    dataIndex: 'update_time',
    sorter: true,
    width: 200,
  },

  {
    title: t('report.yjfs'), // 邮件发送
    dataIndex: 'send_email',
    width: 100,
    customRender: ({ text }) => createVNode('span', null, text ? t('report.is') : t('report.no')),
  },
  {
    title: t('report.acceml'), // 收件邮箱
    dataIndex: 'accept_email',
    width: 100,
    customRender: ({ text }) => (text ? createVNode(acceptEmailSend, { accept_email: text }) : 0),
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    width: 250,
    fixed: 'right',
    // customRender: ({ record }) => createVNode(taskBtnGroups, { record, refreshTable }),
    actions: [
      {
        type: 'groups',
        actionList: [
          //下载
          {
            text: t('report.download'),
            type: 'popconfirm',
            // hidden: () => category === ReportType.Email,
            popConfirmText: (record) => t('report.reportDownloadTip', [record.report_title]),
            disabled: (record) => !record.url || record.category === ReportType.Email,
            func: ({ record }) => {
              exportReportExcel(record.url, record.report_title);
            },
          },
          //查看报表
          {
            text: t('report.viewReport'),
            func: ({ record }) => {
              // 查看报表
              useModal(
                {
                  title: t('report.reportList'),
                  width: 1000,
                  footer: false,
                  contentProps: { taskId: record.id, category: record.category },
                  wrapClassName: 'noheadModal',
                },
                viewReport,
              );
            },
          },

          //更多
          {
            text: t('asset.more'),
            type: 'moreActions',
            actionList: [
              //编辑
              {
                text: t('common.edit'),
                func: async ({ record }, callback) => {
                  const { code, ...editFormState } = await getReportTaskRecord(record.id);
                  if (!code) {
                    // 查看报表
                    useModal(
                      {
                        title: t('common.edit'),
                        width: 800,
                        contentProps: {
                          editFormState,
                        },
                        handleOk: async (contentRef) => {
                          try {
                            await contentRef.validate();
                          } catch {
                            return Promise.reject('');
                          }
                          if (contentRef.formState.accept_email) {
                            contentRef.formState.accept_email = preendTrim(
                              contentRef.formState.accept_email.split(','),
                            ).join(',');
                          }
                          await editTaskRequest(
                            Object.assign({}, contentRef.formState, { id: record.id }),
                          );
                          callback();
                        },
                      },
                      createTaskForm,
                    );
                  }
                },
              },
              //删除任务
              {
                text: t('common.delete'),
                type: 'popconfirm',
                popConfirmText: (record) => t('report.taskDeleteTip', [record.title]),
                func: async ({ record }, callback) => {
                  const { code } = await deleteReportTask(record.id + '');
                  !code && callback();
                },
              },
              //执行任务
              {
                text: t('report.execute'),
                type: 'popconfirm',
                popConfirmText: (record) => t('report.taskExecuteTip', [record.title]),
                disabled: (record) => record.status !== TaskStatus.suspending,
                func: async ({ record }, callback) => {
                  const { code } = await changeTaskStatus({
                    id: record.id,
                    status: TaskStatus.executing,
                  });
                  !code && callback(true);
                },
              },
              //停止执行任务
              {
                text: t('report.stopExecute'),
                type: 'popconfirm',
                popConfirmText: (record) => t('report.stopExecuteTip', [record.title]),
                disabled: (record) => record.status !== TaskStatus.executing,
                func: async ({ record }, callback) => {
                  const { code } = await changeTaskStatus({
                    id: record.id,
                    status: TaskStatus.suspending,
                  });
                  !code && callback(true);
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
