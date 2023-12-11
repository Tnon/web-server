/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-18 21:25:45
 * @LastEditTime: 2023-08-16 17:18:10
 */
export const enum E_ScanStatus {
  Init,
  Prepare,
  Scaning,
  Success,
  Error,
}
export const enum E_ScanType {
  ARP = 1,
  PING,
  NMAP,
}
