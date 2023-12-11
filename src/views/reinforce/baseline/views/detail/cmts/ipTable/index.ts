/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 17:31:54
 * @LastEditTime: 2023-10-26 20:08:09
 */
import { TableColumn } from '@/types/tableColumn';
import ipTable from './index.vue';
import buttonGroups from '@/components/buttonGroups';
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import useCreatDraw from '@/hooks/use-click-row';
import checkDraw from './checkDraw';
export const useColumns = (t: any, session_id, rule_code, rule_name): TableColumn[] => [
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
    title: t('reinforce.wcdjcx'), //完成的检查项
    width: 200,
    dataIndex: 'total_check',
    customRender: ({ record }) =>
      createVNode('span', null, record.finish_check + ' / ' + record.total_check),
  },
  {
    title: t('reinforce.tgdjcx'), //通过的检查项
    width: 200,
    dataIndex: 'pass_check',
  },
  {
    title: t('reinforce.tgl'), //通过率
    width: 200,
    dataIndex: 'pass_percent',
    customHead: true,
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    width: 100,
    customRender: ({ record }) =>
      createVNode(buttonGroups, {
        actions: [
          {
            text: t('asset.lookOver'),
            callback: () => {
              useCreatDraw(
                {
                  title: rule_name,
                  contentProps: {
                    session_id,
                    mac: record.host_id,
                    rule_code,
                  },
                  width: 800,
                },
                checkDraw,
              );
            },
          },
        ],
      }),
  },
];
export default ipTable;
