<template>
  <div class="proContent">
    <div class="header">
      <span class="title">
        <span> {{ state.title }}：{{ state.total }}</span>
      </span>
      <div class="rightOpt">
        <!-- 详情搜索 start -->
        <a-input-search
          class="search"
          :title="state.placeholder"
          v-model:value.trim="agms.name"
          :placeholder="state.placeholder"
          @search="searchData"
          @change="searchData"
        />
        <!-- 详情搜索 end -->

        <!-- 高级筛选 start -->
        <advanSearch class="filters" :type="state.type" :params="agms" @confirm="btnConfirm" />
        <!-- 高级筛选 end -->

        <!-- 切换视图 start -->
        <a-button type="text" class="swt_view" @click="switchView">
          <template #icon>
            <WalletOutlined />
          </template>
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
        <export-data :api="state.assetTypeApi" :params="agms" />
        <!-- 导出 end -->
      </div>
    </div>
    <!-- 表格 start -->
    <slots-table
      ref="tableRef"
      :scroll="{ y: 'calc(100vh - 223px)' }"
      v-model:totalNum="state.total"
      class="tabCon"
      v-model:columns="state.columns"
      row-key="name"
      :get-list-func="state.api"
      :arguments="agms"
    >
      <!--  自定义slots start-->
      <template #bodyCellcustom="{ record, column, text }">
        <template v-if="column.dataIndex === 'host_count'">
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
  import { createVNode, reactive, ref, unref, watch } from 'vue';
  import { WalletOutlined } from '@ant-design/icons-vue';
  import { SlotsTable } from '@/components/slots-table';
  import { useRouter, useRoute } from 'vue-router';
  import { useOptions } from './settings';
  import { TableColumn } from '@/types/tableColumn';
  import { useI18n } from 'vue-i18n';
  import exportData from '@/components/exportData';
  import advanSearch from '../cmts/advanSearch';
  import { I_Risk_View } from './type';
  import { scanRiskApi } from '@/api/asset/accountRisk/apprisk';
  import { useModal } from '@/hooks';

  const { t } = useI18n();
  const router = useRouter();
  const currentRoute = useRoute();
  const tableRef: any = ref<HTMLElement>();
  const state = reactive<{
    columns: TableColumn[];
    placeholder: string;
    title: string;
    api(...rest): Promise<any>;
    type: string;
    total: number;
    assetTypeApi: string;
  }>({
    columns: [],
    placeholder: '',
    title: '',
    api: () => ({} as Promise<any>),
    type: '',
    total: 0,
    assetTypeApi: '',
  }) as any;

  //state  hook
  useOptions(state, currentRoute.meta.type as string, t);
  watch(
    () => currentRoute.meta.type,
    (type) => {
      if (!type) return;
      if (
        unref(currentRoute.name as string).indexOf('accountRisk') > -1 &&
        (unref(currentRoute.name as string).indexOf('apprisk') > -1 ||
          unref(currentRoute.name as string).indexOf('sysrisk') > -1 ||
          unref(currentRoute.name as string).indexOf('accrisk') > -1)
      ) {
        useOptions(state, type as string, t);
      }
      // 监听viewPro之间的切换拿到最新的type
    },
  );
  //table arguments
  const agms = reactive<I_Risk_View>({
    name: '',
    uuid: undefined,
  });

  //switchView
  const switchView = () => {
    router.push({ name: 'hostAsset-layout-accountRisk-' + state.type + '-viewIp' });
  };

  //扫描风险
  const scanRisk = () => {
    useModal(
      {
        title: t('asset.qdilijs'),
        handleOk: () => {
          scanRiskApi('/api/asset/' + state.type + '/scan');
        },
      },
      createVNode('span', null, ''),
    );
  };

  //go to detail page
  const jumpDetail = (record) => {
    router.push({
      name: 'hostAsset-layout-accountRisk-' + state.type + '-detail',
      query: {
        title: record.name,
        type: state.type,
        view: 'Pro',
        uuid: record.uuid,
      },
    });
  };

  //search events
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

  .tabCon {
    margin: 0 16px;
  }

  .num_color {
    color: #18ba79;
    cursor: pointer;
  }
</style>
