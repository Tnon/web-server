<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-11-22 15:34:46
 * @LastEditTime: 2022-11-25 13:08:45
-->
<template>
  <div class="transfer">
    <div class="header">
      <a-button type="primary" @click="startMigrate">
        {{ t('setting.startMig') }}
      </a-button>
      <span class="tip">
        {{ t('setting.migTips') }}
      </span>
    </div>
    <slots-table
      ref="tableRef"
      :scroll="{ y: 'calc(100vh - 207px)' }"
      class="dataTable"
      v-model:columns="columns"
      row-key="id"
      :get-list-func="getMigrateList"
    >
      <template #headerCellcustom="{ column }">
        <template v-if="column.dataIndex === 'uneffected'">
          {{ t('setting.noMig') }}
          <a-tooltip placement="bottom" theme="light" color="#fff">
            <template #title>
              <span style="color: #000">
                {{ t('setting.noMigTip') }}
              </span>
            </template>
            <custom-icon type="#ax-tips" />
          </a-tooltip>
        </template>
      </template>
    </slots-table>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getMigrateList, MigrateGroup } from '@/api/operation/migrate';
  import { useColumns } from './index';
  import { useModal } from '@/hooks/use-modal';
  import { useI18n } from 'vue-i18n';
  import addModel from './cmts/addModel';

  const { t } = useI18n();
  //表格
  const tableRef = ref<any>(null);
  const refreshTable = () => {
    tableRef.value.refreshTableData();
  };
  const columns = useColumns(t, refreshTable);
  // 开始迁移按钮
  const startMigrate = () => {
    useModal(
      {
        title: t('setting.startMig'),
        handleOk: async (conRef) => {
          await conRef.validate();
          await MigrateGroup(conRef.fields as any);
          tableRef.value.refreshTableData(true);
        },
      },
      addModel,
    );
  };
</script>

<style lang="less" scoped>
  .transfer {
    background: #ffffff;
    border-radius: 8px;
    margin-left: 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
      padding: 16px 0px;
      .tip {
        color: #f8a04c;
        font-size: @fz12;
        margin-left: 16px;
      }
    }
  }
</style>
