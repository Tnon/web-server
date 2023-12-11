<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-28 19:01:59
 * @LastEditTime: 2023-04-27 11:51:45
-->
<template>
  <div>
    <!-- 引擎表格 start -->
    <a-table
      class="tabcont"
      bordered
      rowKey="engine_name"
      :pagination="false"
      :columns="engineColumns"
      :dataSource="dataSource.detect_res_list"
    />
    <!-- 引擎表格 end -->
    <!-- 命中详情 start -->
    <div class="detail" v-if="dataSource.match_rule_list && dataSource.file_detail">
      <div class="title">{{ t('arcomn.mingrul') }}</div>
      <a-table
        bordered
        :pagination="false"
        :columns="ruleColumns"
        rowKey="rule"
        :dataSource="dataSource.match_rule_list"
      >
        <template #expandedRowRender="{ record }">
          <file-hit :fileContent="dataSource.file_detail" :strings="record.strings" />
        </template>
      </a-table>
    </div>
    <!-- 命中详情 end -->
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useColumns } from '.';
  import fileHit from './file-hit';
  defineProps({
    dataSource: {
      type: Object,
      required: true,
    },
  });
  const { t } = useI18n();
  const { engineColumns, ruleColumns } = useColumns(t);
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
