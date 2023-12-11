/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-28 16:34:45
 * @LastEditTime: 2023-03-21 14:02:13
 */
import { NodeLevel } from '../antFlow/tools/type';

export interface I_Attack_TimeLine {
  node_start_time: string; //节点时间
  action: string; //行为名称
  same_flag: number; //等级颜色
  level: NodeLevel;
}
