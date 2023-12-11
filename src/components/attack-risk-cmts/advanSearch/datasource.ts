/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-07 09:50:54
 * @LastEditTime: 2023-03-08 11:29:09
 */
import { HANDLESTATUS } from '@/enums/attack_risk';

export interface TreeDataItem {
  value: string;
  id: string;
  name?: string;
  disabled?: boolean;
  items?: TreeDataItem[];
}
export const getStatusData = (t): TreeDataItem[] => [
  {
    name: t('arcomn.LANJIEStatus'),
    value: t('arcomn.LANJIEStatus'),
    id: HANDLESTATUS.LANJIE + '',
  },
  // {
  //   name: t('arcomn.BLACKStatus'),
  //   value: t('arcomn.BLACKStatus'),
  //   id: HANDLESTATUS.BLACK + '',
  // },
  // {
  //   name: t('arcomn.WHITEStatus'),
  //   value: t('arcomn.WHITEStatus'),
  //   id: HANDLESTATUS.WHITE + '',
  // },
  {
    name: t('arcomn.SBAOStatus'),
    value: t('arcomn.SBAOStatus'),
    id: HANDLESTATUS.SHANGBAO + '',
  },
  // {
  //   name: t('arcomn.UNHANDLEStatus'),
  //   value: t('arcomn.UNHANDLEStatus'),
  //   id: HANDLESTATUS.UNHANDLE + '',
  // },
  {
    name: t('arcomn.GDANGStatus'),
    value: t('arcomn.GDANGStatus'),
    id: HANDLESTATUS.GUIDANG + '',
  },
];

export const formatItemsByName = (itmes) => {
  const targetArr: any = [];
  itmes.forEach((item) => {
    if (targetArr.every((ele) => ele.name != item.name)) {
      targetArr.push(item);
    } else {
      const index = targetArr.findIndex((ele) => ele.name === item.name);
      targetArr[index].id += ',' + item.id;
      targetArr[index].kind += ',' + item.kind;
      targetArr[index].num += item.num;
    }
  });
  return targetArr.sort((a, b) => b.num - a.num);
};
export const getPolicyOptions = (t) => {
  return [
    {
      //自动处置
      label: t('arcomn.autohandle'),
      value: '1',
    },
    {
      //检测加白
      label: t('arcomn.jcjb'),
      value: '2',
    },
  ];
};
