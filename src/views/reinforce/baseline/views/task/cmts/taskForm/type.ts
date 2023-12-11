/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-24 14:22:18
 * @LastEditTime: 2023-03-06 16:08:43
 */
import { E_Host_Range, I_Host_Map } from '@/views/reinforce/baseline/cmts/tableContent/type';
export const enum E_Task_Type {
  Now = 1,
  Regular,
}
export const enum E_Round_Type {
  Day = 1,
  Week,
  Month,
}
export interface I_Task_Form {
  //任务名称
  name: string;
  //检查范围
  scope: E_Host_Range | undefined;
  //主机组
  host_group: string;
  //主机
  host_list: I_Host_Map[];
  //基线规则
  rule_codes: string | undefined;
  //任务类型
  exec_type: E_Task_Type | undefined;
  //执行周期
  exec_cycle: E_Round_Type | undefined;
  //周
  week: number | undefined;
  //时间
  time: string;
  //月
  month: number | undefined;
  //超时时间
  exceed: number | undefined;
  //任务描述
  description: string;
}
