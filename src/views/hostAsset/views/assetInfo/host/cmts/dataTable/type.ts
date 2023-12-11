/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-29 18:59:59
 * @LastEditTime: 2021-07-07 09:59:09
 */
import type { Agus } from '@/views/assets/views/host/type';
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
