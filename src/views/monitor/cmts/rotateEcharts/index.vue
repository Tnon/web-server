<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-11-07 11:17:32
 * @LastEditTime: 2023-11-09 18:16:27
-->
<template>
  <div class="d_echarts">
    <div class="echartsPie" ref="chartRef"> </div>
    <div class="echartsPieCircle" ref="chartRefCircle"></div>
  </div>
</template>

<script setup lang="ts">
  import { Ref, onMounted, ref, watch, watchEffect } from 'vue';
  import { useECharts } from '@/hooks';
  import { I_Data_Node } from '../autoScroll/type';
  const props = defineProps<{
    data: I_Data_Node[];
    selectedId: number;
    colorArr: string[];
  }>();
  //带角度的数组
  const computedData = ref<(I_Data_Node & { angle: number })[]>([]);
  //chart 元素
  const chartRef = ref<HTMLDivElement | null>(null);
  //转圈元素
  const chartRefCircle = ref<HTMLDivElement | null>(null);
  const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);
  const { setOptions: setOptionsCircle } = useECharts(chartRefCircle as Ref<HTMLDivElement>);
  let startAngle = 0;
  onMounted(() => {
    //外圈
    setOptions({
      title: [
        {
          text: '{name|全部}\n{val|' + 11 + '}\n{tb|+3324}',
          top: 'center',
          left: 'center',
          textStyle: {
            rich: {
              name: {
                fontSize: 14,
                fontWeight: 'normal',
                color: 'rgba(255, 255, 255, 0.6)',
              },
              val: {
                fontSize: 32,
                fontWeight: 'bold',
                color: '#fff',
                padding: [8, 0],
              },
              tb: {
                fontSize: 13,
                fontWeight: 'bold',
                color: '#F75555',
              },
            },
          },
        },
      ],

      series: [
        {
          type: 'pie',
          id: 1,
          startAngle,
          color: props.colorArr,
          radius: ['65%', '80%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: '#000',
            borderWidth: 2,
          },
          labelLine: {
            show: false,
          },
          label: {
            show: false,
          },
          data: props.data.map((ele) => ({ value: ele.count, name: ele.label })),
        },
      ],
    });
    //里面转圈
    setOptionsCircle({
      series: [
        {
          type: 'pie',
          id: 1,
          color: ['#FB7E52', '#F8A556', '#F75555', '#000'],
          radius: ['56%', '60%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: '#000',
            borderWidth: 1,
          },
          labelLine: {
            show: false,
          },
          label: {
            show: false,
          },
          data: [
            {
              name: '236.076',
              value: 236.076,
            },
            {
              name: '34.449',
              value: 34.449,
            },
            {
              name: '55.731',
              value: 55.731,
            },
            {
              name: '618',
              value: 618,
            },
          ],
        },
      ],
    });
  });

  //计算每个区域的中心角度
  const computedMidDeg = (data: I_Data_Node[]) => {
    let allSum = 0;
    data.forEach((ele) => {
      allSum += ele.count;
    });
    const resultArr: (I_Data_Node & { angle: number })[] = [];
    let sum = 0;
    data.forEach((ele) => {
      resultArr.push({
        ...ele,
        angle: ((sum + ele.count / 2) / allSum) * 360,
      });
      sum += ele.count;
    });
    return resultArr;
  };
  watchEffect(() => {
    computedData.value = computedMidDeg(props.data);
    startAngle = computedData.value[2].angle;
  });
  watch(
    () => props.selectedId,
    () => {
      let { angle, label: name } = computedData.value.find((ele) => ele.id === props.selectedId)!;
      startAngle = angle;
      getInstance()?.setOption({
        series: [
          {
            startAngle,
          },
        ],
      });
      getInstance()?.dispatchAction({
        type: 'downplay',
      });
      getInstance()?.dispatchAction({
        type: 'highlight',
        name,
      });
    },
  );
</script>

<style scoped lang="less">
  .d_echarts {
    display: flex;
    align-items: center;

    .echartsPie {
      width: 10.416vw;
      height: 18.518vh;
      min-width: 200px;
      min-height: 200px;
      max-width: 18.518vh;
      max-height: 10.416vw;
      position: relative;
      z-index: 2;
    }
    .echartsPieCircle {
      width: 10.416vw;
      height: 18.518vh;
      min-width: 200px;
      min-height: 200px;
      max-width: 18.518vh;
      max-height: 10.416vw;
      position: absolute;
      animation: rotate 2s linear infinite;
    }
  }
</style>
