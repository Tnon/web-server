/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-05 18:06:40
 * @LastEditTime: 2022-08-05 18:38:56
 */
import engineVersion from './index.vue';
interface DataState {
  title: string;
  version?: string;
  number: number;
  percent: string;
  color: string;
  key: number;
}
export type dataState = Record<'engine_upgrade_status', DataState[]>;
export default engineVersion;
