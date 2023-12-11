/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-24 16:22:47
 * @LastEditTime: 2023-03-01 19:03:16
 */
import { EdgeType } from '../../tools/type';
import flow from './index.vue';
export const getEdgeColor = (edgeType: EdgeType) => {
  let colorMap: string[] = [];
  switch (edgeType) {
    case EdgeType.BB:
      colorMap = ['rgba(88,123,245,0.60)', 'rgba(88,123,245,0.60)'];
      break;
    case EdgeType.BG:
      colorMap = ['rgba(88,123,245,0.60)', 'rgba(24,186,121,0.50)'];
      break;
    case EdgeType.BR:
      colorMap = ['rgba(88,123,245,0.60)', 'rgba(247,85,85,0.60)'];
      break;
    case EdgeType.GG:
      colorMap = ['rgba(24,186,121,0.50)', 'rgba(24,186,121,0.50)'];
      break;
    case EdgeType.GR:
      colorMap = ['rgba(24,186,121,0.50)', 'rgba(247,85,85,0.60)'];
      break;
    case EdgeType.GB:
      colorMap = ['rgba(24,186,121,0.50)', 'rgba(88,123,245,0.60)'];
      break;
    case EdgeType.RB:
      colorMap = ['rgba(247,85,85,0.60)', 'rgba(88,123,245,0.60)'];
      break;
    case EdgeType.RG:
      colorMap = ['rgba(247,85,85,0.60)', 'rgba(24,186,121,0.50)'];
      break;
    case EdgeType.RR:
      colorMap = ['rgba(247,85,85,0.60)', 'rgba(247,85,85,0.60)'];
      break;
  }
  return colorMap;
};
export default flow;
