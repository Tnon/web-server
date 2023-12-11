<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-11-26 17:46:55
 * @LastEditTime: 2023-10-13 10:24:04
-->
<template>
  <div>
    <template v-for="item in ipGroup" :key="item">
      <a-tag class="cusTag" @click="showModal">{{ item }}</a-tag>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useColumns } from '../columns';
  import { useModal } from '@/hooks/use-modal';
  import { SlotsTable } from '@/components/slots-table';
  import { useI18n } from 'vue-i18n';
  import { getMigrateDetail } from '@/api/operation/migrate';
  const props = defineProps({
    ipGroup: Array,
    group_id: Number,
    reload: Function,
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
        contentProps: {
          class: 'tabled',
          columns: useColumns(t, props.reload!),
          getListFunc: getMigrateDetail,
          rowKey: 'host_id',
          scroll: { y: 400 },
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
  .cusTag {
    color: #fff;
    background: #18ba79;
    cursor: pointer;
    border: none;
    padding: 3px 5px;
    margin: 5px 5px 5px 0px;
    transition: all 0.3s;
    font-size: @fz12;
    &:hover {
      padding: 3px 10px;
    }
  }
</style>
