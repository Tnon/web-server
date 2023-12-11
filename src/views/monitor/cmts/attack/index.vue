<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-11-07 17:17:33
 * @LastEditTime: 2023-11-09 18:15:57
-->
<template>
  <div class="attackMd">
    <div class="title">
      <span>{{ t('overview.wxgjsk') }}</span>
    </div>
    <div class="attackPieSwp">
      <!-- echarts start -->
      <rotate-echarts :data="data" :selectedId="selectedId" :colorArr="colorArr" />
      <!-- echarts end -->

      <!-- 三角形 start-->
      <div class="triangle" :style="{ borderLeftColor: color }"></div>
      <!-- 三角形 end -->

      <!-- 翻滚显示 start -->
      <autoScroll :data="data" v-model:selectedId="selectedId" />
      <!-- 翻滚显示 end -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import autoScroll from '../autoScroll/';
  import rotateEcharts from '../rotateEcharts';
  import { useI18n } from 'vue-i18n';
  import { ref, computed } from 'vue';
  const { t } = useI18n();

  const selectedId = ref(0);
  const colorArr = [
    '#F75555',
    '#FB7E52',
    '#F8A556',
    '#F6C84D',
    '#F6C84D',
    '#95D545',
    '#3FD45A',
    '#2ECF99',
    '#14BBDD',
    '#439EF6',
    '#587BF5',
    '#945DF8',
    '#D066EA',
    '#F75D9C',
  ];
  const data = ref([
    {
      label: 'RCE攻击1',
      count: 1029845,
      color: '#F75555',
      id: 1,
    },
    {
      label: '数据窃取2',
      count: 298384,
      color: '#FB7E52',
      id: 2,
    },
    {
      label: '内存马3',
      count: 23,
      color: '#F8A556',
      id: 3,
    },
    {
      label: '权限提升4',
      count: 22343,
      color: 'red',
      id: 4,
    },
    {
      label: '远程控制5',
      count: 123523,
      color: '#95D545',
      id: 5,
    },
    {
      label: '蛮族之王6',
      count: 123523,
      color: '#F6C84D',
      id: 15,
    },
    {
      label: '诺克萨斯7',
      count: 123523,
      color: 'blue',
      id: 56,
    },
    {
      label: '德玛西亚8',
      count: 123523,
      color: 'blue',
      id: 156,
    },
  ]);
  data.value.forEach((ele, index) => {
    ele.color = colorArr[index % colorArr.length];
  });
  const color = computed(() => {
    const currentData = data.value.find((ele) => ele.id === selectedId.value)!;
    if (currentData) {
      return currentData.color;
    }
    return '';
  });
</script>

<style scoped lang="less">
  .attackMd {
    // min-width: 400px;
    // min-height: 240px;
    // width: 20.833vw;
    // height: 22.222vh;
    // max-width: 37.035vh;
    // max-height: 12.499vw;
    .title {
      display: flex;
      align-items: center;
      height: 40px;
      font-size: @fz14;
      font-weight: 600;
      line-height: 24px;
      padding-left: 10px;
      color: #ffffff;
      background-image: url(../../imgs/BoxTitle01.svg);
      background-position: left;
      background-repeat: no-repeat;
      background-size: contain;
    }
    .attackPieSwp {
      display: flex;
      align-items: center;
      position: relative;
      .triangle {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        margin-left: -10px;
        margin-right: 10px;
        transition: all 0.3s;
      }
    }
  }
</style>
