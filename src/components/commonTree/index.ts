/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-11-30 14:57:11
 */
import type { TreeProps } from 'ant-design-vue';
import commonTree from './index.vue';
export const fieldNames: TreeProps['fieldNames'] = {
  children: 'items',
  title: 'name',
  key: 'path',
};
export default commonTree;
