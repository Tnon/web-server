/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-11-26 17:46:55
 * @LastEditTime: 2023-06-29 11:49:35
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import manageAddress from './cmts/manageAddress';
import notMigrate from './cmts/notMigrate';

export const useColumns = (t, reload: Function): TableColumn[] => [
  {
    title: t('setting.migGrp'),
    dataIndex: 'group_name',
    width: 150,
  },
  {
    title: t('setting.manaUrl'),
    dataIndex: 'new_host',
    width: 400,
    customRender: ({ record }) =>
      createVNode(manageAddress, {
        ipGroup: record.new_host.split(','),
        group_id: record.group_id,
        reload,
      }),
  },
  {
    title: t('setting.migTime'),
    dataIndex: 'updated_at',
    width: 200,
  },
  {
    title: t('setting.noMig'),
    dataIndex: 'uneffected',
    customHead: true,
    width: 100,
    customRender: ({ record }) =>
      createVNode(notMigrate, {
        uneffected: record.uneffected,
        group_id: record.group_id,
        reload,
      }),
  },
  {
    title: t('setting.migTotal'),
    dataIndex: 'total',
    width: 100,
  },
];
