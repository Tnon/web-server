<template>
  <div class="content">
    <!-- 头部 start -->
    <eventHeader
      v-model:handleType="state.handleType"
      v-model:isCheck="isCheck"
      :agms="agms"
      :tableRef="tableRef"
      :fromAsset="fromAsset"
      ref="eventHeaderRef"
      :refreshTable="refreshTable"
      v-model:disabled-keys="disabledKeys"
    />
    <!-- 头部 end -->
    <!-- 数据表 start -->
    <slots-table
      class="dataTable"
      :scroll="{ y: fromAsset ? 'calc(100vh - 328px)' : 'calc(100vh - 112px)' }"
      ref="tableRef"
      bordered
      :showHeader="false"
      :columns="columns"
      row-key="id"
      :get-list-func="getTableList"
      :arguments="agms"
      :customRow="customRow"
      :isCheck="isCheck"
      :get-can-select-func="getCanSelecAlarmtApi"
      :refreshRoundChange="refreshRoundChange"
    />
    <!-- 数据表 end -->
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, watch, unref, watchEffect } from 'vue';
  import eventHeader from '@/views/ngav/cmts/header';
  import { SlotsTable } from '@/components/slots-table';
  import { getTableList } from '@/api/ngav';
  import { getCanSelecAlarmtApi } from '@/api/attack_risk';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { HANDLETYPE, MODELTYPE } from '@/enums/attack_risk';
  import { useColumns } from './index';
  import { useRoute, useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { AttackTableparams } from '@/api/attack_risk/model';
  const props = defineProps({
    //资产下的事件
    fromAsset: Boolean,
    search_data: String,
    host_id: String,
  });
  const { t } = useI18n();
  const disabledKeys = ref<any>([]);
  const currentRouter = useRoute();
  // 总览跳转携带参数
  const {
    query: { handleType, begintime, endtime },
    params: { policy_id },
  } = currentRouter.redirectedFrom ?? (currentRouter as any);
  const router = useRouter();
  /*
      初始值(包括 处理类型和攻击类型)
      数据入口
      */
  const state = reactive<{
    handleType: HANDLETYPE;
    selectedKeys: string;
  }>({
    handleType: handleType ? Number(handleType) : HANDLETYPE.UNHANDLE,
    selectedKeys: MODELTYPE.NGAVPATH as string,
  });
  //是否在选择状态
  const isCheck = ref<boolean>(false);
  //表格元素
  const tableRef = ref<any>({});
  //工厂函数getColumns
  const columns = ref<any>([]);
  //头部元素，取刷新定时的方法用
  const eventHeaderRef = ref<any>();
  //取定时刷新的方法
  const refreshRoundChange = () => {
    unref(eventHeaderRef).refreshRoundChange();
  };
  //刷新表格的方法（刷新表格，初始化选择，刷新轮询）
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
    initRowSelection();
    refreshRoundChange();
  };
  //单机行的事件
  const customRow = (record) => {
    return {
      onClick(e) {
        // 如果点击到了td这个标签上则弹出抽屉e.target是一个html标签
        const flag =
          e.target.nodeName.toUpperCase() !== 'BUTTON' &&
          e.target.nodeName.toUpperCase() !== 'SVG' &&
          !e.target.className.includes('hostIpJ');
        flag &&
          router.push({
            name: 'acdr-detail',
            query: {
              id: record.id,
              handle: record.handle,
            },
            params: {
              act_path_sha256: record.act_path_sha256,
            },
          });
      },
    };
  };
  //表格筛选条件
  const agms = reactive<AttackTableparams>({
    // 搜索框
    search_data: props.search_data ?? '',
    // 处理类型
    handle: state.handleType,
    // 攻击类型
    risk_path: state.selectedKeys as MODELTYPE,
    //时间范围
    date_range: begintime || endtime ? begintime + ',' + endtime : '',
    //告警类型
    risk_tab_list: [],
    //处理状态
    risk_status_list: '',
    //攻击源
    risk_src_list: '',
    //影响主机
    ip_list: '',
    //分组
    group_list: '',
    //标签
    tag_list: '',
    //人工处置结果
    dispose_result_list: undefined,
    //当前处置策略
    policy_list: undefined,
    //策略规则id 从策略跳转赋值
    detail_id_list: policy_id ?? undefined,
    //资产详情里的
    host_id: props.host_id ?? '',
  });

  // 1.不需要手动传入依赖
  // 2.每次初始化时会执行一次回调函数来自动获取依赖
  // 3.无法获取到原值，只能得到变化后的值
  watchEffect(() => {
    columns.value = useColumns(state.handleType, refreshTable, isCheck, t, props.fromAsset);
  });
  //监听入参
  watch(
    () => state.handleType,
    (newH) => {
      // if (newH === HANDLETYPE.CONFIRM) {
      isCheck.value = false;
      // }
      agms.handle = newH as HANDLETYPE;
      refreshTable();
    },
  );
</script>
<style lang="less" scoped>
  @import url('@/components/attack-risk-cmts/style/index.less');
  .dataTable {
    :deep(.ant-table-row td) {
      padding: 16px !important;
      border-bottom: 8px solid #fafafa !important;
      border-right: 1px solid rgba(0, 0, 0, 0.04) !important;
      min-height: 100px !important;
      &:first-child {
        border-right: none !important;
      }
      &:last-child {
        border-right: none !important;
      }
    }
    // :deep(.ant-table-cell-row-hover) {
    //   background: none !important;
    // }
    :deep(.tdAbsolute) {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      top: 0;
      left: 0;
      border-radius: 4px 0 0 4px;
    }
    :deep(.ant-table-container) {
      border-left: none !important;
    }
    padding: 0 8px;
  }
</style>
