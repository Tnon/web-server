/*
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-09-28 14:38:36
 * @LastEditTime: 2022-09-29 17:03:21
 */
export interface ChartNode {
  id: string;
  name: string;
  value: number;
  itemStyle: {
    color: string;
    isShow: boolean;
  };
}
