<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-05 15:21:08
 * @LastEditTime: 2023-04-27 18:23:17
-->
<template>
  <div class="header">
    <!-- 危险等级 start -->
    <vul-danger-level :level="level" />
    <!-- 危险等级 end -->
    <div class="riOp">
      <!-- 拦截和处理 start -->
      <div class="txt-hand">
        <span class="label">{{ title }}</span>
      </div>
      <!-- 拦截和处理 end -->

      <!-- 标签 start -->
      <div class="tags">
        <span class="tag primary" v-for="item in tags" :key="item">{{ item }}</span>
      </div>
      <!-- 标签 end -->
    </div>
  </div>
  <!-- 特征和辅助分析 start -->
  <div class="details">
    <!-- 风险行为（都有） start -->
    <div class="label">
      {{ t('arcomn.riskChar') }}
    </div>
    <div class="msg">{{ description }}</div>
    <!-- 风险行为 end -->
  </div>
  <!-- 特征和辅助分析 end -->
</template>
<script lang="ts" setup>
  import { PropType } from 'vue';
  import vulDangerLevel from '@/components/vul-danger-level';
  import { useI18n } from 'vue-i18n';
  defineProps({
    description: {
      type: String,
    },
    level: {
      type: Number,
    },
    tags: Array as PropType<string[]>,
    title: {
      type: String,
      required: true,
    },
  });

  const { t } = useI18n();
</script>
<style lang="less" scoped>
  .header {
    height: 104px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    .riOp {
      flex: 1;
      .txt-hand {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        .label {
          font-size: @fz14;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
        }
      }
      .tags {
        .tag {
          padding: 2px 8px;
          font-size: @fz12;
          font-weight: 400;
          border-radius: 2px;
          margin-right: 4px;
          display: inline-block;
          margin-top: 4px;
        }
        .primary {
          background: #eeeeee;
          color: rgba(0, 0, 0, 0.6);
        }
        .color {
          background: rgba(88, 132, 222, 0.15);
          color: #5884de;
        }
      }
    }
  }
  .details {
    padding-top: 24px;
    border-bottom: 1px solid #eee;
    .msg {
      margin-bottom: 24px;
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      word-break: break-word;
    }
    .label {
      font-size: @fz12;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 8px;
    }
  }
</style>
