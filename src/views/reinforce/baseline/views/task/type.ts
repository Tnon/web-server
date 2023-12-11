import { I_Host_Map } from '../../cmts/tableContent/type';

/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-20 15:28:16
 * @LastEditTime: 2023-03-21 19:03:25
 */
export const enum E_Task_State {
  Runing = 1,
  Parse,
  Complete,
}
export const enum E_BatchOption {
  None,
  Parse,
  Run,
  Delete,
}

export interface I_Task_Filter {
  //任务名称
  task_name: string;
  //任务id
  task_id: number | undefined;
  //任务创建人
  create_user: number | undefined;
  //任务状态
  status: E_Task_State | undefined;
  //基线规则
  rule_codes: string | undefined;
  //主机组
  host_group: string;
  //主机
  host_list: I_Host_Map[];
  //
}
