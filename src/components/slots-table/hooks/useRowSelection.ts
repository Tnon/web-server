/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-26 20:42:01
 * @LastEditTime: 2023-11-10 11:57:57
 */
import { reactive, unref, computed } from 'vue';
import { useSelectAll as useSelectAllStore } from '@/store/modules/select-all';
import { isString } from '@/utils/is';
import { DisbKeys, TableRowSelection } from '../types';

const selectAllStore = useSelectAllStore();
const isSelectAll = computed(() => selectAllStore.isSelectAll);

//获取取消选择的ids
const excludeHostIds: any = computed(() => selectAllStore.exclude);
const state = reactive<TableRowSelection>({
  rowSelection: undefined,
});
export const useRowSelection = (
  rowkey: string | ((record: any) => string),
  isCheck: boolean,
  disabledKeys: DisbKeys[],
): any => {
  //先初始化 防止自己选完，再全选时候 重复存储
  selectAllStore.InitExclude();
  selectAllStore.setIselectAll(false);
  if (state.rowSelection && !isCheck) {
    state.rowSelection!.selectedRowKeys = [];
  }
  if (isCheck) {
    // 自定义配置选项
    state.rowSelection = {
      columnWidth: 60, // 自定义列表选择框的宽度
      preserveSelectedRowKeys: true, // 当数据被删除时仍然保留选项的 key
      selectedRowKeys: [], // 指定选中项的key组成的数组一般是id
      onChange: (selectedRowKeys) => {
        // 当选中项变化的时候发生的回调，两个参数还有一个是selectedRows,当前行信息是一个proxy
        state.rowSelection!.selectedRowKeys = selectedRowKeys;
      },
      onSelect: (record, selected) => {
        // 手动选择/取消某一列的回调四个参数record：当前行信息。selected：当前行是否选中，选中是true,未选中是false。 nativeEvent：当前行信息是一个proxy对象。 selectedRows:和onChange里面的不一样，是一个事件，打印出来看吧
        const key = isString(rowkey) ? record[rowkey] : rowkey(record);
        if (unref(isSelectAll)) {
          if (selected) {
            selectAllStore.DelExclude(key);
          } else {
            selectAllStore.AddExclude([key]);
          }
        }
      },
      onSelectAll: (selected, _, changeRows) => {
        //上方勾选当前页全部选中selected：是否勾选，true勾选，false没有勾选。changeRows:所有选中的行信息是一个proxy数组。selectedRows:undefined
        let hostIds: any;
        if (isString(rowkey)) {
          // 如果rowkey是字符串，把选中的每一项的主键值（id）值赋值给hostIds
          hostIds = changeRows.map((item) => item[rowkey]);
        } else {
          hostIds = changeRows.map((item) => rowkey(item));
        }
        if (unref(isSelectAll)) {
          if (selected) {
            hostIds.forEach((ele) => {
              selectAllStore.DelExclude(ele);
            });
          } else {
            selectAllStore.AddExclude(hostIds);
          }
        }
      },
      getCheckboxProps: (record): any => {
        // 选择框的默认属性配置，在这里配置禁止选择属性，record：当前行信息
        return { disabled: rowCanSelect(record, disabledKeys) };
      },
    };
  } else {
    // state.rowSelection = undefined;
    state.rowSelection!.selectedRowKeys = [];
    state.rowSelection!.columnWidth = 0;
  }

  return state.rowSelection;
};

export const initRowSelection = () => {
  selectAllStore.setIselectAll(false);
  selectAllStore.InitExclude();
  if (state.rowSelection) {
    state.rowSelection!.selectedRowKeys = [];
  }
};

// 定义一个禁止选择属性，返回false表示不禁用，返回true表示禁用
const rowCanSelect = (record, disabledKeys: DisbKeys[]): boolean => {
  let disabled: boolean = false;
  // 遍历传过来的需要禁止选择的数组，如果当前行信息record[ele.key]存在且等于ele.value那么这一行被禁止选择
  disabledKeys.forEach((ele) => {
    if (record[ele.key] !== undefined && record[ele.key] === ele.value) {
      disabled = true;
    }
  });
  return disabled;
};
export const useSelectAll = (
  items: any[],
  rowkey: string | ((record: any) => string),
  disabledKeys: DisbKeys[],
) => {
  // 遍历列表所有的数据源
  items.forEach((record) => {
    const key = isString(rowkey) ? record[rowkey] : rowkey(record);
    // 点击全部选择之后如果当前行没有被禁用同时没有被取消选择，则勾选上表示选中
    if (unref(excludeHostIds).indexOf(key) < 0 && !rowCanSelect(record, disabledKeys)) {
      state.rowSelection!.selectedRowKeys.push(key);
    }
  });
};
