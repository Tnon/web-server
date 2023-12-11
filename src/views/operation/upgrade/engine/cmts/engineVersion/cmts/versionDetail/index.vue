<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 19:03:34
 * @LastEditTime: 2022-09-07 18:36:30
-->
<template>
  <div class="container">
    <!-- 左侧echart start -->
    <div class="charts">
      <echartProgress
        class="pie"
        :title="title"
        :success="state.success"
        :update="state.update"
        :error="state.error"
        :changeFilter="changeFilter"
        :filterType="ENGINESTATUS.LATEST"
      />
      <div class="node">
        <div class="label">
          {{ t('operation.adaupd') }}
        </div>
        <div class="val warning" @click="changeFilter(ENGINESTATUS.UPGRADEABLE)">
          {{ state.update }}
        </div>
      </div>
      <div class="node">
        <div class="label">
          {{ t('operation.upgraFail') }}
        </div>
        <div class="val error" @click="changeFilter(ENGINESTATUS.FAILED)">{{ state.error }}</div>
      </div>
    </div>
    <!-- 左侧echart end -->
    <!-- 表格 start -->
    <slots-table
      :columns="columns"
      :arguments="filter"
      :getListFunc="getEngineVersion"
      :scroll="{ y: '500px' }"
      rowKey="host_id"
    />
    <!-- 表格 end -->
  </div>
</template>

<script setup lang="ts">
  import echartProgress from '@/views/operation/upgrade/components/echartProgress';
  import { useI18n } from 'vue-i18n';
  import { SlotsTable } from '@/components/slots-table';
  import { getEngineVersion } from '@/api/operation/upgrade';
  import { useColumns } from './index';
  import { PropType } from 'vue';
  import { ENGINESTATUS } from '@/enums/pstatus';
  import { EngineFilter } from '@/api/operation/model';
  const { t } = useI18n();
  const props = defineProps({
    filter: {
      type: Object as PropType<Partial<EngineFilter>>,
      required: true,
    },
    title: String,
    type: String,
    state: {
      type: Object,
      required: true,
    },
    closeModal: Function,
  });

  //行内点击主机数量，筛选版本
  const changeVersion = (version: string) => {
    props.filter!.engine_version = version;
  };
  //外部点击数量，筛选版本类型
  const changeFilter = (type) => {
    props.filter![props.type!] = type;
    props.closeModal!();
  };
  const columns = useColumns(t, changeVersion, props.closeModal);
</script>

<style scoped lang="less">
  .container {
    display: flex;
    padding: 8px 0 16px 0;
    .charts {
      display: flex;
      flex-direction: column;
      flex: 220px 0 0;
      align-items: center;
      .pie {
        margin: 40px 0 20px 0;
      }
      .node {
        text-align: center;
        padding: 16px 0;
        .label {
          font-size: @fz14;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.8);
          line-height: 24px;
        }
        .val {
          font-size: @fz16;
          font-weight: 600;
          line-height: 24px;
          cursor: pointer;
        }
        .warning {
          color: @warn-color;
        }
        .error {
          color: @danger-color;
        }
      }
    }
  }
</style>
