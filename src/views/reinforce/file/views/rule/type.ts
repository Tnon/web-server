/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-20 15:28:16
 * @LastEditTime: 2023-02-27 15:02:53
 */
export const enum E_Enabled {
  Open = 1,
  Close,
}
export const enum E_Alarm_Level {
  Low = 1,
  Middle,
  High,
}
export const enum E_Rule_Type {
  Preset = 1,
  Custom,
}
export const enum E_BatchOption {
  None = '',
  Open = 'open',
  Close = 'close',
  Delete = 'delete',
}

export interface I_Rule_Filter {
  rule_name: string; // "规则1"
  file_path: string; // "/bin/bash"
  proc_exclude: string; // "bash"
  host_group: string; // "2,3,5,7"
  ip_list: string; // "ip1,ip2,ip3"
  enabled: E_Enabled | undefined; // 1: 启用; 2: 禁用
  alarm_level: E_Alarm_Level | undefined; // 1: 低危; 2: 中危; 3: 高危
  rule_type: E_Rule_Type | undefined; // 1: 预置; 2: 自定义
}
