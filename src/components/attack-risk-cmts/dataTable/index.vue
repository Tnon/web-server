<template>
  <div class="content">
    <!-- 页头 start -->
    <page-header class="pageHeader" @confirm="btnConfirm" :params="agms" :fromAsset="fromAsset">
      <slot name="handleSwitch"></slot>
      <template #title>
        <!-- 批量确定 start -->
        <batch-bar
          v-if="isCheck"
          :selectedType="selectedType"
          v-model:isCheck="isCheck"
          :tableRef="tableRef"
          :agms="agms"
          :source="MODELTYPE.ATTACK"
          :refreshTable="reload"
        />
        <!-- 批量确定 end -->
      </template>
      <template #search v-if="!fromAsset">
        <a-input-search
          v-model:value.trim="agms.search_data"
          :placeholder="t('attack.attPlace')"
          class="searchIn"
          @search="onSearch"
          @change="onSearch"
        />
      </template>
      <template #record>
        <!-- 人工处置记录 start -->
        <people-record
          :source="MODELTYPE.ATTACK"
          :fromAsset="fromAsset"
          :search_data="search_data"
        />
        <!-- 人工处置记录 end -->
      </template>
      <template #mark>
        <!-- 批量标记 start -->
        <batch-pop
          :subTitle="t('arcomn.gjcl')"
          :handleType="handleType"
          :refreshTable="refreshTable"
          v-model:selectedType="selectedType"
          v-model:disabledKeys="disabledKeys"
          v-model:isCheck="isCheck"
        />
        <!-- 批量标记 end -->
      </template>
      <template #export>
        <export-data :api="apiAttactRist" :params="agms" />
      </template>
      <template #refresh>
        <autoRefresh
          ref="autoRefreshRef"
          :tokenType="fromAsset ? MODELTYPE.ATTACK + 'asset' : MODELTYPE.ATTACK + ''"
          :refreshMothod="refreshMothod"
        />
      </template>
    </page-header>
    <!-- 页头 end -->
    <!-- 数据表 start -->
    <slots-table
      class="dataTable"
      :scroll="{ y: fromAsset ? 'calc(100vh - 383px)' : 'calc(100vh - 167px)' }"
      ref="tableRef"
      :columns="columns"
      :disabledKeys="disabledKeys"
      row-key="id"
      :get-list-func="getTableList"
      :arguments="agms"
      :customRow="customRow"
      :isCheck="isCheck"
      :refreshRoundChange="refreshRoundChange"
      :get-can-select-func="getCanSelecAlarmtApi"
    />
    <!-- 数据表 end -->
  </div>
</template>
<script lang="ts" setup>
  import { PropType, ref, reactive, watch, unref, watchEffect } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import pageHeader from '@/components/attack-risk-cmts/pageHeader';
  import attackDrawer from '@/components/attack-risk-cmts/attackDrawer';
  import { getTableList, getCanSelecAlarmtApi } from '@/api/attack_risk';
  import { useClickRow } from '@/hooks';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { HANDLETYPE, MODELTYPE } from '@/enums/attack_risk';
  import { useColumns } from './columns';
  import { useI18n } from 'vue-i18n';
  import exportData from '@/components/exportData';
  import autoRefresh from '@/components/refreshAuto';
  import batchPop from './cmts/batPop';
  import batchBar from './cmts/batchBar';
  import { useRoute } from 'vue-router';
  import { BatchOption } from './type';
  import peopleRecord from './cmts/peopleRecord';
  import { AttackTableparams } from '@/api/attack_risk/model';

  const props = defineProps({
    handleType: {
      type: Number as PropType<HANDLETYPE>,
      required: true,
    },
    selectedKeys: {
      type: String as PropType<MODELTYPE>,
      required: true,
    },
    reloadTree: Function,
    //资产想起页面传输
    search_data: String,
    fromAsset: Boolean,
    host_id: String,
  });
  const currentRouter = useRoute();
  // 总览跳转携带参数
  const {
    query: { begintime, endtime },
    params: { policy_id },
  } = currentRouter.redirectedFrom ?? (currentRouter as any);
  //禁选
  const disabledKeys = ref<any>([]);
  const { t } = useI18n();
  const isCheck = ref<boolean>(false);
  const tableRef = ref<any>(null);
  const autoRefreshRef = ref<any>(null);
  const selectedType = ref<BatchOption | undefined>(undefined);
  //工厂函数getColumns
  const columns = ref<any>([]);
  //刷新的函数
  const refreshMothod = () => {
    initRowSelection();
    unref(tableRef).refreshTableData(false, true);
    props.reloadTree!(true);
  };
  const refreshRoundChange = () => {
    if (unref(autoRefreshRef).isOpenSilence) {
      unref(autoRefreshRef).refreshRoundChange();
    }
  };

  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
    initRowSelection();
    refreshRoundChange();
  };
  //刷新表格和树
  const reload = (keepPage?: boolean): void => {
    props.reloadTree!();
    refreshTable(keepPage);
  };
  //单机行的事件
  const customRow = useClickRow(attackDrawer, {
    title: t('attack.detailTitle'),
    drawClass: 'attackDraw',
    refreshTable: reload,
  });
  //表格筛选条件
  const agms = reactive<AttackTableparams>({
    //搜索框
    search_data: props.search_data ?? '',
    //处置类型
    handle: props.handleType,
    //攻击类型
    risk_path: props.selectedKeys,
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
    detail_id_list: policy_id ?? '',
    //资产详情特殊
    host_id: props.host_id ?? '',
  });

  // 1.不需要手动传入依赖
  // 2.每次初始化时会执行一次回调函数来自动获取依赖
  // 3.无法获取到原值，只能得到变化后的值
  watchEffect(() => {
    columns.value = useColumns(props.handleType!, reload, isCheck, t, props.fromAsset);
  });
  //监听入参
  watch(
    () => [props.handleType, props.selectedKeys],
    ([newH, newA]) => {
      isCheck.value = false;
      agms.handle = newH as HANDLETYPE;
      agms.risk_path = newA! as MODELTYPE;
      refreshTable();
    },
  );

  //筛选条件确定
  const btnConfirm = (v) => {
    Object.assign(agms, v);
    refreshTable();
  };

  // 搜索框变化刷新表格
  const onSearch = (v, e) => {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      refreshTable();
    }
    if (!value && !e) {
      refreshTable();
    }
  };
  //清空选择
  watch(isCheck, (v) => {
    if (!v) {
      selectedType.value = undefined;
    }
  });

  //导出
  const apiAttactRist = ref<string>('/api/report/attackinfo');
</script>
<style lang="less" scoped>
  @import url('@/components/attack-risk-cmts/style/index.less');
</style>
