<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-10-12 12:08:26
-->
<template>
  <div class="userContainer">
    <div class="header">
      <!-- 标题 start -->
      <span class="title">{{ t('operation.assetHostGroup') }}</span>
      <!-- 标题 end -->
      <div class="tools">
        <!-- 搜索 start -->
        <a-input-search
          class="search"
          v-model:value.trim="agms.group_name"
          :placeholder="t('operation.hplac')"
          @search="onSearch"
          @change="onSearch"
        />
        <!-- 搜索 end -->
        <!-- 高级筛选 start -->
        <advan-filter v-model:business_group_id="agms.business_group_id">
          <span class="filter">
            {{ t('common.filter') }}
            <span class="flag" v-if="agms.business_group_id !== GROUPENUM.ALL"></span>
          </span>
        </advan-filter>
        <!-- 高级筛选 end -->

        <!-- 新建主机组 start -->
        <a-button
          class="add"
          type="primary"
          v-permission="{
            name: 'businessGroupSwitch',
            showUsers: [USERTOKEN.admin, USERTOKEN.super],
          }"
          @click="NewHostGroup"
        >
          <template #icon>
            <PlusOutlined />
          </template>
          {{ t('operation.addHg') }}
        </a-button>
        <!-- 新建主机组 end -->

        <div
          class="line"
          v-permission="{
            name: 'businessGroupSwitch',
            showUsers: [USERTOKEN.admin, USERTOKEN.super],
          }"
        ></div>

        <!-- 导出 start -->
        <export-data api="/api/report/hostgroup/list" :params="agms" class="exportIc" />
        <!-- 导出 end -->
      </div>
    </div>
    <slots-table
      :scroll="{ y: 'calc(100vh - 178px)' }"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :get-list-func="getHostGroupList"
      :allowCheckAll="false"
    />
  </div>
</template>

<script lang="ts" setup>
  import { USERTOKEN } from '@/store/modules/user/type';
  import { unref, ref, reactive, watch } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { addHostGroup, getHostGroupList } from '@/api/operation/asset';
  import { useColumns } from './index';
  import { useModal } from '@/hooks';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import addModal from './cmts/addModal';
  import { useI18n } from 'vue-i18n';
  import exportData from '@/components/exportData';
  import advanFilter from './cmts/advanFilter';
  import { useRoute } from 'vue-router';
  import { GROUPENUM } from '@/enums/moveGroup';
  const { t } = useI18n();

  //table dom
  const tableRef = ref<any>();
  // 业务组跳转携带参数
  const {
    query: { business_group_id },
  } = useRoute() as any;
  //搜索数据源
  const agms = reactive({
    group_name: '',
    business_group_id: business_group_id ? ~~business_group_id : GROUPENUM.ALL,
  });
  //添加主机组
  const NewHostGroup = () => {
    useModal(
      {
        title: t('operation.addHg'),
        contentProps: {
          fields: reactive({}),
        },
        handleOk: async (conRef) => {
          await unref(conRef.formRef).validate();
          const { code } = await addHostGroup({
            group_name: unref(conRef).fields.group_name,
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
  const columns = useColumns(t, refreshTable);
  //监听所有的条件 刷新表格
  watch([() => agms.business_group_id], () => {
    refreshTable();
  });
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
    padding: 0 16px;
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
      }

      .tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  .exportIc {
    cursor: pointer;
  }
  .line {
    width: 1px;
    height: 16px;
    background: #e1e1e1;
    margin: 0 16px;
  }
  .filter {
    position: relative;
    .flag {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      right: -10px;
      background: #18ba79;
    }
  }
  .add {
    margin-left: 8px;
  }
</style>
