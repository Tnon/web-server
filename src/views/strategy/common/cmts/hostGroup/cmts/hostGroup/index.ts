/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-17 19:25:07
 * @LastEditTime: 2022-12-19 11:03:04
 */
import hostGroup from './index.vue';
import type { TreeProps } from 'ant-design-vue';
export const fieldNames: TreeProps['fieldNames'] = {
  children: 'items',
  title: 'name',
  key: 'id',
};

export default hostGroup;
