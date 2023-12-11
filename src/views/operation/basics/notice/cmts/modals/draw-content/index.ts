/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-17 21:52:11
 * @LastEditTime: 2023-10-26 20:05:45
 */
import { useModal } from '@/hooks/use-modal';
import drawContent from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import accepForm from './cmts/accepForm';
import { delAcceptUser, updataAcceptUser } from '@/api/operation/notice';
import { userInfo } from '@/components/userInfo';

export const useColumns = (t: any, refreshNoticeType): TableColumn[] => [
  {
    title: t('operation.jsr'), //接收人
    dataIndex: 'name',
    width: 200,
    customRender: ({ record }) =>
      createVNode(userInfo, {
        email: record.email,
        name: record.name,
      }),
  },
  {
    title: t('operation.sjh'), //手机号
    dataIndex: 'mobile',
    width: 200,
  },

  {
    title: t('common.action'), //操作
    dataIndex: 'action',
    fixed: 'right',
    width: 100,
    actions: [
      {
        type: 'icon',
        actionList: [
          {
            text: t('common.edit'),
            func: ({ record }, callback) => {
              useModal(
                {
                  title: t('operation.editMsg'),
                  handleOk: async (conRef) => {
                    await conRef.validate();
                    const { code } = await updataAcceptUser(
                      Object.assign({}, { id: record.id }, conRef.modelRef),
                    );
                    if (code) {
                      return Promise.reject();
                    }
                    !code && callback();
                    refreshNoticeType();
                  },
                  contentProps: {
                    name: record.name,
                    mobile: record.mobile,
                    email: record.email,
                    language: record.language,
                  },
                },
                createVNode(accepForm),
              );
            },
          },
          //删除
          {
            text: t('common.delete'),
            func: ({ record }, callback) => {
              useModal(
                {
                  title: t('operation.deleteReceiver'),
                  // wrapClassName: 'noheadModal',
                  // dangerButton: true,
                  handleOk: async () => {
                    const { code } = await delAcceptUser({ id: record.id + '' });
                    !code && callback();
                    refreshNoticeType();
                  },
                },
                createVNode(
                  'div',
                  {
                    style: {
                      // 'line-height': '48px',
                      // 'font-size': '16px',
                      // padding: '0 16px',
                      // 'font-weight': 600,
                      'word-break': 'break-all',
                      color: 'rgba(0, 0, 0, 0.6)',
                    },
                  },
                  t('operation.deluser', [record.name]),
                ),
              );
            },
          },
        ],
      },
    ],
  },
];

export default drawContent;
