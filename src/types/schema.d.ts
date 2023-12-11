/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-19 16:16:55
 * @LastEditTime: 2022-04-24 15:36:15
 */
import { VNode } from 'vue';
import type { FormItemProps } from 'ant-design-vue/lib/form/FormItem';
import { ValidationRule } from 'ant-design-vue/lib/form/Form';
interface OptionItem {
  label: string;
  value: string | number;
  [key: string]: any;
}

type Rule = ValidationRule & {
  trigger?: 'blur' | 'change';
};
export interface FormItem extends Partial<FormItemProps> {
  type?:
    | 'input'
    | 'password'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'input-number'
    | 'inputRange'
    | 'switch'
    | VNode
    | 'component';
  label?: string;
  field?: string;
  value?: any;
  rules?: Rule[];
  options?: OptionItem[];
  eventObject?: object;
  asyncOptions?: () => any;
  placeholder?: string;
  extraSlot?: Boolean;
  [key: string]: any;
  // validPwd?: (...rest) => any
}
