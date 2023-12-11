/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-06 14:18:14
 * @LastEditTime: 2023-02-27 19:32:45
 */
import { TableColumn } from '@/types/tableColumn';
import { getPolicyNameApi } from '@/views/strategy/index';
import { createVNode } from 'vue';
import viewStrategyDetail from './cmts/viewStrategyDetail';

export const useColumns = (t): TableColumn[] => [
  {
    title: t('asset.stagyName'),
    dataIndex: 'policy_name',
    width: 200,
  },
  {
    title: t('asset.stagyType'),
    dataIndex: 'policy_type',
    width: 200,
    customRender: ({ text }) => getPolicyNameApi(t, text),
  },
  {
    title: t('asset.effStau'),
    dataIndex: 'status',
    width: 150,
    customRender: ({ text }) =>
      createVNode(
        'span',
        { style: { color: !text ? '#F8A04C' : '#18BA79' } },
        text ? t('asset.effeVe') : t('asset.notEffe'),
      ),
  },
  {
    title: t('asset.applyType'),
    dataIndex: 'apply_type',
    width: 150,
    customRender: ({ text }) => createVNode('span', {}, text ? t('common.group') : t('asset.host')),
  },
  {
    title: t('asset.poliSrc'),
    dataIndex: 'source',
    width: 200,
    customRender: ({ text }) =>
      createVNode('span', {}, text ? t('asset.userDef') : t('asset.dftTmp')),
  },
  {
    title: t('asset.updDate'),
    dataIndex: 'updated_at',
    width: 200,
  },
  {
    title: t('common.action'),
    dataIndex: 'policy_type',
    width: 100,
    customRender: ({ text, record }) =>
      createVNode(viewStrategyDetail, { policy_type: text, policy_id: record.policy_id }),
  },
];
