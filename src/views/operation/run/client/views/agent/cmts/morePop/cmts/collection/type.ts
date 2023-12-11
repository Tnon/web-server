/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-06-12 13:44:48
 * @LastEditTime: 2023-06-26 13:55:46
 */
export const enum E_Select_Mode {
  Init = 1,
  All,
  None,
}
export interface I_Check_State {
  mode: E_Select_Mode;
  include: string[];
  exclude: string[];
  indeterminate: boolean;
}

export type T_Collection = 'process' | 'network' | 'memory' | 'file' | 'other';
