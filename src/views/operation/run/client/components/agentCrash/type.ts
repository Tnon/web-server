/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-01 14:56:27
 * @LastEditTime: 2023-08-01 14:59:16
 */
export const enum E_CrashType {
  Normal,
  AbnRestart,
  CpuMemErr,
}
export interface I_CrashState {
  type: E_CrashType;
  stoptime: string;
}
