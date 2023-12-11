<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 10:24:32
 * @LastEditTime: 2023-07-27 14:20:59
-->
<template>
  <a-popover trigger="click" placement="bottomRight" overlayClassName="batchM">
    <template #content>
      <div class="container">
        <div class="subtitle">{{ subTitle }}</div>
        <!-- 批量确定 -->
        <div
          v-if="handleType === HANDLETYPE.UNHANDLE || handleType === HANDLETYPE.HANDLING"
          class="nodes"
          :class="{ actived: selectedType === BatchOption.Confirm }"
          @click="showCheckbox(BatchOption.Confirm)"
        >
          {{ t('ngav.confirm') }}
        </div>
        <!-- 批量忽略 -->
        <div
          v-if="handleType === HANDLETYPE.UNHANDLE || handleType === HANDLETYPE.HANDLING"
          class="nodes"
          :class="{ actived: selectedType === BatchOption.Ignore }"
          @click="showCheckbox(BatchOption.Ignore)"
        >
          {{ t('arcomn.ignore') }}
        </div>
        <!-- 批量处理中 -->
        <div
          v-if="handleType === HANDLETYPE.UNHANDLE"
          class="nodes"
          :class="{ actived: selectedType === BatchOption.Handling }"
          @click="showCheckbox(BatchOption.Handling)"
        >
          {{ t('arcomn.handling') }}
        </div>
        <!-- 批量重新打开 -->
        <div
          v-if="handleType === HANDLETYPE.IGNORE || handleType === HANDLETYPE.CONFIRM"
          class="nodes"
          :class="{ actived: selectedType === BatchOption.Reopen }"
          @click="showCheckbox(BatchOption.Reopen)"
        >
          {{ t('arcomn.reopen') }}
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
  import { useI18n } from 'vue-i18n';
  import { FunnelPlotOutlined } from '@ant-design/icons-vue';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { HANDLESTATUS, HANDLETYPE } from '@/enums/attack_risk';
  import { BatchOption } from '../../type';
  import { PropType } from 'vue';
  const props = defineProps({
    selectedType: String as PropType<BatchOption>,
    isCheck: Boolean,
    refreshTable: Function,
    handleType: Number as PropType<HANDLETYPE>,
    subTitle: String,
  });
  const emit = defineEmits(['update:isCheck', 'update:selectedType', 'update:disabledKeys']);
  const { t } = useI18n();

  //显示选择框
  const showCheckbox = (type: BatchOption) => {
    //重复选择  关闭
    if (props.selectedType === type) {
      emit('update:isCheck', false);
      emit('update:selectedType', '');
    } else {
      //选择另一种
      emit('update:selectedType', type);
      emit('update:isCheck', true);
      emit('update:disabledKeys', [{ key: 'handled', value: HANDLESTATUS.GUIDANG }]);
    }
    props.refreshTable!(true);
    initRowSelection();
  };
</script>
<style lang="less" scoped>
  .container {
    padding: 8px 0;

    width: 200px;
    .subtitle {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 16px;
    }
    .actived {
      background: #eee !important;
    }

    .nodes {
      padding: 0 16px;
      width: 200px;
      height: 40px;
      display: flex;
      align-items: center;
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
</style>
