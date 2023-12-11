/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-13 17:59:07
 */
import { ref } from 'vue';
import { PaginationProps } from 'ant-design-vue/lib/pagination/Pagination';
export interface PageOption extends Partial<PaginationProps> {
  current?: number;
  pageSize?: number;
  total?: number;
  pageSizeOptions?: string[]; // 指定每页可以显示多少条
  showSizeChanger?: boolean; // 显示可改变每页数量
  showQuickJumper?: boolean; // 是否显示跳转
  showTotal?: (total: number) => number; // 显示总数
  onChange?: (current, pageSize) => any; // 页码改变
  onShowSizeChange?: (current, pageSize) => any; // pageSize变化
  pageChange?: (current, pageSize) => any; // 页码或pageSize变化触发
  [key: string]: any;
}

export function usePages(T, pageOptions?: PageOption) {
  // 分页配置参数
  const pageOption = ref({
    current: 1, // 初始化当前页为第一页
    pageSize: 20, // 初始化每一页十条数据
    total: 0, // 初始化总数据为0条
    pageSizeOptions: ['20', '30', '40', '50', '100'], // 配置每页数据的可选参数
    showQuickJumper: true, // 是否可以快速跳转到某一页
    showSizeChanger: true, // 是否可以改变每页的数量，pageSizeOptions的生效与否
    showTotal: (total) => T('common.pageTotal', [total]), // 显示总数
    onChange: (current, pageSize) => pageOptions?.pageChange?.(current, pageSize), // 页码改变时候的回调
    onShowSizeChange: (current, pageSize) => pageOptions?.pageChange?.(current, pageSize), // pagesize变化后的回调
    ...pageOptions,
  });
  return pageOption;
}
