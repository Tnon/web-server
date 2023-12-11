/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-14 11:06:33
 * @LastEditTime: 2023-10-26 20:08:39
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import viewPatchDetail from '@/views/reinforce/secpatch/cmts/viewPatchDetail';
export const useColumns = (t, patch_id: number): TableColumn[] => [
  {
    title: t('asset.hostIp'),
    dataIndex: 'ip',
    width: 200,
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
    title: t('operation.hostg'), //主机组
    dataIndex: 'host_group',
    width: 150,
  },

  {
    title: t('asset.fcfxsh'), //首次发现时间
    dataIndex: 'created_at',
    width: 200,
  },
  {
    title: t('asset.zhfxsj'), //最后更新时间
    dataIndex: 'updated_at',
    width: 200,
  },
  {
    title: t('reinforce.bdxq'),
    dataIndex: 'action',
    width: 150,
    customRender: ({ record }) =>
      createVNode(viewPatchDetail, {
        patch_id,
        host_id: record.host_id,
      }),
  },
];
