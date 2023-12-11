/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-08 11:00:58
 * @LastEditTime: 2022-11-02 11:45:34
 */
import api from '@/api/asset';
export const useOptions = (state: any, type: string, t: any): void => {
  state.columns = [
    {
      title: t(`asset.${type}Name`),
      dataIndex: 'name',
      width: 400,
    },
    {
      title: t(`asset.applyType`),
      dataIndex: 'type',
      hidden: type !== 'app',
      width: 400,
    },
    {
      title: t('asset.hostNum'),
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
