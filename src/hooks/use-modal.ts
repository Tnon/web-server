/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-16 09:29:49
 * @LastEditTime: 2023-07-18 10:32:26
 */
import { createVNode, VNode } from 'vue';
import { globalModal } from '@/components/global-modal';
import { useGlobalModal } from '@/store/modules/global-modal';
import { isString } from 'lodash';
export interface Option {
  title: string | VNode;
  instanceKey?: string;
  handleOk?: (...rest: any) => void;
  handleCancle?: () => void;
  okText?: string;
  cancleText?: string;
  contentProps?: object;
  footer?: boolean;
  subtitle?: string | VNode;
  width?: number;
  closable?: boolean;
  keyboard?: boolean;
  wrapClassName?: string;
  maskClosable?: boolean;
  autoOpen?: boolean;
  dangerButton?: boolean;
}
/**
 * @name: 通用的生成弹框的方法
 * @param {Option} options 接受的属性
 * {
 *      title:弹框的标题
 *      handleOk：点击确定的回调函数
 *      contentProps：需要传给content的属性，单项传递，！！！在组件用modalValue定义
 *
 * }
 * @param {any} content 内容区域  组件
 */
export const useModal = (options: Option, content: any) => {
  //弹窗仓库
  const globalModalStore = useGlobalModal();
  //弹窗的唯一标识
  const modalInstanceKey = isString(options.title) ? options.title : options.instanceKey!;
  //移除弹窗的方法
  const remove = () => {
    globalModalStore.RemoveInstance(modalInstanceKey, options.autoOpen);
  };
  //创建弹窗实例
  const instance: VNode = createVNode(globalModal, { remove, ...options, content });
  //给仓库赋值，显示
  globalModalStore.SetGlobalModal({ [modalInstanceKey]: instance });
};
