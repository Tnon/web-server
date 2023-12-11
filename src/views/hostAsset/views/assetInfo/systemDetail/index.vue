<template>
  <div class="dcontent">
    <div class="header">
      <span class="title" @click="goBack">
        <customIcon type="#ax-arrow-left" size="24" />
        <span class="titmsg"> {{ title }}</span>
      </span>
      <div class="rightOpt">
        <!-- 资产视图搜索 start -->
        <a-input-search
          class="search"
          v-model:value.trim="agms.searchdata"
          :title="t('common.hostNameIp')"
          :placeholder="t('common.hostNameIp')"
          @search="searchData"
          @change="searchData"
        />
        <!-- 资产视图搜索 end -->

        <!-- 分割线 start -->
        <div class="line"></div>
        <!-- 分割线 end -->

        <!-- 导出 start -->
        <export-data :api="apiDetail" :params="agms" />
        <!-- 导出 end -->
      </div>
    </div>
    <!-- 表格 start -->
    <slots-table
      ref="tableRef"
      :scroll="{ x: '500px', y: 'calc(100vh - 231px)' }"
      class="tabCon hasSubTable"
      v-model:columns="columns"
      row-key="host_id"
      :get-list-func="systemDetailList"
      :arguments="agms"
    />
    <!-- 表格 end -->
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  // import { RightOutlined } from '@ant-design/icons-vue';
  import { SlotsTable } from '@/components/slots-table';
  import { useRouter, useRoute } from 'vue-router';
  import { useColumns } from './index';
  import { TableColumn } from '@/types/tableColumn';
  import { useI18n } from 'vue-i18n';
  import exportData from '@/components/exportData';
  import { systemDetailList } from '@/api/asset/hostInfo/host';

  const { t } = useI18n();
  //路由相关
  const router = useRouter();
  const currentRoute = useRoute();
  //table
  const tableRef: any = ref<HTMLElement>();
  const { title } = currentRoute.query;
  const columns: TableColumn[] = useColumns(t);

  //table Arguments
  const agms = reactive<Arguments>({
    os: title as string,
    searchdata: '',
  });
  //go Pro or Ip
  const goBack = () => {
    router.go(-1);
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
  //导出
  const apiDetail: string = '/api/report/osentity';
</script>
<style lang="less" scoped>
  .expanded {
    transform: rotateZ(90deg);
  }
  .rotate {
    transition: all 0.2s;
  }
  .dcontent {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;
  }
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 0 0 48px;
    padding: 0 16px;
    .title {
      color: rgba(0, 0, 0, 0.8);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      .cusicon {
        margin: 0 4px;
      }
      .titmsg {
        transition: all 0.3s;
        margin-left: 0px;
        font-weight: 600;
        font-size: @fz15;
      }
      &:hover {
        .titmsg {
          margin-left: 4px;
        }
      }
    }
    .rightOpt {
      display: flex;
      align-items: center;
      .line {
        width: 1px;
        height: 24px;
        background: #eeeeee;
        margin: 0 16px;
      }
    }
    .search {
      width: 220px;
      align-items: center;
      margin-right: 16px;
    }
  }

  .tabCon {
    margin: 0 16px;
  }
</style>
