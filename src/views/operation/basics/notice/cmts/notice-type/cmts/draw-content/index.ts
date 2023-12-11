/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-17 21:52:11
 * @LastEditTime: 2023-08-04 10:26:55
 */
import { setAcceptEnable } from '@/api/operation/notice';
import { E_NoticeType, E_Switch } from '../../type';
import drawContent from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import { userInfo } from '@/components/userInfo';
import { createVNode } from 'vue';
export const useColumns = (t: any, noticeType: E_NoticeType, getSmsEmailCfg: Fn): TableColumn[] => [
  {
    title: t('operation.tqy'),
    dataIndex: 'enable',
    width: 100,
    actions: [
      {
        type: 'switch',
        checked: (record) => record.switches && record.switches[noticeType] === E_Switch.Open,
        func: async ({ record }, callback) => {
          const switchesEnable =
            record.switches && record.switches[noticeType] === E_Switch.Open
              ? E_Switch.Close
              : E_Switch.Open;
          const { code } = await setAcceptEnable(
            {
              id: record.id,
              switches: {
                [noticeType]: switchesEnable,
              },
            },
            switchesEnable === E_Switch.Open,
          );
          if (!code) {
            callback();
            getSmsEmailCfg();
          }
        },
      },
    ],
  },
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
];

export default drawContent;
