import { I_Host_Map } from '@/views/reinforce/baseline/cmts/tableContent/type';
import { E_Bait_Mode } from '../../../rule/type';

/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-22 14:54:31
 * @LastEditTime: 2023-07-25 14:02:26
 */
export const enum E_File_Action {
  Read = 1, //读取
  Write, //写入
  Exec, //执行
  Rename, //重命名
  Hide, //隐藏
  Delete, //删除
  Create, //创建
  Link, //链接
  ChAttr, //属性比昂
  ChPerm, //权限变更
}
export const enum E_File_Mode {
  Monitor = 1,
  NoMonitor,
}
export interface I_Form_Data {
  // 详情
  rule_name: string; // 规则名称
  desc: string; // 规则备注
  dir_path: string[]; // 目录创建
  file_format: string[]; // 文件格式
  monitor_mod: E_Bait_Mode | undefined; //监控模式
  probes: { type: E_File_Action; value: E_File_Mode }[]; //选项
  alarm_level: number | undefined; // 告警等级: 1: 低; 2: 中; 3: 高
  apply_type: number | undefined; // 应用维度: 1: 全部主机; 2: 分组; 3: 主机
  host_group: string; // 分组ID列表
  host_list: I_Host_Map[]; // 主机mac列表
}
