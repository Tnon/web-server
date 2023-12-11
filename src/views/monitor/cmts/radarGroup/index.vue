<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-11-08 16:46:09
 * @LastEditTime: 2023-11-09 16:34:20
-->
<template>
  <div class="raderCon">
    <div class="radar" ref="radarRef"> </div>
  </div>
</template>

<script setup lang="ts">
  import { Ref, onMounted, reactive, ref } from 'vue';
  import { useECharts } from '@/hooks';
  import lm from '../../imgs/Radiobox01.svg';
  import lb from '../../imgs/Radiobox02.svg';
  import rm from '../../imgs/Radiobox03.svg';
  import lt from '../../imgs/Radiobox04.svg';
  import rb from '../../imgs/Radiobox05.svg';
  import rt from '../../imgs/Radiobox06.svg';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  //chart 元素
  const radarRef = ref<HTMLDivElement | null>(null);
  const totalStatic = reactive({
    [t('overview.czgj')]: 38942,
    [t('overview.czsj')]: 12334,
    [t('overview.czfx')]: 12345,
    [t('overview.czld')]: 356,
    [t('overview.cfye')]: 642,
    [t('overview.chwj')]: 5467,
  });
  const { setOptions } = useECharts(radarRef as Ref<HTMLDivElement>);
  const data = [
    [55, 9, 156, 0.46, 18, 6],
    [25, 11, 21, 0.65, 34, 9, 2],
    [56, 7, 63, 0.3, 14, 5, 3],
    [33, 7, 29, 0.33, 16, 6, 4],
    [42, 24, 44, 0.76, 40, 16, 5],
    [82, 58, 90, 1.77, 68, 33, 6],
    [74, 49, 77, 1.46, 48, 27, 7],
    [78, 55, 80, 1.29, 59, 29, 8],
    [267, 216, 280, 4.8, 108, 64, 9],
    [185, 127, 216, 2.52, 61, 27, 10],
    [39, 19, 38, 0.57, 31, 15, 11],
    [41, 11, 40, 0.43, 21, 7, 12],
    [64, 38, 74, 1.04, 46, 22, 13],
    [108, 79, 120, 1.7, 75, 41, 14],
    [108, 63, 116, 1.48, 44, 26, 15],
    [33, 6, 29, 0.34, 13, 5, 16],
    [94, 66, 110, 1.54, 62, 31, 17],
    [186, 142, 192, 3.88, 93, 79, 18],
    [57, 31, 54, 0.96, 32, 14, 19],
    [22, 8, 17, 0.48, 23, 10, 20],
    [39, 15, 36, 0.61, 29, 13, 21],
    [94, 69, 114, 2.08, 73, 39, 22],
    [99, 73, 110, 2.43, 76, 48, 23],
    [31, 12, 30, 0.5, 32, 16, 24],
    [42, 27, 43, 1, 53, 22, 25],
    [154, 117, 157, 3.05, 92, 58, 26],
    [234, 185, 230, 4.09, 123, 69, 27],
    [160, 120, 186, 2.77, 91, 50, 28],
    [134, 96, 165, 2.76, 83, 41, 29],
    [52, 24, 60, 1.03, 50, 21, 30],
    [46, 5, 49, 0.28, 10, 6, 31],
  ];
  // czgj: '存在告警',
  // czsj: '存在事件',
  // czfx: '存在风险',
  // czld: '存在漏洞',
  // cfye: '触发诱饵文件',
  // chwj: '触发文件保护',
  onMounted(() => {
    setOptions({
      radar: {
        radius: '65%',
        center: ['50%', '50%'],
        axisNameGap: 0,
        startAngle: 0,
        indicator: [
          { name: t('overview.czgj'), max: 300 }, //'存在告警',
          { name: t('overview.czsj'), max: 250 }, //存在事件
          { name: t('overview.czfx'), max: 300 }, //'存在风险',
          { name: t('overview.czld'), max: 5 }, //存在漏洞
          { name: t('overview.cfye'), max: 200 }, //'触发诱饵文件',
          { name: t('overview.chwj'), max: 100 }, //'触发文件保护',
        ],
        shape: 'circle',
        splitNumber: 5,
        axisName: {
          // padding: [14, 36, 24, 36],
          color: '#18BA79',
          borderWidth: 1,
          formatter: (v) => {
            if (v === t('overview.czfx')) {
              return '{lt|}\n{title|' + v + '}\n{value|' + totalStatic[v!] + '}\n{pos|}';
            } else if (v === t('overview.czsj')) {
              return '{rt|}\n{title|' + v + '}\n{value|' + totalStatic[v!] + '}\n{pos|}';
            } else if (v === t('overview.czld')) {
              return '{lm|}\n{title|' + v + '}\n{value|' + totalStatic[v!] + '}';
            } else if (v === t('overview.cfye')) {
              return '{pos|}\n{lb|}\n{title|' + v + '}\n{value|' + totalStatic[v!] + '}';
            } else if (v === t('overview.chwj')) {
              return '{pos|}\n{rb|}\n{title|' + v + '}\n{value|' + totalStatic[v!] + '}';
            } else if (v === t('overview.czgj')) {
              return '{rm|}\n{title|' + v + '}\n{value|' + totalStatic[v!] + '}';
            } else {
              return '';
            }
          },
          rich: {
            pos: {
              height: 90,
            },
            lt: {
              backgroundColor: {
                image: lt,
              },
              width: 120,
              height: 90,
            },
            lm: {
              backgroundColor: {
                image: lm,
              },
              width: 130,
              height: 80,
            },
            lb: {
              backgroundColor: {
                image: lb,
              },
              width: 120,
              height: 90,
            },
            rt: {
              backgroundColor: {
                image: rt,
              },
              width: 120,
              height: 90,
            },
            rm: {
              backgroundColor: {
                image: rm,
              },
              width: 130,
              height: 80,
            },
            rb: {
              backgroundColor: {
                image: rb,
              },
              width: 120,
              height: 90,
            },
            title: {
              color: '#18BA79',
              padding: [-65, 0, 0, 0],
              fontSize: 12,
              align: 'center',
              verticalAlign: 'top',
            },
            value: {
              color: '#fff',
              fontSize: 24,
              padding: [-40, 0, 0, 0],
              align: 'center',
              verticalAlign: 'top',
              fontWeight: 600,
            },
          },
        },
        splitLine: {
          lineStyle: {
            color: [
              'rgba(24,186,121, 0.1)',
              'rgba(24,186,121, 0.2)',
              'rgba(24,186,121, 0.4)',
              'rgba(24,186,121, 0.6)',
              'rgba(24,186,121, 0.8)',
              'rgba(24,186,121, 1)',
            ].reverse(),
          },
        },
        splitArea: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(24,186,121,.3)', //rgba(24,186.121.1)
          },
        },
      },
      series: [
        {
          type: 'radar',
          lineStyle: {
            width: 1,
            opacity: 0.5,
          },
          data,
          symbol: 'none',
          itemStyle: {
            color: 'rgba(24,186,121, 1)',
          },
          areaStyle: {
            opacity: 0.1,
          },
        },
      ],
    });
  });
</script>

<style scoped lang="less">
  .raderCon {
    display: flex;
    justify-content: center;
    .radar {
      min-width: 840px;
      min-height: 840px;
      width: 43.75vw;
      height: 77.777vh;
      max-width: 77.777vh;
      max-height: 43.75vw;
      margin-top: -50px;
    }
  }
</style>
