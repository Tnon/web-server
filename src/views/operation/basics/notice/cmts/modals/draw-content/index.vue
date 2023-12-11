<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-17 21:52:32
 * @LastEditTime: 2023-08-03 14:05:11
-->
<template>
  <div class="drawCon">
    <div class="header">
      <div class="text">{{ t('operation.jsrgl') }}</div>
      <a-button type="primary" @click="addUser">
        <template #icon>
          <PlusOutlined />
        </template>
        {{ t('operation.xaskg') }}
      </a-button>
    </div>
    <slots-table
      :scroll="{ y: 'calc(100vh - 48px)' }"
      ref="tableRef"
      :page-option="{ size: 'small', showSizeChanger: false }"
      :columns="columns"
      row-key="id"
      :arguments="{}"
      :get-list-func="getAcceptList"
    />
  </div>
</template>

<script setup lang="ts">
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import { SlotsTable } from '@/components/slots-table';
  import { useColumns } from '.';
  import { useModal } from '@/hooks/use-modal';
  import { createVNode, ref, unref } from 'vue';
  import accepForm from './cmts/accepForm';
  import { addAcceptUser, getAcceptList } from '@/api/operation/notice';
  const props = defineProps<{
    refreshNoticeType: Function;
  }>();
  const { t } = useI18n();
  //table
  const tableRef: any = ref<HTMLElement>();
  const columns = useColumns(t, props.refreshNoticeType);
  const addUser = () => {
    useModal(
      {
        title: t('operation.adduser'),
        handleOk: async (conRef) => {
          await conRef.validate();
          const { code } = await addAcceptUser(Object.assign({}, conRef.modelRef));
          if (code) {
            return Promise.reject();
          }
          unref(tableRef).refreshTableData();
        },
      },
      createVNode(accepForm),
    );
  };
</script>

<style scoped lang="less">
  .drawCon {
    display: flex;
    flex-direction: column;
    height: 100vh;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      .text {
        font-size: @fz16;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
</style>
