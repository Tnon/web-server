<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-09-21 14:40:46
-->
<template>
  <div class="userContainer">
    <div class="header">
      <!-- 标题 start -->
      <span class="title">{{ t('operation.clsk') }}</span>
      <!-- 标题 end -->
      <div class="tools">
        <!-- 搜索 start -->
        <a-input-search
          class="search"
          v-model:value.trim="agms.name"
          :placeholder="t('operation.scrilx')"
          @search="onSearch"
          @change="onSearch"
        />
        <!-- 搜索 end -->

        <!-- 新建主机组 start -->
        <a-button class="add" type="primary" @click="addLogType">
          <template #icon>
            <PlusOutlined />
          </template>
          {{ t('operation.xzrilx') }}
        </a-button>
        <!-- 新建主机组 end -->
      </div>
    </div>
    <slots-table
      :scroll="{ y: noConfig ? 'calc(100vh - 344px)' : 'calc(100vh - 284px)' }"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :get-list-func="getSysPlist"
      :allowCheckAll="false"
    />
  </div>
</template>

<script lang="ts" setup>
  import { unref, ref, reactive } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getSysPlist, addLogTypeApi } from '@/api/operation/syslog';
  import { useColumns } from './index';
  import { useModal } from '@/hooks';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import addModal from './cmts/addModal';
  import { useI18n } from 'vue-i18n';
  defineProps<{
    noConfig: boolean;
  }>();
  const { t } = useI18n();

  //table dom
  const tableRef = ref<any>();

  //搜索数据源
  const agms = reactive({
    name: '',
  });
  //添加主机组
  const addLogType = () => {
    useModal(
      {
        title: t('operation.xzrilx'),
        contentProps: {
          fields: reactive({}),
        },
        handleOk: async (conRef) => {
          await unref(conRef.formRef).validate();
          const { code } = await addLogTypeApi({
            ...unref(conRef).fields,
          });
          //刷新表格
          !code && refreshTable();
        },
      },
      addModal,
    );
  };
  //
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
  };
  //表格列
  const columns = useColumns(t);

  // 搜索框变化刷新表格
  const onSearch = (v, e) => {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      refreshTable();
    }
    if (!value && !e) {
      refreshTable();
    }
  };
</script>
<style lang="less" scoped>
  .userContainer {
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      flex: 0 0 48px;
      align-items: center;
      justify-content: space-between;
      .title {
        font-weight: 700;
        font-size: @fz14;
      }
      .search {
        width: 220px;
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
