<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-28 19:01:59
 * @LastEditTime: 2023-04-27 12:01:30
-->
<template>
  <div>
    <template v-for="(dataSourceItem, key) in dataSource" :key="key">
      <div class="fileTitle">
        <div class="label">{{ t('arcomn.file_pathDraw') }}：</div>
        <div class="val">{{ key }}</div>
      </div>
      <!-- 引擎表格 start -->
      <a-table
        class="tabcont"
        bordered
        rowKey="engine_name"
        :pagination="false"
        :columns="columns[key]"
        :dataSource="dataSourceItem.detect_res_list"
      />
      <!-- 引擎表格 end -->
      <!-- 命中详情 start -->
      <div class="detail" v-if="dataSourceItem.match_rule_list && dataSourceItem.file_detail">
        <div class="title">{{ t('arcomn.mingrul') }}</div>
        <a-table
          bordered
          :pagination="false"
          :columns="ruleColumns"
          rowKey="rule"
          :dataSource="dataSourceItem.match_rule_list"
        >
          <template #expandedRowRender="{ record }">
            <file-hit :fileContent="dataSourceItem.file_detail" :strings="record.strings" />
          </template>
        </a-table>
      </div>
      <!-- 命中详情 end -->
    </template>
  </div>
</template>

<script setup lang="ts">
  import { reactive, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useColumns, fileDetailColumn } from '.';
  import fileHit from '../webshell_attack_info/file-hit';
  const props = defineProps({
    dataSource: {
      type: Object,
      required: true,
    },
  });
  const { t } = useI18n();
  const columns = reactive({});
  const ruleColumns = fileDetailColumn(t);
  watchEffect(() => {
    for (let k in props.dataSource) {
      if (props.dataSource[k].detect_res_list && props.dataSource[k].detect_res_list.length) {
        let flag = false;
        props.dataSource[k].detect_res_list.forEach((ele) => {
          if (ele.detect_res === 1) {
            flag = true;
          }
        });
        columns[k] = useColumns(t, flag);
      }
    }
  });
</script>

<style scoped lang="less">
  .title {
    font-size: @fz14;
    margin: 16px 0;
    color: rgba(0, 0, 0, 0.9);
    font-weight: 600;
  }
  .fileTitle {
    padding: 16px 0;
    display: flex;
    .label {
      color: rgba(0, 0, 0, 0.9);
      font-weight: 600;
      word-break: keep-all;
    }
    .val {
      word-break: break-word;
    }
  }
</style>
