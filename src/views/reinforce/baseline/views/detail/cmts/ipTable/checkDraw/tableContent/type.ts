/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 17:37:50
 * @LastEditTime: 2023-03-02 20:59:23
 */
export interface I_Check_Filter {
  //检查项名称
  check_name: string;
  //检查项类别
  check_type: string | undefined;
  //检查结果
  check_result: number | undefined;
}
