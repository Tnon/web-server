<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-26 11:47:00
 * @LastEditTime: 2023-10-12 11:30:15
-->
<template>
  <div class="header">
    <slot></slot>
    <slot name="title"></slot>
    <div class="righOp">
      <!-- 搜索 start -->
      <slot name="search"></slot>
      <!-- 搜索 end -->
      <!-- 人工处置记录 start -->
      <slot name="record"></slot>
      <!-- 人工处置记录 end -->

      <!-- 批量标记 start -->
      <slot name="mark"></slot>
      <!-- 批量标记 end -->

      <!-- 高级筛选 start -->
      <advanSearch class="filter" :fromAsset="fromAsset" :params="params" @confirm="confirmBtn" />
      <!-- 高级筛选 end -->

      <!-- 定时刷新 start -->
      <slot name="refresh"></slot>
      <!-- 定时刷新 end -->

      <!-- 导出 start -->
      <div class="line"></div>
      <slot name="export"></slot>
      <!-- 导出 end -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { AttackTableparams } from '@/api/attack_risk/model';
  import { PropType } from 'vue';
  import advanSearch from '../advanSearch/index.vue';
  defineProps({
    params: {
      type: Object as PropType<AttackTableparams>,
      required: true,
    },
    fromAsset: {
      type: Boolean,
    },
  });
  const emit = defineEmits(['confirm']);
  const confirmBtn = (v) => {
    emit('confirm', v);
  };
</script>
<style lang="less" scoped>
  .header {
    flex: 48px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .righOp {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .line {
        width: 1px;
        height: 16px;
        background: #e1e1e1;
        // margin: 0 8px;
        margin-right: 16px;
      }
    }
  }
</style>
