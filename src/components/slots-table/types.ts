/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-16 09:29:48
 * @LastEditTime: 2022-04-12 11:36:43
 */
import { TableColumn } from '@/types/tableColumn';
import type { PaginationProps } from 'ant-design-vue/lib/pagination/Pagination';
import { ColumnProps, TableProps } from 'ant-design-vue/lib/table';
// import { ColumnProps, TableProps } from "ant-design-vue/lib/table";

export interface Columns extends ColumnProps {
  actions?: any;
  dataIndex: string;
}

export type PageOption = Partial<PaginationProps>;

export interface Props extends Omit<TableProps, 'columns'> {
  columns: TableColumn[];
  rowKey: string | ((record: any) => string);
  pageOption: PageOption;
  getListFunc: <T>(prams: T) => any;
  getCanSelectFunc?: (prams) => any;
  isCheck: boolean;
  arguments: any;
  extraFunc: ExtraFunc;
  customRow?: TableProps['customRow'];
  totalNum: number;
  allowCheckAll: boolean;
  disabledKeys: DisbKeys[];
}
export interface ExtraFunc {
  sortVsb?: boolean;
  dragRow?: boolean;
  dragCol?: boolean;
}

export interface DisbKeys {
  key: string;
  value: any;
}
interface rowSelection {
  preserveSelectedRowKeys: boolean;
  selectedRowKeys: string[];
  onChange(selectedRowKeys): void;
  onSelect(record, selected): void;
  onSelectAll(...rest): void;
  getCheckboxProps: (record) => any;
  columnWidth: number;
}
export interface TableRowSelection {
  rowSelection: undefined | rowSelection;
}
