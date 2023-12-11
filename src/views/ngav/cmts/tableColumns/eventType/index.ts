/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-20 15:01:31
 * @LastEditTime: 2022-09-29 11:39:18
 */
import eventType from './index.vue';
import icon_jsb from '@/assets/images/ngav/icon_jsb.svg';
import icon_lj from '@/assets/images/ngav/icon_lj.svg';
import icon_jh from '@/assets/images/ngav/icon_jh.svg';
import icon_jb from '@/assets/images/ngav/icon_jb.svg';
import icon_ycl from '@/assets/images/ngav/icon_ycl.svg';
import icon_wcl from '@/assets/images/ngav/icon_wcl.svg';
export const getHandledStatus = (
  handled: number,
  t: any,
): { className: string; text: string; iconType: string } => {
  const allStatus = [
    {
      //未处理
      className: 'warning',
      text: t('ngav.unhandle'),
      iconType: icon_wcl,
    },
    {
      //已加白
      className: 'primary',
      text: t('ngav.yjb'),
      iconType: icon_jb,
    },
    {
      //已加黑
      className: 'primary',
      text: t('ngav.yjh'),
      iconType: icon_jh,
    },
    {
      //拦截
      className: 'primary',
      text: t('ngav.lanj'),
      iconType: icon_lj,
    },
    {
      //已处理
      className: 'primary',
      text: t('ngav.ycl'),
      iconType: icon_ycl,
    },
    {
      //仅上报
      className: 'warning',
      text: t('ngav.onrep'),
      iconType: icon_jsb,
    },
  ];
  return allStatus[handled];
};
export default eventType;
