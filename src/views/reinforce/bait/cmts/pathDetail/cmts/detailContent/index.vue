<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-03 18:51:22
 * @LastEditTime: 2023-08-08 09:41:42
-->
<template>
  <a-table
    rowKey="rule_id"
    :columns="columns"
    :scroll="{ y: '500px' }"
    :dataSource="exception_list"
    :pagination="false"
  />
</template>

<script setup lang="ts">
  import { E_Ex_Code } from '../../type';
  import { useI18n } from 'vue-i18n';
  import monitorState from '../monitorState/';
  import { createVNode } from 'vue';
  defineProps<{
    exception_list: {
      ex_code: E_Ex_Code;
      path: string;
    }[];
  }>();
  const { t } = useI18n();
  const columns = [
    {
      title: t('arcomn.file_pathDraw'),
      dataIndex: 'path',
    },
    {
      title: t('reinforce.jkzt'),
      dataIndex: 'ex_code',
      width: 200,
      customRender: ({ text }) =>
        createVNode(monitorState, {
          type: text,
        }),
    },
  ];
</script>

<style scoped></style>
