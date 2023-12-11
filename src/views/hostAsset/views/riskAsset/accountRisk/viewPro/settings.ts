/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-08 11:00:58
 * @LastEditTime: 2023-02-14 14:05:30
 */
import api from '@/api/asset';
export const useOptions = (state: any, type: string, t: any): void => {
  state.columns = [
    {
      title: t(`asset.${type}Account`),
      dataIndex: 'name',
      width: 200,
    },

    {
      title: t('asset.affectHostNum'),
      dataIndex: 'host_count',
      width: 200,
    },
  ];
  state.placeholder = t('asset.pInput', [t(`asset.${type}Name`)]);
  state.title = t(`asset.${type}Num`);
  state.api = api['api_' + type]['getAssetView'];
  state.type = type;
  state.assetTypeApi = '/api/report/' + type + '/assetview';
};
