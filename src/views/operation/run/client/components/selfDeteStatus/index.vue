<template>
  <a-table :columns="columns" :data-source="dataSource" :pagination="false" rowKey="name" />
</template>

<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { useColumns } from './index';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    agentStatus: Object,
  });
  const { t } = useI18n();
  const columns = useColumns(t);
  //pop table数据
  const dataSource = ref<any>([]);
  //object==>array
  for (let name in props.agentStatus!) {
    unref(dataSource).push({ name, status: props.agentStatus![name] });
  }
</script>

<style lang="less" scoped>
  .succss {
    color: #19be68;
  }
  .fail {
    color: #ff0000;
  }
</style>
