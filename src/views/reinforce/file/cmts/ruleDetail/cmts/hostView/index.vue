<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-21 21:59:56
 * @LastEditTime: 2023-03-07 19:54:21
-->
<template>
  <slots-table
    class="dataTable"
    :scroll="{ y: '300px' }"
    ref="tableRef"
    :columns="columns"
    row-key="id"
    :arguments="state"
    :get-list-func="getTableList"
  />
</template>

<script setup lang="ts">
  import hostIp from '@/components/host-ip';
  import { useI18n } from 'vue-i18n';
  import { getTableList } from '@/api/reinforce';
  import { createVNode, PropType, reactive, watchEffect } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { I_Form_Data } from '@/views/reinforce/file/views/ruleForm/cmts/form/type';
  const props = defineProps({
    formData: {
      type: Object as PropType<I_Form_Data>,
      required: true,
    },
  });
  const { t } = useI18n();
  const columns = [
    {
      title: t('asset.host'),
      dataIndex: 'ip',
      width: 200,
      customRender: ({ record }) =>
        createVNode(hostIp, {
          ip: record.ip,
          host_id: record.host_id,
          os: record.os || record.osver,
          online: record.online,
          hostname: record.hostname,
        }),
    },
  ];

  const state = reactive<Partial<I_Form_Data>>({
    apply_type: undefined, // 应用维度: 1: 全部主机; 2: 分组; 3: 主机
    host_group: '', // 分组ID列表
    host_list: [], // 主机mac列表
  });
  watchEffect(() => {
    state.apply_type = props.formData.apply_type;
    state.host_group = props.formData.host_group;
    state.host_list = props.formData.host_list;
  });
</script>

<style scoped></style>
