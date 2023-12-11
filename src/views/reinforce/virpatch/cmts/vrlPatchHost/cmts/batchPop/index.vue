<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 10:24:32
 * @LastEditTime: 2023-07-27 14:25:03
-->
<template>
  <a-popover trigger="click" placement="bottomRight" overlayClassName="batchM">
    <template #content>
      <div class="container">
        <!-- 停止检测 -->
        <div
          class="nodes"
          :class="{ actived: selectedType == 'stop' }"
          @click="showCheckbox('stop')"
        >
          {{ t('reinforce.tzjc') }}
        </div>
        <!-- 检测上报 -->
        <div class="lines"></div>
        <div
          class="nodes"
          :class="{ actived: selectedType == 'start' }"
          @click="showCheckbox('start')"
        >
          {{ t('reinforce.jcsb') }}
        </div>
        <!-- 拦截防护 -->
        <div class="lines"></div>
        <div
          class="nodes"
          :class="{ actived: selectedType == 'inject' }"
          @click="showCheckbox('inject')"
        >
          {{ t('reinforce.ljfh') }}
        </div>
      </div>
    </template>
    <!-- 批量按钮 start -->
    <a-button type="text">
      <template #icon>
        <FunnelPlotOutlined class="batchIcon" />
      </template>
      {{ t('common.batchOpt') }}
    </a-button>
    <!-- 批量按钮 end -->
  </a-popover>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { FunnelPlotOutlined } from '@ant-design/icons-vue';
  import { E_Mode_Action } from '../fileActionMode/type';
  import { getCSCount } from '@/api/reinforce';
  const props = defineProps({
    selectedType: String,
    isCheck: Boolean,
    disabledKeys: Array as PropType<{ key: string; value: unknown }[]>,
    canSelectApi: Function,
    refreshTable: Function,
  });
  const emit = defineEmits([
    'update:isCheck',
    'update:selectedType',
    'update:disabledKeys',
    'update:canSelectApi',
  ]);
  const { t } = useI18n();

  const getParseCount = (agms) => {
    return getCSCount({
      filter: agms,
      is_all: true,
      set_status:
        props.selectedType === 'stop'
          ? E_Mode_Action.StopMonitor
          : props.selectedType === 'start'
          ? E_Mode_Action.Monitor
          : E_Mode_Action.Inject,
    });
  };
  //显示选择框
  const showCheckbox = (type) => {
    //重复选择  关闭
    if (props.selectedType === type) {
      emit('update:isCheck', false);
      emit('update:selectedType', '');
      emit('update:disabledKeys', []);
      emit('update:canSelectApi', undefined);
    } else {
      //选择另一种
      emit('update:selectedType', type);
      emit('update:isCheck', true);
      if (type === 'stop') {
        emit('update:canSelectApi', getParseCount);
        emit('update:disabledKeys', [{ key: 'status', value: E_Mode_Action.StopMonitor }]);
      } else if (type === 'start') {
        emit('update:canSelectApi', getParseCount);
        emit('update:disabledKeys', [{ key: 'status', value: E_Mode_Action.Monitor }]);
      } else {
        emit('update:canSelectApi', getParseCount);
        emit('update:disabledKeys', [{ key: 'status', value: E_Mode_Action.Inject }]);
      }
    }
    props.refreshTable!(true);
  };
</script>
<style lang="less" scoped>
  .container {
    padding: 8px 0;
    width: 200px;
    .line {
      width: 200px;
      height: 1px;
      background: #eeeeee;
      border-radius: 8px;
      margin: 8px 0;
    }

    .actived {
      background: #eee !important;
    }

    .nodes {
      padding: 0 16px;
      line-height: 40px;
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
  .lines {
    width: 200px;
    height: 1px;
    background: #eeeeee;
    margin: 8px 0;
  }
</style>
