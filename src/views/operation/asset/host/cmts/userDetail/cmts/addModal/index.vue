<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-07-27 19:05:03
-->
<template>
  <div class="userContainer">
    <div class="header">
      <!-- title start -->
      <span class="title">{{ modalTitle }}</span>
      <!-- title end -->

      <div
        class="tools"
        v-permission="{ name: 'addUser', showUsers: [USERTOKEN.admin, USERTOKEN.super] }"
      >
        <!-- 新增管理员 start -->
        <a-button
          type="primary"
          @click="NewUser"
          v-if="group_id !== GROUPENUM.ALL && group_id !== GROUPENUM.UNGROUP"
        >
          <template #icon>
            <PlusOutlined />
          </template>
          {{ t('user.addUser') }}
        </a-button>
        <!-- 新增管理员 end -->
      </div>
    </div>
    <slots-table
      class="slotTable"
      :scroll="{ y: '500px' }"
      ref="tableRef"
      :columns="columns"
      :arguments="agms"
      row-key="id"
      :get-list-func="getHostGroupUserList"
      :allowCheckAll="false"
    />
  </div>
</template>

<script lang="ts" setup>
  import { unref, ref, reactive } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getHostGroupUserList } from '@/api/operation/asset';
  import { useColumns } from './index';
  import { useModal } from '@/hooks';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import addModalCheck from './modal.vue';
  import { GROUPENUM } from '@/enums/moveGroup';
  import { USERTOKEN } from '@/store/modules/user/type';
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
  //搜索数据源
  const agms = reactive({
    group_id: props.group_id,
  });
  //table dom
  const tableRef = ref<any>();
  //添加管理员
  const NewUser = () => {
    useModal(
      {
        title: t('operation.addUser'),
        contentProps: {
          group_id: props.group_id,
          modalTitle: t('operation.addUser'),
          refreshTable,
        },
        width: 1080,
        wrapClassName: 'noheadModal',
        footer: false,
      },
      addModalCheck,
    );
  };
  //
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
    props.refreshTable();
  };
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
      }
      .tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .slotTable {
      padding: 0 16px;
    }
  }
</style>
