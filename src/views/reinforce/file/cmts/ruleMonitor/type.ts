/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-21 11:23:41
 * @LastEditTime: 2023-03-21 15:55:00
 */

import { E_Monitor_State } from '../fileMonitor/type';
export const enum E_Monitor_Mode {
  Report = 1,
  PartInject,
  Inject,
}
export interface I_Rule_Monitor_Filter {
  //文件路径 输入 精确匹配
  file_path: string;
  //主机组 多选
  host_group: string;
  //主机 逗号隔开的ip
  ip_list: string;
  //监控模式，多选 1，2，3
  monitor_mode: string;
  //监控状态 单选 1/2
  monitor_state: E_Monitor_State | undefined;
}
