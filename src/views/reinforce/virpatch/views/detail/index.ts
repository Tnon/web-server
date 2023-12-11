/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-11-01 13:45:31
 */

import { useModal } from '@/hooks';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import vrlPatchHost from '../../cmts/vrlPatchHost';
import loopCodeDetail from '../../cmts/tableContent/cmts/loopCodeDetail';

export const useColumns = (t: any, refreshTable: Fn): TableColumn[] => [
  {
    title: t('reinforce.xnbdid'),
    dataIndex: 'patch_id',
    width: 150,
  },
  {
    title: t('reinforce.ldbh'),
    dataIndex: 'cve_code',
    width: 150,
    customRender: ({ record, text }) =>
      createVNode(loopCodeDetail, {
        showTitle: text,
        drawTitle: record.vul_name,
        record: {
          vul_id: record.vul_id,
        },
      }),
  },
  {
    title: t('asset.vulnerabilityName'),
    dataIndex: 'vul_name',
    width: 250,
  },
  {
    title: t('reinforce.ldyx'),
    dataIndex: 'vul_desc',
    width: 250,
  },
  {
    title: t('reinforce.xnbdlx'),
    dataIndex: 'patch_type',
    width: 150,
  },
  {
    title: t('arcomn.impactHost'),
    dataIndex: 'entity_count',
    width: 150,
  },
  {
    title: t('reinforce.yjczj'),
    dataIndex: 'entity_monitored',
    width: 150,
  },
  {
    title: t('reinforce.yfhzj'),
    dataIndex: 'entity_protected',
    width: 150,
  },
  {
    title: t('common.action'), //监控状态
    dataIndex: 'action',
    width: 200,
    customRender: ({ record }) =>
      createVNode(
        'span',
        {
          style: { color: '#18BA79', cursor: 'pointer' },
          onClick: () => {
            useModal(
              {
                title: t('reinforce.xnbdzjgl'),
                wrapClassName: 'noheadModal',
                width: 900,
                footer: false,
                contentProps: {
                  title: t('reinforce.xnbdzjgl'),
                  patch_id: record.patch_id,
                  refreshTable,
                },
              },
              vrlPatchHost,
            );
          },
        },
        t('common.edit'),
      ),
  },
];
