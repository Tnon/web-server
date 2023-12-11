<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-14 14:12:56
 * @LastEditTime: 2023-10-16 10:25:34
-->
<template>
  <div class="contentp">
    <!-- 卡片筛选 start -->
    <detailAssetsFilter v-model:actived="viewType" :id="id" />
    <!-- 卡片筛选 end -->
    <div class="tableTitle">
      <a-input-search
        :placeholder="othSta.placeHodler"
        class="search"
        @search="onSearch"
        @change="onSearch"
        v-model:value.trim="state.name"
      />
    </div>
    <!-- 表格 start-->
    <div class="box">
      <slots-table
        :scroll="{ y: 'calc(100vh - 479px)' }"
        ref="tableRef"
        v-model:columns="othSta.columnsData"
        row-key="vul_id"
        :get-list-func="othSta.api"
        class="hostDetailTable"
        :arguments="state"
      />
    </div>
    <!-- 表格 end-->
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, watchEffect } from 'vue';
  import detailAssetsFilter from './cmts/detailAssetsFilter';
  import { SlotsTable } from '@/components/slots-table';
  import { useI18n } from 'vue-i18n';
  import { getapi_columnsDetail as getapi_columnsDetailPwd } from '@/views/hostAsset/views/riskAsset/accountRisk/detail/detailCol';
  import { getapi_columnsDetail as getapi_columnsDetailAsA } from '@/views/hostAsset/views/riskAsset/appSysAccRisk/detail/detailCol';
  import detailApi from '@/api/asset/accountRisk';
  const props = defineProps({
    id: String,
  });
  const { t } = useI18n();
  const tableRef = ref<any>();
  const state = reactive({
    host_id: props.id!,
    name: '',
  });
  const viewType = ref('weakpwd');
  const othSta = reactive<any>({
    placeHodler: t('asset.pInput', [t(`asset.${viewType.value}Name`)]),
    api: detailApi[`api_${viewType.value}`]['getHostViewDetail'],
    columnsData: getapi_columnsDetailPwd(`${viewType.value}Ip`, t),
  });
  watchEffect(() => {
    let finalApi_columnsDetail: any = undefined;
    if (viewType.value === 'weakpwd' || viewType.value === 'appweakpwd') {
      finalApi_columnsDetail = getapi_columnsDetailPwd;
    } else {
      finalApi_columnsDetail = getapi_columnsDetailAsA;
    }
    othSta.placeHodler = t('asset.pInput', [t(`asset.${viewType.value}Name`)]);
    othSta.api = detailApi[`api_${viewType.value}`]['getHostViewDetail'];
    othSta.columnsData = finalApi_columnsDetail(`${viewType.value}Ip`, t);
  });
  //切换表头
  // watch(viewType, (v) => {
  //   othSta.api = detailApi[`api_${v}`]['getHostViewDetail'];
  // });
  // 搜索框变化刷新表格
  const onSearch = (v, e) => {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      tableRef.value.refreshTableData();
    }
    if (!value && !e) {
      tableRef.value.refreshTableData();
    }
  };
</script>

<style lang="less" scoped>
  .contentp {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .box {
    flex: 1;
    background: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }
  .search {
    width: 220px;
    margin-right: 16px;
  }

  .tableTitle {
    padding: 8px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
  }
  .num_color {
    color: #18ba79;
    cursor: pointer;
  }
</style>
