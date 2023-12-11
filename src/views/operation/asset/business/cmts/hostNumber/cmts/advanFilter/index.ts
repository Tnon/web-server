/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-29 15:19:59
 * @LastEditTime: 2022-10-19 17:03:20
 */
import { ONLINESTATUS, OSTYPE, SECURESTATUS } from '@/enums/assetsType';
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
