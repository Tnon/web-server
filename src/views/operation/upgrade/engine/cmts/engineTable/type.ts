/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2022-08-24 11:24:39
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import treeGroup from '@/components/treeGroupNp';
import engineUpdate from './cmts/engineUpdate';
import { batchUpgradeEngine } from '@/api/operation/run';
import { UPCLIPKGTYPE } from '@/enums/assetsType';
export const useColumns = (t, reload, type): TableColumn[] => [
  {
    title: t('common.hostIp'),
    dataIndex: 'ip',
    width: 200,
    sorter: true,
    customRender: ({ record }) =>
      createVNode(hostIp, {
        ip: record.ip,
        host_id: record.host_id,
        os: record.os || record.osver,
        online: record.online,
        hostname: record.hostname,
      }),
  },
  {
    title: t('operation.belGrp'),
    dataIndex: 'group_kv_path',
    sorter: true,
    width: 200,
    customRender: ({ text: group_kv_path }) => createVNode(treeGroup, { group_kv_path }),
  },
  {
    title: type === UPCLIPKGTYPE.HASH ? t('operation.enginupd') : t('operation.libver'),
    dataIndex: 'engine_upgrade_status',
    sorter: true,
    width: 200,
    customRender: ({ text, record }) =>
      createVNode(engineUpdate, {
        type: text,
        engine_version: record.engine_version,
        engine_abn_reason: record.engine_abn_reason,
      }),
  },
  {
    title: t('operation.updatetime'),
    dataIndex: 'engine_upgrade_time',
    sorter: true,
    width: 200,
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
    width: 100,
    actions: [
      {
        type: 'icon',
        disabled: (record) => record.engine_upgradable === 2,
        actionList: [
          {
            text:
              type === UPCLIPKGTYPE.HASH ? t('operation.updaengine') : t('operation.updaengineLib'),
            func: async ({ record }) => {
              await batchUpgradeEngine({ filter: { type }, include: record.host_id, exclude: '' });
              reload();
            },
          },
        ],
      },
    ],
  },
];
