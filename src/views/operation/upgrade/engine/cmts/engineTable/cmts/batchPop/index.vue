<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 10:24:32
 * @LastEditTime: 2023-07-27 14:24:50
-->
<template>
  <a-popover trigger="click" placement="bottomRight" overlayClassName="batchM">
    <template #content>
      <div class="container">
        <!-- 批量升级 -->
        <div
          class="nodes"
          :class="{ actived: selectedType == 'upgrade' }"
          @click="showCheckbox('upgrade')"
        >
          {{ type === UPCLIPKGTYPE.HASH ? t('operation.batUpg') : t('operation.batUpgLib') }}
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
  import { getBatUpdateEngineNum } from '@/api/operation/upgrade';
  import { FunnelPlotOutlined } from '@ant-design/icons-vue';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { UPCLIPKGTYPE } from '@/enums/assetsType';
  const props = defineProps({
    selectedType: String,
    isCheck: Boolean,
    disabledKeys: Array as PropType<{ key: string; value: unknown }[]>,
    canSelectApi: Function,
    refreshTable: Function,
    type: Number as PropType<UPCLIPKGTYPE>,
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
      emit('update:isCheck', false);
      emit('update:selectedType', '');
      emit('update:disabledKeys', []);
      emit('update:canSelectApi', undefined);
    } else {
      //取消选择
      emit('update:selectedType', type);
      emit('update:isCheck', true);
      emit('update:canSelectApi', getBatUpdateEngineNum);
      emit('update:disabledKeys', [{ key: 'engine_upgradable', value: 2 }]);
    }
    props.refreshTable!(true);
    initRowSelection();
  };
</script>
<style lang="less" scoped>
  .container {
    padding: 8px 0;

    .actived {
      background: #eee !important;
    }

    .nodes {
      padding: 0 16px;
      width: 200px;
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
