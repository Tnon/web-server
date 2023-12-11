<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-18 15:02:11
 * @LastEditTime: 2023-10-26 14:52:56
-->
<template>
  <div class="container">
    <!-- 待处理/已处理 start -->
    <switch-nodes class="tabsheader" v-model:actived="handleTypeCmp" size="small" :types="types" />
    <!-- 待处理/已处理 end -->

    <!-- 筛选结果 start -->
    <div v-if="isCheck" class="selectBar">
      <!-- 批量确定 start -->
      <batch-bar
        v-if="isCheck"
        :selectedType="selectedType"
        v-model:isCheck="isCheckCmp"
        :tableRef="tableRef"
        :agms="agms"
        :refreshTable="refreshTable"
        :source="MODELTYPE.NGAV"
      />
      <!-- 批量确定 end -->
    </div>
    <!-- 筛选结果 end -->

    <!-- 条件 start -->
    <div>
      <page-header @confirm="btnConfirm" :params="agms" :fromAsset="fromAsset">
        <template #search v-if="!fromAsset">
          <a-input-search
            v-model:value.trim="agms.search_data"
            :placeholder="t('ngav.pingnm')"
            class="searchIn"
            @search="onSearch"
            @change="onSearch"
          />
        </template>
        <template #record>
          <!-- 人工处置记录 start -->
          <people-record
            :source="MODELTYPE.NGAV"
            :fromAsset="fromAsset"
            :search_data="agms.search_data"
          />
          <!-- 人工处置记录 end -->
        </template>
        <template #mark>
          <!-- 批量标记 start -->
          <batch-pop
            :handleType="handleType"
            :subTitle="t('arcomn.sjcl')"
            :refreshTable="refreshTable"
            v-model:selectedType="selectedType"
            v-model:isCheck="isCheckCmp"
            v-model:disabledKeys="disabledKeysCmp"
          />
          <!-- 批量标记 end -->
        </template>
        <template #export>
          <export-data :api="apiAttactRist" :params="agms" />
        </template>
        <template #refresh>
          <autoRefresh
            ref="autoRefreshRef"
            :tokenType="fromAsset ? MODELTYPE.NGAV + 'asset' : MODELTYPE.NGAV + ''"
            :refreshMothod="refreshMothod"
          />
        </template>
      </page-header>
    </div>
    <!-- 条件 end -->
  </div>
</template>

<script setup lang="ts">
  import pageHeader from '@/components/attack-risk-cmts/pageHeader';
  import switchNodes from '@/components/switchNodes';
  import { HANDLETYPE, MODELTYPE } from '@/enums/attack_risk';
  import { computed, PropType, ref, unref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import exportData from '@/components/exportData';
  import autoRefresh from '@/components/refreshAuto';
  import { getHandleTabs } from '@/views/attack/cmts/header';
  import { BatchOption } from '@/components/attack-risk-cmts/dataTable/type';
  import batchPop from '@/components/attack-risk-cmts/dataTable/cmts/batPop';
  import batchBar from '@/components/attack-risk-cmts/dataTable/cmts/batchBar';
  import peopleRecord from '@/components/attack-risk-cmts/dataTable/cmts/peopleRecord';
  import { AttackTableparams } from '@/api/attack_risk/model';
  const { t } = useI18n();
  //属性
  const props = defineProps({
    handleType: {
      type: Number as PropType<HANDLETYPE>,
      required: true,
    },
    agms: {
      type: Object as PropType<AttackTableparams>,
      required: true,
    },
    isCheck: {
      type: Boolean,
      required: true,
    },
    tableRef: {
      type: Object,
      required: true,
    },
    refreshTable: {
      type: Function,
      required: true,
    },
    fromAsset: {
      type: Boolean,
    },
    disabledKeys: {
      type: Array,
      required: true,
    },
  });
  //派发
  const emit = defineEmits(['update:handleType', 'update:isCheck', 'update:disabledKeys']);
  //tabs
  const types = getHandleTabs();
  const isCheckCmp = computed({
    get: () => props.isCheck,
    set: (v) => emit('update:isCheck', v),
  });
  const disabledKeysCmp = computed({
    get: () => props.disabledKeys,
    set: (v) => emit('update:disabledKeys', v),
  });
  //批量选择类型
  const selectedType = ref<BatchOption | undefined>(undefined);
  const autoRefreshRef = ref<any>(null);
  //定时刷新重置
  const refreshRoundChange = () => {
    if (unref(autoRefreshRef).isOpenSilence) {
      unref(autoRefreshRef).refreshRoundChange();
    }
  };
  //导出
  const apiAttactRist = ref<string>('/api/report/acdr/event_list');
  //计算属性来get / set (层级太多，有点傻X)
  const handleTypeCmp = computed({
    get: (): HANDLETYPE => props.handleType!,
    set: (val: HANDLETYPE): void => emit('update:handleType', val),
  });
  //筛选条件确定
  const btnConfirm = (v) => {
    Object.assign(props.agms!, v);
    props.refreshTable();
  };
  //刷新的函数
  const refreshMothod = () => {
    initRowSelection();
    unref(props.tableRef).refreshTableData(false, true);
  };

  // 搜索框变化刷新表格
  const onSearch = (v, e?) => {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      props.refreshTable();
    }
    if (!value && !e) {
      props.refreshTable();
    }
  };
  //清空选择
  watch(
    () => props.isCheck,
    (v) => {
      if (!v) {
        selectedType.value = undefined;
      }
    },
  );
  defineExpose({ refreshRoundChange });
</script>

<style scoped lang="less">
  .container {
    display: flex;
    align-items: center;
    flex: 48px 0 0;
    padding: 0 8px;
    justify-content: space-between;
    .tabsheader {
      :deep(.smallS) {
        padding: 2px 12px;
      }
      :deep(.actived) {
        background-color: #fff;
      }
      background: rgba(0, 0, 0, 0.08);
    }
    .selectBar {
      flex: 1;
      border-radius: 4px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
    }
    .searchIn {
      width: 220px;
    }
    .tools {
      flex: 1;
    }
  }
</style>
