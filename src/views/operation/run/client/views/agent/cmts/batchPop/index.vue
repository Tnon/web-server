<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 10:24:32
 * @LastEditTime: 2023-11-02 18:31:54
-->
<template>
  <a-popover trigger="click" placement="bottomRight" overlayClassName="batchM">
    <template #content>
      <div class="container">
        <!-- 批量重启 -->
        <div
          class="nodes"
          :class="{ actived: selectedType == 'reset' }"
          @click="showCheckbox('reset')"
        >
          {{ t('setting.resABtn') }}
        </div>
        <div class="lines"></div>
        <!-- 批量重启 -->
        <!-- 批量卸载 -->
        <div
          class="nodes"
          :class="{ actived: selectedType == 'uninstall' }"
          @click="showCheckbox('uninstall')"
        >
          {{ t('operation.unisagent') }}
        </div>
        <div class="lines"></div>
        <!-- 批量设置cpu内存 -->
        <div
          class="nodes"
          :class="{ actived: selectedType == 'cpumem' }"
          @click="showCheckbox('cpumem')"
        >
          {{ t('operation.setcpumemu') }}
        </div>
        <div class="lines"></div>
        <!-- 批量清除 -->
        <div
          class="nodes"
          :class="{ actived: selectedType == 'clear' }"
          @click="showCheckbox('clear')"
        >
          {{ t('operation.clearer') }}
        </div>
        <div class="lines"></div>
        <!-- 批量启用 -->
        <div
          class="nodes"
          :class="{ actived: selectedType == 'start' }"
          @click="showCheckbox('start')"
        >
          {{ t('operation.strdri') }}
        </div>
        <div class="lines"></div>
        <!-- 批量停用 -->
        <div
          class="nodes"
          :class="{ actived: selectedType == 'stop' }"
          @click="showCheckbox('stop')"
        >
          {{ t('operation.stodri') }}
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
  import {
    getUninstallNum,
    getClearNum,
    getCanStopDriNum,
    getCanStarDriNum,
  } from '@/api/operation/run';
  import { FunnelPlotOutlined } from '@ant-design/icons-vue';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { ONLINESTATUS } from '@/enums/assetsType';
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

  //显示选择框
  const showCheckbox = (type) => {
    //重复选择  关闭
    if (props.selectedType === type) {
      //   isCheck.value = false;
      emit('update:isCheck', false);
      emit('update:selectedType', '');
      emit('update:disabledKeys', []);
      emit('update:canSelectApi', undefined);
    } else {
      //选择另一种
      emit('update:selectedType', type);
      emit('update:isCheck', true);
      if (type === 'clear') {
        emit('update:canSelectApi', getClearNum);
        emit('update:disabledKeys', [{ key: 'crash_status_display', value: false }]);
      } else if (type === 'reset') {
        emit('update:canSelectApi', getUninstallNum);
        emit('update:disabledKeys', [{ key: 'online', value: ONLINESTATUS.OFFLINE }]);
      } else if (type === 'uninstall') {
        emit('update:canSelectApi', getUninstallNum);
        emit('update:disabledKeys', [{ key: 'online', value: ONLINESTATUS.OFFLINE }]);
      } else if (type === 'stop') {
        emit('update:canSelectApi', getCanStopDriNum);
        emit('update:disabledKeys', [{ key: 'stop_driver_display', value: false }]);
      } else if (type === 'start') {
        emit('update:canSelectApi', getCanStarDriNum);
        //启用的
        emit('update:disabledKeys', [{ key: 'start_driver_display', value: false }]);
      } else if (type === 'cpumem') {
        emit('update:canSelectApi', getUninstallNum);
        emit('update:disabledKeys', [{ key: 'online', value: ONLINESTATUS.OFFLINE }]);
      }
    }
    props.refreshTable!(true);
    initRowSelection();
  };
</script>
<style lang="less" scoped>
  .container {
    padding: 8px 0;
    width: 200px;

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
