/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 11:44:49
 * @LastEditTime: 2023-03-06 15:39:30
 */
export interface I_BaseLine_Filter {
  //任务名称
  task_name: string;
  //任务创建人
  create_user: number | undefined;
  //时间范围
  date_range: string;
  //基线规则
  baseline_rule: string;
  //检查范围 主机组
  host_group: string;
  //检查范围 主机
  host_list: I_Host_Map[];
}

export const enum E_Host_Range {
  All = 1,
  Group,
  Host,
}
export interface I_Host_Map {
  ip: string;
  mac: string;
}
