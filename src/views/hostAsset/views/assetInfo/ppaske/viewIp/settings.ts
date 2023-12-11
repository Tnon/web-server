/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-08 11:00:58
 * @LastEditTime: 2022-07-01 15:18:22
 */
import api from '@/api/asset';
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import treeGroup from '@/components/treeGroupNp';
export const useOptions = (state: any, type: string, t: any) => {
  state.columns = [
    {
      title: t('common.hostIp'),
      dataIndex: 'ip',
      width: 250,
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
      title: t('common.group'),
      dataIndex: 'group_kv_array',
      width: 300,
      customRender: ({ record }) =>
        createVNode(treeGroup, { group_kv_path: record.group_kv_array }),
    },
    {
      width: 200,
      title: t(`asset.${type}Num`),
      dataIndex: 'count',
    },
  ];
  state.api = api['api_' + type]['getHostView'];
};
