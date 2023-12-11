/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-26 11:47:00
 * @LastEditTime: 2023-07-24 11:23:29
 */
export type ServerUploadState = Record<
  'agent' | 'server',
  {
    progress: number;
    speed: number;
    timeRemaining: number;
  }
>;
