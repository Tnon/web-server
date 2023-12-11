/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-29 18:59:59
 * @LastEditTime: 2022-10-19 17:19:30
 */
import { Agus } from '@/views/operation/asset/group/type';

export interface CuSelection {
  onChange: (selectedRowKeys, selectedRows) => void;
  selectedRowKeys: string[];
  getCheckboxProps: (record) => void;
}
export type SelfAgus = Agus;
export interface SlotTableProps {
  agms: Agus;
  boxType?: string;
  isCheck?: boolean;
  disabledKeys?: any;
}
