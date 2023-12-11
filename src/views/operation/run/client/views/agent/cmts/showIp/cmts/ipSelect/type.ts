/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-25 15:02:02
 * @LastEditTime: 2023-08-25 16:14:22
 */
export interface I_Ip_Types {
  label: string;
  id: string | number;
  children?: I_Ip_Types[];
}
