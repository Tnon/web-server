/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-11 10:50:41
 * @LastEditTime: 2023-06-26 17:34:48
 */
import { UPCLIPKGTYPE } from '@/enums/assetsType';
export const tabTypes = [
  {
    title: 'operation.acdrengine',
    icon: '#ax-S-ACDR',
    type: UPCLIPKGTYPE.ACDR,
  },
  {
    title: 'operation.hashengine',
    icon: '#ax-engine-hash',
    type: UPCLIPKGTYPE.HASH,
  },
  {
    title: 'operation.baselineengine',
    icon: '#ax-S-yujiancejixian',
    type: UPCLIPKGTYPE.BASELINE,
  },
  {
    title: 'operation.raspengine',
    icon: '#ax-icon_yinqing-RASP',
    type: UPCLIPKGTYPE.RASP,
  },
  {
    title: 'operation.baselineenginerule',
    icon: '#ax-icon_yinqing-baseline',
    type: UPCLIPKGTYPE.BASELINERULE,
  },
  {
    title: 'operation.fxjcgzyq',
    icon: '#ax-icon_yinqing-riskdetection',
    type: UPCLIPKGTYPE.RISKCHECK,
  },
  // {
  //   title: 'operation.xnbdgzyq',
  //   icon: '#ax-S-yujiancejixian',
  //   type: UPCLIPKGTYPE.VRLPATCH,
  // },
];
