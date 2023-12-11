/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-08 11:00:58
 * @LastEditTime: 2023-07-10 15:26:09
 */
import api from '@/api/asset';
import { comLevel } from '@/components/attack-risk-cmts/com-level';
import { createVNode } from 'vue';
import riskDraw from '../cmts/riskDraw';
export const useOptions = (state: any, type: string, t: any): void => {
  state.columns = [
    {
      title: t(`asset.accountRisk${type}`),
      dataIndex: 'name',
      width: 200,
    },
    {
      title: t('arcomn.level'),
      dataIndex: 'level',
      sorter: true,
      width: 100,
      customRender: ({ record }) => createVNode(comLevel, { level: record.level }),
    },
    {
      title: t('asset.affectHostNum'),
      dataIndex: 'host_count',
      width: 200,
    },
    {
      title: t('asset.lookOver'),
      dataIndex: 'action',
      width: 100,
      customRender: ({ record }) =>
        createVNode(riskDraw, {
          title: record.name,
          uuid: record.uuid,
          type,
        }),
    },
  ];
  state.placeholder = t('asset.pInput', [t(`asset.${type}Name`)]);
  state.title = t(`asset.${type}Num`);
  state.api = api['api_' + type]['getAssetView'];
  state.type = type;
  state.assetTypeApi = '/api/report/' + type + '/assetview';
};
