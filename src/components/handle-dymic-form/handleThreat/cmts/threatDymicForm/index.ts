/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-09 10:51:53
 * @LastEditTime: 2023-02-15 13:43:13
 */
import threatDymicFrom from './index.vue';
import { filter } from '@/utils/tools';
export const getHandleMethodOptions = (t, dispose_kind_list) => {
  const staticOptions = [
    {
      label: t('arcomn.lanjpr'),
      value: 1,
    },
    {
      label: t('arcomn.glwj'),
      value: 2,
    },
    {
      label: t('arcomn.glzj'),
      value: 3,
    },
  ];
  // 1 拦截进程  2 隔离文件  3 隔离主机
  if (dispose_kind_list && dispose_kind_list.length) {
    return filter(staticOptions, (ele) => dispose_kind_list.includes(ele.value));
  }
  return [];
};
export default threatDymicFrom;
