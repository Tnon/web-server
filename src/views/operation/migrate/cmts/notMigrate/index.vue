<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-11-26 17:46:55
 * @LastEditTime: 2022-07-20 10:14:45
-->
<template>
  <div
    class="nMigrate"
    @click="showModal"
    :style="{ color: uneffected ? 'rgb(248, 160, 76)' : '' }"
  >
    {{ uneffected }}
  </div>
</template>

<script lang="ts" setup>
  import { SlotsTable } from '@/components/slots-table';
  import { useModal } from '@/hooks';
  import { useColumns } from '../columns';
  import { useI18n } from 'vue-i18n';
  import { getMigrateDetail } from '@/api/operation/migrate';
  const props = defineProps({
    uneffected: Number,
    reload: Function,
    group_id: Number,
  });
  const { t } = useI18n();
  const showModal = () => {
    props.reload!(true);
    useModal(
      {
        width: 1000,
        title: t('setting.migDetail'),
        wrapClassName: 'modalBodyNopad',
        footer: false,
        handleOk: () => {},
        contentProps: {
          class: 'tabled',
          scroll: { y: 400 },
          columns: useColumns(t, props.reload!),
          getListFunc: getMigrateDetail,
          rowKey: 'host_id',
          arguments: {
            group_id: props.group_id!,
          },
        },
      },
      SlotsTable,
    );
  };
</script>

<style lang="less" scoped>
  .nMigrate {
    cursor: pointer;
  }
</style>
