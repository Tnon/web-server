/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-08 10:35:13
 * @LastEditTime: 2022-11-23 12:48:58
 */
import { SERVERUPGRADESTATUS } from '../upgradeStatus';
export interface UpgredeState {
  update_status: SERVERUPGRADESTATUS;
  module: string;
  old_version: string;
  version: string;
}
export const enum UnPackStatus {
  Init,
  Unpacking,
  Success,
  Error,
}
