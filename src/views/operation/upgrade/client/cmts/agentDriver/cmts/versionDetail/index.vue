<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 19:03:34
 * @LastEditTime: 2023-05-31 18:27:07
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
        :filterType="1"
      />
      <div class="node">
        <div class="label">
          {{
            type === 'driver_upgraded_status' ? t('operation.adaupd') : t('operation.Upgradeable')
          }}
        </div>
        <div class="val warning" @click="changeFilter('update')">{{ state.update }}</div>
      </div>
      <div class="node">
        <div class="label">
          {{ type === 'driver_upgraded_status' ? t('operation.adaerr') : t('operation.upgraFail') }}
        </div>
        <div class="val error" @click="changeFilter('error')">{{ state.error }}</div>
      </div>
    </div>
    <!-- 左侧echart end -->
    <!-- 表格 start -->
    <div class="tabc">
      <slots-table
        :columns="columns"
        :getListFunc="getagentordriverVersion"
        :scroll="{ y: '500px' }"
        :arguments="agms"
        rowKey="host_id"
      />
    </div>
    <!-- 表格 end -->
  </div>
</template>

<script setup lang="ts">
  import echartProgress from '@/views/operation/upgrade/components/echartProgress';
  import { useI18n } from 'vue-i18n';
  import { SlotsTable } from '@/components/slots-table';
  import { getagentordriverVersion } from '@/api/operation/upgrade';
  import { useColumns } from './index';
  import { PropType, reactive } from 'vue';
  import { ClientFilter } from '@/api/operation/model';
  import { UPGRADESTATUS, ADAPTASTATUS } from '@/enums/pstatus';
  const { t } = useI18n();
  const props = defineProps({
    filter: {
      type: Object as PropType<Partial<ClientFilter>>,
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
  //表格参数
  const agms = reactive({
    osver: props.filter.osver,
    ver_kind: props.type === 'driver_upgraded_status' ? 2 : 1,
  });
  //行内点击主机数量，筛选版本
  const changeVersion = (version: string) => {
    if (props.type === 'driver_upgraded_status') {
      props.filter!.driver_version = version;
    } else {
      props.filter!.agent_version = version;
    }
  };
  //外部点击数量，筛选版本类型
  const changeFilter = (str) => {
    let type: UPGRADESTATUS | ADAPTASTATUS | undefined = undefined;
    if (props.type === 'driver_upgraded_status') {
      if (str === 'update') {
        type = ADAPTASTATUS.Updateable;
      } else if (str === 'error') {
        type = ADAPTASTATUS.Error;
      } else {
        type = ADAPTASTATUS.Adapted;
      }
    } else {
      if (str === 'update') {
        type = UPGRADESTATUS.UPGRADEABLE;
      } else if (str === 'error') {
        type = UPGRADESTATUS.FAILED;
      } else {
        type = UPGRADESTATUS.LATEST;
      }
    }
    props.filter![props.type!] = type;
    props.closeModal!();
  };
  const columns = useColumns(t, changeVersion, props.type, props.closeModal);
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
    .tabc {
      flex: 1;
      overflow: hidden;
    }
  }
</style>
