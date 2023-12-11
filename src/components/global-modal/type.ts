import { VNode } from 'vue';

/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-04 15:57:15
 * @LastEditTime: 2023-07-18 10:33:11
 */
export interface ModalProps {
  container: Function;
  title: string | VNode;
  remove: Function;
  handleOk?: Function;
  handleCancle?: Function;
  okText?: string;
  cancleText?: string;
  contentProps: object;
  content: object;
  footer: boolean;
  subtitle: string | object;
  width: number;
  wrapClassName: string;
  maskClosable: boolean;
  autoOpen: boolean;
  dangerButton: boolean;
}
