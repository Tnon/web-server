/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-18 18:48:00
 * @LastEditTime: 2022-11-02 11:08:17
 */
import { getOsList } from '@/api/asset/hostInfo/host';
export const useOptions = (state: any, t: any): void => {
  state.columns = [
    {
      title: t(`asset.systemInfo`),
      dataIndex: 'os',
      width: 400,
    },
    {
      title: t('asset.hostNum'),
      dataIndex: 'count',
      width: 200,
    },
  ];
  state.placeholder = t('asset.pInput', [t(`asset.systemInfo`)]);
  state.title = t(`asset.systemNum`);
  state.api = getOsList;
  state.assetTypeApi = '/api/report/oscount';
};
