/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2023-08-25 10:08:04
 */
import { ColumnProps } from 'ant-design-vue/lib/table';
import { FormItem } from './schema.d';
import { VNode } from 'vue';
export interface iconList {
  type?: string;
  isVnode?: boolean;
  text: string | Fn | ((rest) => VNode);
  popConfirmText?: Fn;
  func?: ({ record, ...rest }, callback: (...rest) => any) => any;
  disabled?: any;
  hidden?: Fn;
  loading?: Fn;
  tooltip?: string | Fn;
  actionList?: iconList[];
}
interface ActionOptions {
  type: 'select' | 'button' | 'text' | 'popconfirm' | 'icon' | 'switch' | 'groups'; // 控制类型，默认为a,可选： select | button | text
  text?: string;
  permission?: {
    // 权限
    action?: 'create' | 'delete' | 'update' | 'retrieve'; // CRUD权限：创建（Create）、更新（Update）、读取（Retrieve）和删除（Delete）操作
    effect?: 'disabled';
  };
  actionList?: iconList[];
  disabled?: any;
  checked?: any;
  props?: any; // 组件属性，v-bind="props"
  // func?: ({ text, record, index }, callback: (...rest) => any) => any; // 动作事件触发回调
  func?: ({ record, ...rest }, callback: (...rest) => any) => any; // 动作事件触发回调
}

export interface TableColumn<RecordType = any> extends ColumnProps<RecordType> {
  actions?: ActionOptions[];
  formProps?: FormItem;
  children?: TableColumn<RecordType>[];
  dataIndex: string;
  is_last_columns?: boolean;
  hidden?: boolean | undefined;
  customHead?: boolean;
  unChecked?: boolean | undefined;
}
