/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-14 11:06:33
 * @LastEditTime: 2023-10-26 20:08:34
 */
import { TableColumn } from '@/types/tableColumn';
import hostCount from './cmts/hostCount';
import { createVNode } from 'vue';
import vulLevel from '@/views/hostAsset/components/vulLevel';
import { vulRiskLevel } from '@/enums/assetsType';

export const useColumns = (t): TableColumn[] => [
  {
    title: t('reinforce.bdmc'),
    dataIndex: 'title',
    width: 150,
  },
  {
    title: t('reinforce.bdbh'),
    dataIndex: 'patch_code',
    width: 150,
  },
  {
    title: t('asset.drawercveCode'), //
    dataIndex: 'vul_cve_code',
    width: 150,
  },
  {
    title: t('reinforce.wxcd'),
    dataIndex: 'vul_level',
    sorter: true,
    width: 150,
    customRender: ({ text }) =>
      !text ? '-' : createVNode(vulLevel, { colorList: vulRiskLevel, level: text }),
  },
  {
    title: t('reinforce.wxlx'),
    dataIndex: 'vul_type',
    width: 150,
  },
  {
    title: t('arcomn.impactHost'),
    dataIndex: 'affected_entity_count',
    width: 150,
    sorter: true,
    customRender: ({ text, record }) =>
      createVNode(hostCount, {
        hostCount: text,
        patchName: record.title,
        patch_id: record.patch_id,
      }),
  },
  {
    title: t('reinforce.bdfbsj'),
    dataIndex: 'public_date',
    width: 150,
  },
];
