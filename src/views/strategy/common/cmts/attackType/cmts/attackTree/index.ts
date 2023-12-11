/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-17 19:25:07
 * @LastEditTime: 2022-12-17 19:27:01
 */
import attackTree from './index.vue';
import type { TreeProps } from 'ant-design-vue';
export const fieldNames: TreeProps['fieldNames'] = {
  children: 'items',
  title: 'name',
  key: 'path',
};
export default attackTree;
