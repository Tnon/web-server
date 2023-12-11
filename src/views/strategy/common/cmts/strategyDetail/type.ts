import { VNode } from 'vue';

/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-08 14:43:58
 * @LastEditTime: 2023-10-13 11:31:14
 */

export const enum Modes {
  //拦截模式
  Inject = 1,
  //仅上报模式
  OnlyReport,
}
export const enum AssetModes {
  //推荐设置
  Recommend = 1,
  //自定义配置
  Custom,
}
export const enum Ctype {
  //开关
  Switch = 1,
  //单选
  Radio,
  //多选
  Checkbox,
  //整型
  Int,
  //整型数组
  IntArr,
  //浮点
  Float,
  //字符串
  String = 8,
  //字符串数组
  StringArr,
}
export const enum OptionType {
  Checkbox,
  Radio,
  Select,
  InputNumber,
  Asset,
}
interface Node {
  //给后端的ctype
  ctype?: Ctype;
  //给后端的value
  value: string | string[] | number | number[];
}
export interface HttpData {
  [k: string]: { [k: string]: Node };
}
export interface StrategyPackage {
  //模块名称
  title: string;
  //模块的图标
  icon: string;
  //模块的副标题
  subtitle?: string;
  //二级label
  types: {
    //二级模块label
    title: string;
    //副标题
    subtitle?: string;
    //真正的节点
    nodes: {
      //节点的唯一标识
      key: string;
      //开关的配置
      switch?: {
        //开关名称
        title: string;
        //问号的提示语
        tips: string;
        //字段标识
        name: 'switch';
        //ctype
        ctype: Ctype;
      };
      //无开关只文案
      switchText?: {
        //开关名称
        title: string;
        //问号的提示语
        tips: string;
      };
      //模式的配置(可选)
      modes?: {
        //模式的种类
        options: {
          label: string;
          value: string | number;
        }[];
        //字段标识
        name: string;
        //ctype
        ctype: Ctype;
      };
      //单选/多选/下拉/按钮 （可选）
      checks?: {
        //多(单)选框的label
        label: {
          icon: string;
          title: string;
          tips?: string | VNode;
        };
        //单选还是多选
        optionType: OptionType;
        //下拉框的文案
        selectText?: string;
        //多(单)选框的种类
        options?: {
          label: string;
          value: string | number;
          //给后端的额外value
          configValues?: {
            //要弹窗的组件
            component: VNode;
            //根据哪个值显示
            byValue: string | number;
            //数据
            data: {
              //字段标识
              name: string;
              //ctype
              ctype: Ctype;
            }[];
          };
        }[];
        //字段标识
        name: string;
        //ctype
        ctype?: Ctype;
      }[];
    }[];
  }[];
}
