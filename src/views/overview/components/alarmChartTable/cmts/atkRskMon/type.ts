import { NOTICETYPE, ROUND } from '@/enums/attack_risk';

/*
 * @Author: Delavin.TnT
 * @LastEditors: dailuxin
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2022-09-23 18:36:25
 */
export interface Nodes {
  title: string;
  type: NOTICETYPE | ROUND;
}
export interface Options {
  LType: NOTICETYPE;
  RType: ROUND;
}
