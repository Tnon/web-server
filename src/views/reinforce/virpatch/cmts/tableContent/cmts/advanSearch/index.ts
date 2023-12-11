/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-20 15:18:44
 * @LastEditTime: 2023-04-28 16:03:17
 */
import { E_Handle_Status } from '../../type';
import advanSearch from './index.vue';
export const getHandleConfigs = (t) => {
  return [
    {
      label: t('arcomn.SBAOStatus'),
      value: E_Handle_Status.SBao,
    },
    {
      label: t('arcomn.LANJIEStatus'),
      value: E_Handle_Status.Ljie,
    },
  ];
};
export default advanSearch;
