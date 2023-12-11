/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 17:31:54
 * @LastEditTime: 2023-10-26 20:08:05
 */
import { TableColumn } from '@/types/tableColumn';
import tableContent from './index.vue';
import buttonGroups from '@/components/buttonGroups';
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import checkResult from './checkResult';
import { useModal } from '@/hooks';
import checkResultModal from '../../../checkResultModal';
export const useColumns = (t: any, session_id, check_code): TableColumn[] => [
  {
    title: t('common.hostIp'),
    width: 200,
    dataIndex: 'ip',
    customRender: ({ record }) =>
      createVNode(hostIp, {
        ip: record.ip,
        host_id: record.host_id,
        os: record.os || record.osver,
        online: record.online,
        hostname: record.hostname,
        nopop: record.deleted,
      }),
  },
  {
    title: t('strategy.hostg'), //主机组
    width: 200,
    dataIndex: 'group_kv_array',
    customRender: ({ text }) => createVNode('span', null, text && text.length ? text[0].name : '-'),
  },
  {
    title: t('reinforce.jcjg'), //检查结果
    dataIndex: 'check_result',
    width: 200,
    customRender: ({ text, record }) =>
      createVNode(checkResult, { type: text, reason: record.failure_reason }),
  },
  {
    title: t('common.action'),
    width: 100,
    dataIndex: 'action',
    customRender: ({ record }) =>
      createVNode(buttonGroups, {
        actions: [
          {
            text: t('asset.lookOver'),
            callback: () => {
              useModal(
                {
                  title: 'name+type',
                  width: 800,
                  footer: false,
                  wrapClassName: 'noheadModal',
                  contentProps: {
                    session_id,
                    check_code,
                    mac: record.host_id,
                  },
                },
                createVNode(checkResultModal),
              );
            },
          },
        ],
      }),
  },
];
export default tableContent;
