/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-20 15:58:47
 * @LastEditTime: 2022-09-20 21:00:41
 */
import attackPath from './index.vue';
export const getClassName = (levle: string) => {
  return ['warning', 'warning', 'mid', 'danger'][~~levle];
};
export default attackPath;
