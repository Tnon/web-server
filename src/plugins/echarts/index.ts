/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-10 20:20:04
 * @LastEditTime: 2023-11-07 20:19:07
 */
import * as echarts from 'echarts/core';

import { LineChart, PieChart, RadarChart, TreeChart, CustomChart } from 'echarts/charts';

import {
  TooltipComponent,
  GraphicComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  MarkLineComponent,
  TitleComponent,
  VisualMapComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([
  TooltipComponent,
  GridComponent,
  LineChart,
  PieChart,
  SVGRenderer,
  RadarChart,
  LegendComponent,
  TreeChart,
  DataZoomComponent,
  MarkLineComponent,
  VisualMapComponent,
  CustomChart,
  TitleComponent,
  GraphicComponent,
]);

export default echarts;
