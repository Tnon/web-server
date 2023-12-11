<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-04 19:06:51
 * @LastEditTime: 2022-08-01 16:46:09
-->
<template>
  <div>
    <div>
      <div class="title">{{ t('asset.cbasic') }}</div>
      <template v-for="(item, k) in state" :key="k">
        <div class="node">
          <div class="label">{{ t(`asset.${k}label`) }}</div>
          <div class="val">{{ item }}</div>
        </div>
      </template>
    </div>
    <div class="title">{{ t('asset.xnlblj') }}</div>
    <slots-table
      ref="tableRef"
      :scroll="{ y: '500px' }"
      v-model:columns="columns"
      row-key="host_id"
      :get-list-func="getDomainDetail"
      :arguments="agms"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useColumns } from '.';
  import { getDomainDetail } from '@/api/asset/hostInfo/host';
  import { SlotsTable } from '@/components/slots-table';
  const { t } = useI18n();
  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
  });
  const state = reactive({
    bind_ip: '',
    port: '',
    protocol: '',
    user: '',
    server_name: '',
    war_dir: '',
    root_dir: '',
  });
  const agms = reactive({
    host_id: props.record.host_id,
    name: props.record.domain_name,
  });
  for (let k in state) {
    state[k] = props.record[k]!;
  }
  const columns = useColumns(t);
</script>

<style scoped lang="less">
  .node {
    display: inline-flex;
    width: 100%;
    margin-bottom: 16px;
    .label {
      font-weight: 500;
      flex: 100px 0 0;
    }
    .val {
      word-break: break-word;
    }
  }
  .title {
    margin-bottom: 16px;
    font-size: @fz16;
    font-weight: 500;
  }
</style>
