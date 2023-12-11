<template>
  <div class="drawCon">
    <!-- 头部 start -->
    <div class="header">
      <div class="title">
        <div class="label">{{ t('strategy.hostGroup') }}：</div>
        {{ options.group_name }}
      </div>
      <div class="title">
        <div class="label">{{ t('strategy.straAppTime') }}</div>
        {{ stateOption.send_time }}
      </div>
    </div>
    <!-- 头部 end-->
    <a-table
      class="tabcont"
      size="small"
      bordered
      :pagination="false"
      :columns="engineColumns"
      :dataSource="[stateOption]"
    />
    <div class="drawTable">
      <!-- 表格 start -->
      <slots-table
        v-model:columns="columns"
        row-key="host_id"
        :get-list-func="getEffectHosts"
        :scroll="{ y: 'calc(100vh - 386px)' }"
        :page-option="{ size: 'small', showSizeChanger: true, showQuickJumper: true }"
        :arguments="agms"
      />
      <!-- 表格 end -->
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, PropType } from 'vue';
  import { useColumns, GroupMsg, useStaticColumns } from './index';
  import { SlotsTable } from '@/components/slots-table';
  import { getEffectOption, getEffectHosts } from '@/api/strategy/safe';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    options: {
      type: Object as PropType<GroupMsg>,
      required: true,
    },
    title: String,
    //策略id
    id: Number,
  });

  const { t } = useI18n();
  const columns = useColumns(t);
  const agms = reactive({
    group_id: props.options!.group_id,
    id: props.id,
  });
  //生效时间 下发范围 生效数量/未生效数量
  const stateOption = reactive({
    send_time: '',
    total: 0,
    success: 0,
    fail: 0,
    host_total: 0,
  });
  //列
  const engineColumns = useStaticColumns(t);

  const getStateOption = async () => {
    const { send_time, total, success, fail, host_total } = await getEffectOption({
      group_id: props.options!.group_id,
      id: props.id!,
    });
    stateOption.send_time = send_time;
    stateOption.total = total;
    stateOption.success = success;
    stateOption.fail = fail;
    stateOption.host_total = host_total;
  };
  getStateOption();
</script>

<style lang="less" scoped>
  .header {
    .title {
      font-size: @fz12;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      .label {
        margin-right: 8px;
      }
    }
  }
  .tabcont {
    margin-bottom: 16px;
  }

  .drawCon {
    .drawTable {
      height: calc(100vh - 278px);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
  }
</style>
