/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-25 16:54:35
 * @LastEditTime: 2022-12-25 14:33:49
 */
import processView from './index.vue';
export const getHandleTabs = (): Items[] => {
  return [
    //基础信息
    {
      title: 'ngav.basinfo',
      type: 'baseinfo',
    },

    //处置记录
    {
      title: 'arcomn.handreoc',
      type: 'timeline',
    },
  ];
};
export default processView;
