<template>
  <div class="proContent">
    <div class="header">
      <span class="title">
        <span> {{ t('asset.hostNum') }}：{{ state.total }}</span>
      </span>
      <div class="rightOpt">
        <!-- 主机视图搜索 start -->
        <a-input-search
          :title="t('common.hostNameIp')"
          class="search"
          v-model:value.trim="agms.searchdata"
          :placeholder="t('common.hostNameIp')"
          @search="searchData"
          @change="searchData"
        />
        <!-- 主机视图搜索 end -->

        <!-- 高级筛选 start -->
        <advanSearch class="filters" :type="type" :params="agms" @confirm="btnConfirm" />
        <!-- 高级筛选 end -->

        <!-- 切换视图 start -->
        <a-button type="text" class="swt_view" @click="switchView">
          <template #icon><WalletOutlined /></template>
          {{ t('asset.swtView') }}
        </a-button>
        <!-- 切换视图 end -->

        <!-- 立即扫描 start -->
        <a-button type="primary" class="scan" @click="scanRisk">
          {{ t('asset.ljsm') }}
        </a-button>
        <!-- 立即扫描 end -->

        <!-- 分割线 start -->
        <div class="line"></div>
        <!-- 分割线 end -->

        <!-- 导出 start -->
        <export-data :api="`/api/report/${type}/hostview`" :params="agms" />
        <!-- 导出 end -->
      </div>
    </div>
    <!-- 表格 start -->
    <slots-table
      ref="tableRef"
      :scroll="{ y: 'calc(100vh - 223px)' }"
      v-model:totalNum="state.total"
      class="tabCon show_group_path"
      v-model:columns="state.columns"
      row-key="host_id"
      :get-list-func="state.api"
      :arguments="agms"
    >
      <!--  自定义slots start-->
      <template #bodyCellcustom="{ record, column, text }">
        <template v-if="column.dataIndex === 'count'">
          <span @click="jumpDetail(record)" class="num_color">
            {{ text }}
          </span>
        </template>
      </template>
      <!--    自定义slots end-->
    </slots-table>
    <!-- 表格 end -->
  </div>
</template>
<script lang="ts" setup>
  import { reactive, watch, ref, unref, createVNode } from 'vue';
  import { WalletOutlined } from '@ant-design/icons-vue';
  import { SlotsTable } from '@/components/slots-table';
  import { useRouter, useRoute } from 'vue-router';
  import { useOptions } from './settings';
  import { TableColumn } from '@/types/tableColumn';
  import { osLogoType } from '@/utils/tools';
  import { useI18n } from 'vue-i18n';
  import { OSTYPE } from '@/enums/assetsType';
  import exportData from '@/components/exportData';
  import advanSearch from '../cmts/advanSearch';
  import { scanRiskApi } from '@/api/asset/accountRisk/apprisk';
  import { useModal } from '@/hooks/use-modal';

  const { t } = useI18n();
  const router = useRouter();
  const currentRoute = useRoute();
  const tableRef: any = ref<HTMLElement>();
  const { type } = currentRoute.meta as any;
  const { ip } = currentRoute.query;
  const state = reactive<{
    columns: TableColumn[];
    api(...rest): Promise<any>;
    total: number;
  }>({
    columns: [],
    api: () => ({} as Promise<any>),
    total: 0,
  }) as any;
  //state hook
  useOptions(state, type as string, t);
  //table arguments
  const agms = reactive({
    searchdata: ip ? (ip as string) : '',
    // 屏蔽windows
    osver: OSTYPE.LINUX,
    uuid: undefined,
  });

  //switch Views
  const switchView = () => {
    router.push({ name: 'hostAsset-layout-accountRisk-' + type + '-viewPro' });
  };

  //go to detail page
  const jumpDetail = (record) => {
    const logoType = unref(osLogoType(record.os, record.online));
    router.push({
      name: 'hostAsset-layout-accountRisk-' + type + '-detail',
      query: {
        host_id: record.host_id,
        title: record.ip,
        type: type as string,
        view: 'Ip',
        logoType,
      },
    });
  };

  //refreshTable Data
  watch([() => agms.osver], () => {
    tableRef.value.refreshTableData();
  });
  //扫描风险
  const scanRisk = () => {
    useModal(
      {
        title: t('asset.qdilijs'),
        handleOk: () => {
          scanRiskApi('/api/asset/' + type + '/scan');
        },
      },
      createVNode('span', null, ''),
    );
  };

  //search Event
  function searchData(v, e) {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      tableRef.value.refreshTableData();
    }
    if (!value && !e) {
      tableRef.value.refreshTableData();
    }
  }

  //筛选条件确定
  const btnConfirm = (v) => {
    Object.assign(agms, v);
    tableRef.value.refreshTableData();
  };
</script>
<style lang="less" scoped>
  .proContent {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 48px 0 0;
    padding: 0 16px;
    .title {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
    }
    .rightOpt {
      display: flex;
      align-items: center;
      .line {
        width: 1px;
        height: 16px;
        background: #eeeeee;
        margin-right: 16px;
      }
    }
    .search {
      width: 220px;
    }

    .swt_view {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
    }
    .scan {
      margin-left: 16px;
    }
  }
  .show_group_path {
    ::v-deep(.prevNodes) {
      display: inline-block !important;
    }
  }
  .tabCon {
    margin: 0 16px;
  }
  .num_color {
    color: #18ba79;
    cursor: pointer;
  }
</style>
