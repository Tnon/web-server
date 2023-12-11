/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-06 14:54:02
 * @LastEditTime: 2022-12-16 10:23:58
 */
import { HANDLETYPE } from '@/enums/attack_risk';
import header from './index.vue';
export const getHandleTabs = (): Items[] => {
  return [
    //待处理
    {
      title: 'common.attrisUnhandle',
      type: HANDLETYPE.UNHANDLE,
    },

    //处理中
    {
      title: 'common.hdiningl',
      type: HANDLETYPE.HANDLING,
    },
    //确认
    {
      title: 'common.hcfml',
      type: HANDLETYPE.CONFIRM,
    },
    //忽略
    {
      title: 'common.ign',
      type: HANDLETYPE.IGNORE,
    },
  ];
};
export default header;
