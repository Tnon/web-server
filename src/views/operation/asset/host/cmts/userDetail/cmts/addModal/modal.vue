<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2022-11-22 08:55:24
-->
<template>
  <div class="userContainer">
    <div class="header">
      <!-- title start -->
      <div>
        <span class="title">{{ modalTitle }}</span>
        <span v-if="tableRef">{{ t('operation.addadtot', [tableRef.selectAllNumber]) }}</span>
      </div>
      <!-- title end -->
      <div class="tools">
        <!-- 新增管理员 start -->
        <a-button type="primary" :disabled="!tableRef?.selectAllNumber" @click="saveApply">
          <template #icon>
            <PlusOutlined />
          </template>
          {{ t('operation.saapp') }}
        </a-button>
        <!-- 新增管理员 end -->
      </div>
    </div>
    <slots-table
      :scroll="{ y: '500px' }"
      :isCheck="isCheck"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :get-list-func="getGroupUserList"
      :allowCheckAll="false"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, unref } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getGroupUserList, addUsersToHostGroup } from '@/api/operation/user';
  import { useColumns } from './index';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    modalTitle: {
      type: String,
      required: true,
    },
    group_id: {
      type: Number,
      required: true,
    },
    refreshTable: {
      type: Function,
      required: true,
    },
  });
  const { t } = useI18n();
  const columns = useColumns(t);
  //table dom
  const tableRef: any = ref<HTMLElement>();
  //全选
  const isCheck = ref<boolean>(true);
  //搜索数据源
  const agms = reactive({
    group_id: props.group_id,
  });
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
  };
  //保存并应用
  const saveApply = async () => {
    const { code } = await addUsersToHostGroup({
      admin_id: unref(tableRef).rowSelection.selectedRowKeys,
      group_id: props.group_id,
    });
    if (!code) {
      props.refreshTable();
      refreshTable();
      initRowSelection();
    }
  };
  defineExpose({ tableRef });
</script>
<style lang="less" scoped>
  .userContainer {
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
      padding: 0 16px;
      display: flex;
      flex: 0 0 48px;
      align-items: center;
      justify-content: space-between;
      padding-right: 48px;
      .title {
        font-weight: 700;
        font-size: @fz14;
        margin-right: 16px;
      }
      .tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>
