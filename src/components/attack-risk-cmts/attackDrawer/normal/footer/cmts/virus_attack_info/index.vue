<template>
  <div>
    <!-- 引擎表格 start -->
    <a-table
      class="tabcont"
      bordered
      :pagination="false"
      :columns="engineColumns"
      :dataSource="dataSource.detect_res_list"
    />
    <!-- 引擎表格 end -->
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useColumns } from '.';
  defineProps({
    dataSource: {
      type: Object,
      required: true,
    },
  });
  const { t } = useI18n();
  const { engineColumns } = useColumns(t);
</script>

<style scoped lang="less">
  .tabcont {
    margin: 16px 0;
  }
  .title {
    font-size: @fz14;
    margin-bottom: 16px;
    color: rgba(0, 0, 0, 0.9);
    font-weight: 600;
  }
</style>
