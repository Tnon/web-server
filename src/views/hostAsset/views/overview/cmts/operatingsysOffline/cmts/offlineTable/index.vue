<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-09 13:49:57
 * @LastEditTime: 2023-02-07 18:52:28
-->
<template>
  <div class="offlineTable">
    <!-- 标题 start -->
    <div class="header">
      <span class="title">{{ t('asset.latestOfflineHost') }}</span>
      <span class="moreButton" @click="jumpPage()">{{ t('asset.more') }}</span>
    </div>
    <!-- 标题 end -->

    <!-- table start -->
    <a-table
      rowKey="id"
      :loading="loading"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false"
      :scroll="{ y: '320px' }"
    />
    <!-- table start -->
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { useColumns } from './index';
  import { getHostList } from '@/api/asset/hostInfo/host';
  import {
    ONLINESTATUS,
    ORDERBYOFFLINE,
    ASSETSTATUS,
    OSTYPE,
    SECURESTATUS,
  } from '@/enums/assetsType';

  const props = defineProps({
    refreshMethods: {
      type: Object,
      required: false,
    },
  });
  const { t } = useI18n();
  const router = useRouter();
  const columns = useColumns(t);
  // 表格数据
  const dataSource = ref([]);
  const loading = ref<boolean>(true);
  const getTableData = async () => {
    const { items } = await getHostList({
      page: { page_index: 1, page_size: 5 },
      filter: {
        offline_order_by: ORDERBYOFFLINE.ORDER,
        online: ONLINESTATUS.OFFLINE,
        secure_status: SECURESTATUS.ALL, //健康状态
        asset_status: ASSETSTATUS.ALL, // 资产状态
        // 屏蔽windows
        osver: OSTYPE.LINUX, //系统
        groups: '', //高级筛选的分组
        tags: '', //标签
        update_time: '', //高级筛选的日期
        searchdata: '', // 搜索
        group_id: -1, // 分组（-1：全部）
        os: '', // 系统信息（系统版本）
      },
      orderby: undefined,
    });
    dataSource.value = items;
    loading.value = false;
  };
  getTableData();
  // 跳转
  const jumpPage = () => {
    router.push({
      name: 'hostAsset-layout-assetInfo-host',
      query: { offline_order_by: ORDERBYOFFLINE.ORDER, online: ONLINESTATUS.OFFLINE },
    });
  };
  if (props.refreshMethods) {
    props.refreshMethods!.offflieTableApi = getTableData;
  }
</script>
<style lang="less" scoped>
  .header {
    background: #ffffff;
    // background: #f8f8f8;
    padding: 12px 16px 0 16px;
    border-radius: 8px 8px 0px 0px;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 16px;
    }
    .moreButton {
      cursor: pointer;
      font-size: @fz14;
      color: @primary-color;
    }
  }
</style>
