<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2022-12-06 15:31:42
-->
<template>
  <div>
    <div class="header">
      <span class="title">{{ t('overview.lastAlarm') }}</span>
    </div>
    <a-table
      class="singleTable"
      rowKey="id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false"
    />
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref, watchEffect } from 'vue';
  // import switchNodes from '@/components/switchNodes';
  import { useColumns } from './columns';
  import { getTableList } from '@/api/attack_risk';
  import { useI18n } from 'vue-i18n';
  import { HANDLETYPE, MODELTYPE } from '@/enums/attack_risk';
  const props = defineProps({
    refreshMethods: Object,
  });
  const { t } = useI18n();
  const columns = useColumns(t);
  //数据源
  const dataSource = ref([]);
  //默认参数
  const type = ref<string>(MODELTYPE.ATTACKPATH);
  const getData = async () => {
    const { items } = await getTableList({
      page: { page_index: 1, page_size: 5 },
      filter: {
        handle: HANDLETYPE.UNHANDLE,
        risk_path: unref(type),
      },
    } as any);
    dataSource.value = items;
  };
  //请求数据
  watchEffect(() => {
    getData();
  });
  props.refreshMethods!.lasteventApi = getData;
</script>
<style lang="less" scoped>
  .header {
    height: 48px;
    // background: #f8f8f8;
    // border-radius: 8px 8px 0px 0px;
    padding: 0 16px 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
    }
  }
  .showInfo {
    img {
      width: 24px;
      height: 24px;
    }
  }
</style>
