<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-09 13:49:57
 * @LastEditTime: 2023-10-13 09:43:35
-->
<template>
  <div class="osTable">
    <!-- 标题 start -->
    <div class="header">
      <span class="title">{{ t('asset.osHostDistribution') }}</span>
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
      :scroll="{ y: '500px' }"
    >
      <template #bodyCell="{ record, column }">
        <template v-if="column.dataIndex === 'count'">
          <span class="primaryColor" @click="jumpDetial(record)">
            {{ record.count }}
          </span>
        </template>
      </template>
    </a-table>
    <!-- table end -->
  </div>
</template>
<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { useColumns } from './index';
  import { getOsList } from '@/api/asset/hostInfo/host';
  import { ref } from 'vue';

  const props = defineProps({
    refreshMethods: {
      type: Object,
      required: false,
    },
  });
  const { t } = useI18n();
  const router = useRouter();
  const columns = useColumns(t);
  const dataSource = ref([]);
  const loading = ref<boolean>(true);
  // 获取表格数据
  const getTableData = async () => {
    const { items } = await getOsList({
      page: { page_index: 1, page_size: 5 },
      filter: { os: '' },
      orderby: undefined,
    });
    dataSource.value = items;
    loading.value = false;
  };
  getTableData();
  // 更多，跳转页面
  const jumpPage = () => {
    router.push({
      name: 'hostAsset-layout-assetInfo-host-system',
    });
  };
  // 点击数字，跳转详情页
  const jumpDetial = (record) => {
    router.push({
      name: 'hostAsset-layout-assetInfo-host-systemDetail',
      query: { title: record.os },
    });
  };
  if (props.refreshMethods) {
    props.refreshMethods!.osDistriTableApi = getTableData;
  }
</script>
<style lang="less" scoped>
  // .osTable {
  // }
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
  .primaryColor {
    color: @primary-color;
    cursor: pointer;
  }
</style>
