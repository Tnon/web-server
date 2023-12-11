<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-30 10:12:22
 * @LastEditTime: 2023-03-24 16:26:02
-->
<template>
  <div class="processDetail" v-if="nodeInfo.pid_detail_info">
    <div class="header">{{ t('ngav.prodt') }}</div>
    <div class="content">
      <template v-for="(item, key) in nodeInfo.pid_detail_info" :key="key">
        <div class="item">
          <div class="label">{{ t(`ngav.${key}Draw`) }}</div>
          <div class="value">{{ item }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Node } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  defineProps({
    nodeInfo: {
      type: Object as PropType<Node>,
      required: true,
    },
  });
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .processDetail {
    margin: 0 -24px;
    .header {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 16px;
    }
    .content {
      margin-bottom: 32px;
      .item {
        display: flex;
        margin: 16px 0;
        .label {
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.8);
          flex: 130px 0 0;
        }
        .value {
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
  }
</style>
