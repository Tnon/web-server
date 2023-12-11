/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-26 11:47:00
 * @LastEditTime: 2022-11-16 17:13:51
 */
/**
 * @description: 移动位置
 */
export enum MoveEnum {
  TOP = -1,
  MID,
  BOTTOM,
}
/**
 * @description: 全部和未分组的ID
 */
export enum GROUPENUM {
  ALL = -1,
  UNGROUP,
}
/**
 * @description: 全部和自定义分组
 */
export const enum GROUPTYPE {
  ALL = 1,
  CUSTOM,
}

/**
 * @description: 分组操作集
 */
export enum OptionEnum {
  ADD = 'add',
  MOVE = 'move',
  LINE = 'line',
  RENAME = 'rename',
  DELETE = 'delete',
}
