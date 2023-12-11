/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-20 15:28:16
 * @LastEditTime: 2023-07-24 15:56:50
 */
export const enum E_Reinforce_Type {
  File = 1,
  Bait,
}
export const enum HandleType {
  UNHANDLE = 1,
  HANDLED,
}
export interface I_File_Filter {
  //处理类型
  handle: HandleType;
  // 影响主机
  ip_list: string;
  //执行进程
  process_list: string;
  //主机分组
  group_list: string;
  //时间范围
  date_range: string;
  //文件操作
  op_list: string;
  //加固 还是 诱饵
  risk_type: E_Reinforce_Type;
}
