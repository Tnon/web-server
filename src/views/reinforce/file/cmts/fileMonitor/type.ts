/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-21 11:23:41
 * @LastEditTime: 2023-03-24 10:59:13
 */
export const enum E_Monitor_State {
  Normal = 1,
  Error,
  Stop,
}
export const enum E_Monitor_Mode {
  Report = 1,
  PartInject,
  Inject,
}
export interface I_File_Monitor_Filter {
  //规则名称
  rule_name: string;
  //文件路径 输入 精确匹配
  file_path: string;
  //监控模式，多选 1，2，3
  monitor_mode: string;
  //监控状态 单选 1/2
  monitor_state: E_Monitor_State | undefined;
}
