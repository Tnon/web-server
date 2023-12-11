/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 17:37:50
 * @LastEditTime: 2023-03-02 20:04:05
 */
export interface I_Ip_Filter {
  // 主机ip
  ip: string;
  //主机组
  host_group: string;
  //检查结果
  check_result: number | undefined;
}
