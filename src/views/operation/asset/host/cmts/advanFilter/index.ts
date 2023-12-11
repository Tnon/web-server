/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-29 15:19:59
 * @LastEditTime: 2023-02-14 11:05:44
 */
import { ONLINESTATUS, OSTYPE, SECURESTATUS, ASSETSTATUS } from '@/enums/assetsType';
import advanFilter from './index.vue';
interface FItems {
  label: string;
  key: string;
  filters: Items[];
}
export const formItems: FItems[] = [
  {
    //在线状态
    label: 'common.onlineStau',
    key: 'swtOnline',
    filters: [
      {
        title: 'common.all',
        type: ONLINESTATUS.ALL,
      },
      {
        title: 'common.onLine',
        type: ONLINESTATUS.ONLINE,
      },
      {
        title: 'common.offLine',
        type: ONLINESTATUS.OFFLINE,
      },
      {
        title: 'common.uninstall',
        type: ONLINESTATUS.UNINSTALL,
      },
    ],
  },
  {
    //安全状态
    label: 'asset.hsfsta',
    key: 'swtStatus',
    filters: [
      {
        title: 'common.all',
        type: SECURESTATUS.ALL,
      },
      {
        title: 'asset.safe',
        type: SECURESTATUS.HEALTHY,
      },
      {
        title: 'common.czattacked',
        type: SECURESTATUS.ALARM,
      },
      {
        title: 'common.czatRisk',
        type: SECURESTATUS.ACDR,
      },
    ],
  },

  //屏蔽windows
  // {
  //   // 操作系统
  //   label: 'common.system',
  //   key: 'swtSystem',
  //   filters: [
  //     {
  //       title: 'common.all',
  //       type: OSTYPE.ALL,
  //     },
  //     {
  //       title: 'common.windows',
  //       type: OSTYPE.WINDOWS,
  //     },
  //     {
  //       title: 'common.linux',
  //       type: OSTYPE.LINUX,
  //     },
  //   ],
  // },
  {
    // 资产状态
    label: 'asset.assetsafe',
    key: 'swtAssetStatus',
    filters: [
      {
        title: 'common.all',
        type: ASSETSTATUS.ALL,
      },
      {
        title: 'asset.safe',
        type: ASSETSTATUS.SAFE,
      },
      {
        title: 'asset.haveVulty',
        type: ASSETSTATUS.HAVEVULTY,
      },
    ],
  },
];

export interface ADprops {
  secure_status: SECURESTATUS;
  online: ONLINESTATUS;
  osver: OSTYPE;
  groups: string;
  group: number;
  update_time: string;
  swtchecked: boolean;
  tags: string;
}
export default advanFilter;
