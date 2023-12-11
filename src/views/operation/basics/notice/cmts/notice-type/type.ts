/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-17 11:21:04
 * @LastEditTime: 2023-07-17 11:31:40
 */
export const enum E_NoticeType {
  Alarm = 'alarm',
  Event = 'event',
  Filemonitor = 'filemonitor',
  Baitfile = 'baitfile',
  Sysmonitor = 'sysmonitor',
}
export const enum E_Switch {
  Open = 1,
  Close,
}
export interface I_NoticeStatic {
  type: E_NoticeType;
  icon: string;
  tips?: string;
  title: string;
  sms: boolean;
  email: boolean;
}
export interface I_NoticeRes {
  receivers: {
    id: number;
    name: string;
    email: string;
    mobile: string;
  }[];
  sms: E_Switch;
  email: E_Switch;
}
