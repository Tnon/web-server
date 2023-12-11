/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-23 19:41:54
 * @LastEditTime: 2023-03-02 14:43:05
 */
import { createVNode, VNode } from 'vue';
import { useGlobalModal } from '@/store/modules/global-modal';
import HookDraw from '@/components/attrisk-draw';
import type { TableProps } from 'ant-design-vue';
import { isString } from 'lodash';
interface RowOptions {
  title: string;
  drawClass?: string;
  refreshTable?: Fn;
}

/**
 * 表格行单击
 * @param fn 单击的方法
 * @returns customRow 行属性方法
 */
export function useClickRow(content: any, options: RowOptions): TableProps['customRow'] {
  const customRow = (record) => {
    // record:当前行的信息
    // content:抽屉的内容,这里就是封装了的一个drawDetail组件
    // options:可选择一些配置属性，这里是传的攻击或者风险的类型
    return {
      onClick(e) {
        // 如果点击到了td这个标签上则弹出抽屉e.target是一个html标签
        e.target.tagName.toUpperCase() === 'TD' &&
          useCreatDraw(
            {
              title: options.title,
              width: 900,
              contentProps: { ...options, record }, // content即drawDetail组件接收的props
            },
            content,
          );
      },
    };
  };
  return customRow;
}

/**
 * 侧边抽屉
 * @param record 行数据
 * @param options 自定义属性 可选
 * @returns void
 */
interface Options {
  title?: string | VNode;
  contentProps: any;
  instanceKey?: string;
  width?: number;
  height?: number;
  placement?: string;
}
const globalModalStore = useGlobalModal();
const useCreatDraw = (options: Options, content: any): void => {
  // remove函数：当抽屉弹窗关闭的执行，将弹窗内容state.modalValue 置为null
  // content:抽屉的具体内容,这里就是封装了的一个drawDetail组件
  // options:title和内容的属性(攻击或者风险的类型modelType=1表示攻击，modelType=2表示风险。当前行信息)
  // HookDraw:创建一个抽屉组件内部由<a-drawer>封装的
  const drawInstanceKey = isString(options.title) ? options.title! : options.instanceKey!;
  const remove = () => {
    globalModalStore.RemoveInstance(drawInstanceKey);
  };
  const instance = createVNode(HookDraw, { ...options, remove, content });

  globalModalStore.SetGlobalModal({ [drawInstanceKey]: instance });
};
export default useCreatDraw;
