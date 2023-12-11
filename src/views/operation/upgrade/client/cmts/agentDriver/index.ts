/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-05 18:06:40
 * @LastEditTime: 2022-08-05 18:38:31
 */
import agentDriver from './index.vue';
interface DataState {
  title: string;
  version?: string;
  number: number;
  percent: string;
  color: string;
  key: number;
}
export type dataState = Record<'agent_upgraded_status' | 'driver_upgraded_status', DataState[]>;
export default agentDriver;
