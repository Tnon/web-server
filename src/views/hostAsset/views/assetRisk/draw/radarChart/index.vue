<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-07 19:26:18
 * @LastEditTime: 2022-11-25 15:22:46
-->
<template>
  <div>
    <div class="heavy-title">
      {{ t('asset.cvssRiskScore', [state.version]) }}：
      <span class="scoreText" :style="{ color: scoreColor }">{{ state.finalScore }}</span>
    </div>
    <div ref="chartRef" class="charts"></div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, Ref, reactive, watchEffect, PropType } from 'vue';
  import { useECharts } from '@/hooks';
  import { useI18n } from 'vue-i18n';
  import { getRadarConfig } from './index';
  import { vulRiskLevel } from '@/enums/assetsType';
  import { cvssType, VersionType, IndicatorType } from '../type';

  const props = defineProps({
    level: {
      type: Number,
      required: true,
    },
    cvssData: {
      type: Object as PropType<cvssType>,
      required: true,
    },
  });
  const { t } = useI18n();
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  const state = reactive<{
    version: number;
    finalScore: number;
    indicator: IndicatorType[];
    scoreList: number[];
    textList: string[];
  }>({
    version: 0, // cvss版本
    finalScore: 0, // 最终得到的风险评分
    indicator: [], // 雷达图需要的配置项
    scoreList: [], // 各项分数，有顺序
    textList: [], // 各项分数相应的描述，有顺序
  });
  const scoreColor = ref(''); // 分数及雷达图覆盖区域的颜色（危险程度）

  // 根据后端返回值获取雷达图所需的具体数据配置（有序）
  const getConfigData = (allConfig, data) => {
    const keyList = Object.keys(allConfig);
    keyList.forEach((item, index) => {
      // 通过index控制顺序一致
      state.indicator[index] = allConfig[item].indicatorItem; // 雷达图需要的配置项
      state.scoreList[index] = data[item].score; // 各项对应的分数
      state.textList[index] = allConfig[item].descriptions[data[item].value]; // 各项分数相应的描述
    });
  };
  const drawCharts = () => {
    setOptions(
      {
        tooltip: {
          confine: true, // 设置tootip内容不超过其父元素，自适应
          trigger: 'item',
          // 自定义tootip中内容
          formatter: () => {
            // console.log('参数', params);
            let content = '';
            state.indicator.map((item, index) => {
              content += `${item.text}：${state.textList[index]}` + '<br />';
            });
            return content;
          },
        },
        radar: {
          // 官网中indicator中可设置name字段，
          // 但是引入的依赖及类型中只能用text字段
          // shape: 'circle',
          // indicator: [
          //   { name: '攻击途径', max: 100 },
          //   { name: '攻击复杂度', max: 10 },
          //   { name: '认证', max: 10 },
          //   { name: '机密性', max: 10 },
          //   { name: '完整性', max: 10 },
          //   { name: '可用性', max: 10 },
          // ],
          indicator: state.indicator,
          axisName: {
            color: 'rgba(0, 0 , 0, 0.6)',
          },
        },
        series: [
          {
            name: 'CVSS风险评分',
            type: 'radar',
            data: [
              {
                // value: [0.646, 0.66, 0.275, 0.56, 0.56, 0.61],
                value: state.scoreList,
              },
            ],
            // 阴影部分颜色
            areaStyle: {
              // color: '#f8a454', // 橙色
              color: scoreColor.value,
              opacity: 0.4,
            },
            // 节点样式
            itemStyle: {
              color: '#fff',
              borderColor: scoreColor.value,
              borderWidth: 0.5,
            },
            // 连线样式
            lineStyle: {
              color: scoreColor.value,
            },
          },
        ],
      },
      true,
    );
  };
  watchEffect(() => {
    scoreColor.value = vulRiskLevel[props.level].split(',')[1]; // 分数颜色/危险程度
    // mainContent中有字段时说明接口已返回数据
    const { version, score, ...mainContent } = props.cvssData;
    if (Object.keys(mainContent).length > 0) {
      state.version = version; // cvss版本
      state.finalScore = Number(score); // 风险评分
      const radarConfig = getRadarConfig(t, Math.round(version) as VersionType); // 获取版本对应的所有数据（版本取整数）
      getConfigData(radarConfig, mainContent); // 处理成雷达图需要的数据格式
      drawCharts(); // 绘图
    }
  });
</script>
<style lang="less" scoped>
  .heavy-title {
    margin: 20px 0 16px 0;
    font-weight: 600;
  }
  .scoreText {
    font-size: @fz18;
  }
  .charts {
    height: 450px;
    // height: calc(100vh - 900px);
    // min-height: 400px;
  }
</style>
