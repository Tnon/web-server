<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-18 18:47:50
 * @LastEditTime: 2023-10-16 10:25:55
-->
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
          v-model:value.trim="agms.os"
          :placeholder="state.placeholder"
          @search="searchData"
          @change="searchData"
        />
        <!-- 详情搜索 end -->

        <!-- 切换视图 start -->
        <a-button type="text" class="swt_view" @click="switchView">
          <template #icon>
            <WalletOutlined />
          </template>
          {{ t('asset.swtView') }}
        </a-button>
        <!-- 切换视图 end -->

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
  import { reactive, ref } from 'vue';
  import { WalletOutlined } from '@ant-design/icons-vue';
  import { SlotsTable } from '@/components/slots-table';
  import { useRouter } from 'vue-router';
  import { useOptions } from './index';
  import { TableColumn } from '@/types/tableColumn';
  import { useI18n } from 'vue-i18n';
  import exportData from '@/components/exportData';

  const { t } = useI18n();
  const router = useRouter();
  const tableRef: any = ref<HTMLElement>();
  const state = reactive<{
    columns: TableColumn[];
    placeholder: string;
    title: string;
    api(...rest): Promise<any>;
    total: number;
    assetTypeApi: string;
  }>({
    columns: [],
    placeholder: '',
    title: '',
    api: () => ({} as Promise<any>),
    total: 0,
    assetTypeApi: '',
  }) as any;

  //state  hook
  useOptions(state, t);
  //table arguments
  const agms = reactive({
    os: '',
  });

  //switchView 返回主机主页面
  const switchView = () => {
    router.push({ name: 'hostAsset-layout-assetInfo-host-index' });
  };

  //go to detail page
  const jumpDetail = (record) => {
    router.push({
      name: 'hostAsset-layout-assetInfo-host-systemDetail',
      query: {
        title: record.os,
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
  }

  .tabCon {
    margin: 0 16px;
  }

  .num_color {
    color: #18ba79;
    cursor: pointer;
  }
</style>
