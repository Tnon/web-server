/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-27 19:58:18
 * @LastEditTime: 2023-03-02 18:22:45
 */
export interface I_Check_Filter {
  session_id: number;
  check_name: string; //检查项名称
  check_type: string | undefined; //检查项类别
}
