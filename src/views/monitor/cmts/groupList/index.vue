<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-11-08 20:32:00
 * @LastEditTime: 2023-11-09 10:16:40
-->
<template>
  <div class="grouplist">
    <template v-for="item in groupList" :key="item.name">
      <div class="g_node">
        <div class="name">{{ item.name }}</div>
        <count-to class="count" :endVal="item.count" />
        <div class="per">
          <div class="inner" :style="{ width: item.percent + '%' }"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const groupList = ref([
    {
      name: '分组1',
      count: 12456,
      percent: 80,
    },
    {
      name: '分组2',
      count: 14567,
      percent: 80,
    },
    {
      name: '分组3',
      count: 4567,
      percent: 60,
    },
    {
      name: '分组4',
      count: 23466,
      percent: 56,
    },
    {
      name: '分组5',
      count: 12456,
      percent: 65,
    },
    {
      name: '分组6',
      count: 8586,
      percent: 30,
    },
    {
      name: '分组7',
      count: 15886,
      percent: 40,
    },
  ]);
</script>

<style scoped lang="less">
  .grouplist {
    width: 100%;
    height: 88px;
    // background-color: red;
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    .g_node {
      display: flex;
      flex-direction: column;
      padding: 12px 8px 8px;
      align-items: center;
      margin: 0 4px;
      width: 120px;
      border: 1px solid rgba(24, 186, 121, 0.2);
      background: rgba(0, 0, 0, 0.5);
      cursor: pointer;
      .name {
        font-size: @fz13;
        font-weight: normal;
        line-height: 20px;
        color: #ffffff;
      }
      .count {
        font-family: D-DIN;
        font-size: @fz16;
        font-weight: bold;
        line-height: 24px;
        color: #ffffff;
        margin: 8px 0;
      }
      .per {
        width: 100%;
        height: 8px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.08);
        padding: 2px;
        .inner {
          height: 4px;
          border-radius: 4px;
          background: @primary-color;
        }
      }
    }
  }
</style>
