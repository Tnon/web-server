<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-22 17:32:18
 * @LastEditTime: 2023-03-02 15:04:30
-->
<template>
  <div class="container low">
    <div class="process">
      <node-icon
        :level="nodeInfo.level"
        :status="nodeInfo.status"
        :flag="nodeInfo.flag"
        :icon="nodeInfo.icon"
        :size="56"
      />
      <div class="right">
        <div class="title">{{ nodeInfo.label }}</div>
        <run-status :status="nodeInfo.status" />
      </div>
    </div>

    <div class="line"></div>
    <div class="processDetail">
      <!-- 连接信息 start -->
      <div class="header">{{ t('ngav.cetinfo') }}</div>
      <div class="content">
        <template v-for="(item, key) in nodeInfo.network_info" :key="key">
          <div class="item">
            <div class="label">{{ t(`ngav.${key}Draw`) }}</div>
            <div class="value">{{ item }}</div>
          </div>
        </template>
        .
      </div>
      <!-- 连接信息 start -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { Node } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import nodeIcon from '@/views/ngav/flow/cmts/pathAndFlow/cmts/nodeIcon';
  import { useI18n } from 'vue-i18n';
  import runStatus from '@/views/ngav/flow/cmts/pathAndFlow/cmts/runStatus';
  defineProps({
    nodeInfo: {
      type: Object as PropType<Node>,
      required: true,
    },
  });
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .container {
    display: flex;
    .process {
      flex: 1;
      padding: 24px;
      display: flex;
      .right {
        margin-left: 16px;
        .title {
          font-size: @fz14;
          font-weight: 600;
          /* 文字/黑1 */
          color: #000000;
          margin-bottom: 8px;
        }
      }
    }

    .line {
      width: 1px;
      height: 156px;
      background: #eeeeee;
      margin: 0 24px;
    }
    .processDetail {
      padding: 24px;
      flex: 3;
      .header {
        font-size: @fz14;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
      }
      .content {
        display: flex;
        align-items: center;
        .item {
          flex: 1;
          .label {
            font-size: @fz12;
            font-weight: normal;
            /* 文字/黑0.55 */
            color: rgba(0, 0, 0, 0.5);
            margin-top: 24px;
            margin-bottom: 4px;
          }
          .value {
            font-size: @fz14;
            font-weight: 600;
            /* 文字/黑1 */
            color: #000000;
          }
        }
      }
    }
  }
</style>
