/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-14 11:06:33
 * @LastEditTime: 2023-10-26 20:08:57
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import viewPatchDetail from '@/views/reinforce/secpatch/cmts/viewPatchDetail';
import { vulRiskLevel } from '@/enums/assetsType';
import vulLevel from '@/views/hostAsset/components/vulLevel';
export const useColumns = (t, host_id): TableColumn[] => [
  {
    title: t('reinforce.bdmc'),
    dataIndex: 'title',
    width: 150,
  },
  {
    title: t('reinforce.bdbh'), //
    dataIndex: 'patch_code',
    width: 150,
  },
  {
    title: t('asset.drawercveCode'), //
    dataIndex: 'vul_cve_code',
    width: 150,
  },
  {
    title: t('reinforce.wxcd'), //
    dataIndex: 'vul_level',
    width: 150,
    sorter: true,
    customRender: ({ text }) =>
      !text ? '-' : createVNode(vulLevel, { colorList: vulRiskLevel, level: text }),
  },
  {
    title: t('reinforce.wxlx'), //
    dataIndex: 'vul_type',
    width: 150,
  },
  {
    title: t('reinforce.bdfbsj'), //
    dataIndex: 'public_date',
    width: 200,
  },
  {
    title: t('asset.fcfxsh'), //
    dataIndex: 'created_at',
    width: 200,
  },
  {
    title: t('asset.zhfxsj'), //
    dataIndex: 'updated_at',
    sorter: true,
    width: 200,
  },
  {
    title: t('reinforce.bdxq'),
    dataIndex: 'action',
    width: 150,
    customRender: ({ record }) =>
      createVNode(viewPatchDetail, {
        patch_id: record.patch_id,
        host_id: host_id,
      }),
  },
];
