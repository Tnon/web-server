<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-12 11:12:51
 * @LastEditTime: 2022-11-28 11:05:21
-->
<template>
  <div class="node" :class="{ actived: !nodeProps.enabled }">
    <span class="flag">
      <template v-for="item in nodeProps.flag" :key="item">
        <span class="flagnode" :class="{ virus: item === t('operation.virusmm') }">{{ item }}</span>
      </template>
    </span>
    <div class="header">
      <custom-icon class="icon" :type="nodeProps.iconType" />
      <a-switch
        v-if="nodeProps.switchable !== undefined"
        :disabled="!nodeProps.switchable"
        v-model:checked="nodeProps.enabled"
        @change="switchEngine"
      />
    </div>
    <div class="label">{{ t('operation.' + nodeProps.desc + 'engine') }}</div>
    <div class="version">
      <span>{{ t('operation.agtvs') }}</span>
      <span>{{ nodeProps.version }}</span>
    </div>
    <div class="time">
      <span>{{ t('operation.opertime') }}</span>
      <span>{{ nodeProps.op_time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { engineSwitchStatus } from '@/api/operation/run';
  const props = defineProps({
    nodeProps: {
      type: Object as PropType<{
        switchable?: boolean;
        enabled?: boolean;
        desc: string;
        version: string;
        op_time: string;
        iconType: string;
        flag: string[];
      }>,
      required: true,
    },
    id: String,
    refresh: Function,
  });
  const { t } = useI18n();
  const switchEngine = async (enable: boolean) => {
    await engineSwitchStatus({ id: ~~props.id!, enable });
    props.refresh!();
  };
</script>

<style scoped lang="less">
  .node {
    padding: 24px;
    min-width: 240px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    display: inline-block;
    margin-right: 16px;
    margin-top: 16px;
    position: relative;
    .flag {
      position: absolute;
      top: 0;
      right: 0;

      .flagnode {
        display: inline-block;
        margin-left: 8px;
        height: 20px;
        line-height: 20px;
        background: @primary-color;
        color: #fff;
        padding: 0 10px;
      }
      // .virus {
      //   background: @danger-color;
      // }
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      .icon {
        font-size: 48px !important;
      }
    }
    .label {
      font-size: @fz16;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      line-height: 24px;
      margin-bottom: 4px;
    }
    .version {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      line-height: 24px;
      margin-bottom: 20px;
    }
    .time {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
      line-height: 16px;
    }
  }
  .actived {
    background: #f6f6f6;
  }
</style>
