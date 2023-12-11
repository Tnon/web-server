<template>
  <a-popover trigger="click" placement="bottomRight" overlayClassName="batchM">
    <template #content>
      <div class="container">
        <!-- 批量删除 start -->
        <div
          class="nodes"
          :class="{ actived: selectedType == 'delete' }"
          @click="showCheckbox('delete')"
        >
          {{ t('report.delete') }}
        </div>
        <div class="lines"></div>
        <!-- 批量删除 end -->

        <!-- 批量执行 start -->
        <div
          class="nodes"
          :class="{ actived: selectedType == 'execute' }"
          @click="showCheckbox('execute')"
        >
          {{ t('report.execute') }}
        </div>
        <div class="lines"></div>
        <!-- 批量执行 end -->

        <!-- 批量停止执行 start -->
        <div
          class="nodes"
          :class="{ actived: selectedType == 'stopExecute' }"
          @click="showCheckbox('stopExecute')"
        >
          {{ t('report.stopExecute') }}
        </div>
        <!-- 批量停止执行 end -->
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
  import { getBatchExecuteTaskNum, getBatchStopExeTaskNum } from '@/api/report';
  import { FunnelPlotOutlined } from '@ant-design/icons-vue';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { TaskStatus } from '@/enums/reportType';
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
      if (type === 'delete') {
        emit('update:canSelectApi', undefined);
        emit('update:disabledKeys', []);
      } else if (type === 'execute') {
        emit('update:canSelectApi', getBatchExecuteTaskNum);
        emit('update:disabledKeys', [
          { key: 'status', value: TaskStatus.executing },
          { key: 'status', value: TaskStatus.finished },
          { key: 'status', value: TaskStatus.generating },
          { key: 'status', value: TaskStatus.notStart },
        ]);
      } else {
        emit('update:canSelectApi', getBatchStopExeTaskNum);
        emit('update:disabledKeys', [
          { key: 'status', value: TaskStatus.finished },
          { key: 'status', value: TaskStatus.generating },
          { key: 'status', value: TaskStatus.notStart },
          { key: 'status', value: TaskStatus.suspending },
        ]);
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
