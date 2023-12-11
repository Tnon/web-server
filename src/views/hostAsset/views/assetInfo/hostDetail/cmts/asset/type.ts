/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-07 19:52:38
 * @LastEditTime: 2023-07-19 11:19:55
 */
import { TableColumn } from '@/types/tableColumn';
export interface OthSta {
  actived: string;
  columns: TableColumn[];
  placeHodler: string;
  api: (...rest) => Promise<any>;
}
export interface Agus {
  name: string;
  host_id: string;
}
export interface Nodes {
  title?: string;
  columns: TableColumn[];
  place: string;
  api: (...rest) => Promise<any>;
}
export type Ftypes =
  | 'process'
  | 'port'
  | 'account'
  | 'service'
  | 'kernel'
  | 'environment'
  // | 'share' // 1025去掉共享文件夹
  | 'webservice'
  | 'webframe'
  | 'website'
  | 'webapp'
  | 'app'
  | 'package'
  | 'jar'
  | 'python'
  | 'xinetd'
  | 'webjs'
  | 'webapi'
  | 'npm'
  | 'task'
  | 'database';
export type FilterColumns = Record<Ftypes, Nodes>;
