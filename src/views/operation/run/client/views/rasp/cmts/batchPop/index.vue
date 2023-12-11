<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 10:24:32
 * @LastEditTime: 2023-07-27 14:22:09
-->
<template>
  <a-popover trigger="click" placement="bottomRight" overlayClassName="batchM">
    <template #content>
      <div class="container">
        <!-- 批量重新注入 -->
        <div
          class="nodes"
          :class="{ actived: selectedType == 'restart' }"
          @click="showCheckbox('restart')"
        >
          {{ t('operation.reinjec') }}
        </div>
        <!-- 批量卸载注入 -->
        <div class="lines"></div>
        <div
          class="nodes"
          :class="{ actived: selectedType == 'uninstall' }"
          @click="showCheckbox('uninstall')"
        >
          {{ t('operation.unirej') }}
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
  import { getReInjectNum, getUninRejNum } from '@/api/operation/run';
  import { FunnelPlotOutlined } from '@ant-design/icons-vue';
  import { initRowSelection } from '@/components/slots-table/hooks';
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
      if (type === 'restart') {
        emit('update:canSelectApi', getReInjectNum);
        emit('update:disabledKeys', [{ key: 'enable_injection', value: false }]);
      } else {
        emit('update:canSelectApi', getUninRejNum);
        emit('update:disabledKeys', [{ key: 'enable_uninstall', value: false }]);
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
