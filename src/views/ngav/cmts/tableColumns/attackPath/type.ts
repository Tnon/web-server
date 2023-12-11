/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-26 15:37:01
 * @LastEditTime: 2022-09-26 15:38:50
 */
//进程链
export interface AttackPath {
  process_name: string;
}
//攻击路径结构体
export interface AttackState {
  //当前攻击路径的次数
  act_recount: number;
  //当前风险行为的次数
  act_num: number;
  //当前攻击路径的子进程列表
  pid_info_list: AttackPath[];
  //当前攻击路径的id
  act_path_sha256: string;
  //当前攻击路径的name
  act_path_name: string;
}
[];
