<template>
  <div class="dcontent">
    <div class="header">
      <span class="title" @click="goBack">
        <customIcon type="#ax-arrow-left" size="24" />
        <customIcon class="selfIcon" v-if="view === 'Ip'" :type="logoType" size="24" />
        <span class="titmsg"> {{ title }}</span>
      </span>
      <div class="rightOpt">
        <!-- 资产视图搜索 start -->
        <a-input-search
          class="search"
          v-if="view === 'Pro'"
          v-model:value.trim="agms.searchdata"
          :title="t('common.hostNameIp')"
          :placeholder="t('common.hostNameIp')"
          @search="searchData"
          @change="searchData"
        />
        <!-- 资产视图搜索 end -->

        <!-- 主机视图搜索 start -->
        <a-input-search
          v-else
          class="search"
          v-model:value.trim="agms.name"
          :title="t('asset.pInput', [t(`asset.${type}Name`)])"
          :placeholder="t('asset.pInput', [t(`asset.${type}Name`)])"
          @search="searchData"
          @change="searchData"
        />
        <!-- 主机视图搜索 end -->

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
      :scroll="{ y: 'calc(100vh - 223px)' }"
      class="tabCon hasSubTable"
      v-model:columns="columns"
      :row-key="view === 'Pro' ? 'host_id' : columns[0].dataIndex"
      :get-list-func="api"
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
  import { getapi_columnsDetail } from './detailCol';
  import detailApi from '@/api/asset/accountRisk';
  import { TableColumn } from '@/types/tableColumn';
  import { useI18n } from 'vue-i18n';
  import exportData from '@/components/exportData';
  // import subTable from './cmts/subTable';

  const { t } = useI18n();
  //路由相关
  const router = useRouter();
  const currentRoute = useRoute();
  //table
  const tableRef: any = ref<HTMLElement>();
  //hostIP / assetsName  id  type:{process,kernel....}  view:{Pro,Ip}
  const { title, host_id, type, view, logoType } = currentRoute.query;
  const columns: TableColumn[] = getapi_columnsDetail('' + type + view, t);

  //table Api
  const api =
    view === 'Pro'
      ? detailApi[`api_${type}`]['getAssetViewDetail']
      : detailApi[`api_${type}`]['getHostViewDetail'];

  // 子表格 api
  // const subApi = detailApi[`api_${type}`]['getAssetExpand'] ?? '';

  //table Arguments
  const agms = reactive<Arguments>({
    [view === 'Ip' ? 'host_id' : 'name']: view === 'Ip' ? (host_id as string) : (title as string),
    [view === 'Ip' ? 'name' : 'searchdata']: '',
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
  const apiDetail: string =
    '/api/report/' + type + '/' + (view === 'Ip' ? 'hostdetailview' : 'assetdetailview');
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
      .selfIcon {
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
