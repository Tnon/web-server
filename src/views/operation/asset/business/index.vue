<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-10-12 12:08:56
-->
<template>
  <div class="userContainer">
    <div class="header">
      <!-- title start -->
      <span class="title">{{ t('operation.assetBusGroup') }}</span>
      <!-- title end -->
      <div class="tools">
        <!-- 搜索 start -->
        <!-- <a-input-search
          class="search"
          v-model:value.trim="agms.business_group_name"
          :placeholder="t('operation.buplace')"
          @search="onSearch"
          @change="onSearch"
        /> -->
        <!-- 搜索 end -->
        <!-- 切换视图 start -->
        <a-button
          type="text"
          class="switchview"
          v-permission="{
            name: 'businessGroupSwitch',
            showUsers: [USERTOKEN.admin, USERTOKEN.super],
          }"
          @click="switchView"
        >
          <template #icon><WalletOutlined /></template>
          {{ t('asset.swtView') }}
        </a-button>
        <!-- 切换视图 end -->
        <!-- 新建主机组 start -->
        <a-button
          type="primary"
          v-permission="{
            name: 'addBusiness',
            showUsers: [USERTOKEN.admin, USERTOKEN.super],
          }"
          @click="NewBusGroup"
        >
          <template #icon>
            <PlusOutlined />
          </template>
          {{ t('operation.addbgn') }}
        </a-button>
        <!-- 新建主机组 end -->
      </div>
    </div>
    <transition name="zoom-fade" mode="out-in" appear v-if="isTableView">
      <slots-table
        :scroll="{ y: 'calc(100vh - 178px)' }"
        childrenColumnName="items"
        ref="tableRef"
        :columns="columns"
        row-key="id"
        :arguments="agms"
        :get-list-func="getBusinessGroups"
        :allowCheckAll="false"
      />
    </transition>
    <transition name="zoom-fade" mode="out-in" appear v-else>
      <a-spin :spinning="flowLoading">
        <div class="treeContainers">
          <antTree ref="treeRef" v-model:flowLoading="flowLoading" />
        </div>
      </a-spin>
    </transition>
  </div>
</template>

<script lang="ts" setup>
  import { unref, ref, reactive, computed } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getBusinessGroups, addBusinessGroup } from '@/api/operation/asset';
  import { useColumns } from './index';
  import { useModal } from '@/hooks';
  import { PlusOutlined, WalletOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';
  import addModal from './cmts/addModal';
  import antTree from './views/antTree';
  import { GROUPENUM } from '@/enums/moveGroup';
  import { useUserToken } from '@/store/modules/user';
  import { USERTOKEN } from '@/store/modules/user/type';

  const { t } = useI18n();

  //table dom
  const tableRef: any = ref<HTMLElement>();
  //tree dom
  const treeRef = ref();
  // 业务组跳转携带参数
  const {
    query: { business_group_name },
  } = useRoute() as any;
  //搜索数据源
  const agms = reactive({
    business_group_name: business_group_name ?? '',
    id: GROUPENUM.ALL,
  });
  const userTokenStore = useUserToken();
  const userType = computed(() => userTokenStore.userInfo.u_type!);
  //是否是表格视图
  const isTableView = ref(
    unref(userType) === USERTOKEN.admin || unref(userType) === USERTOKEN.super ? true : false,
  );
  //树状图loading
  const flowLoading = ref(false);

  //添加业务组
  const NewBusGroup = () => {
    useModal(
      {
        title: t('operation.addbgn'),
        contentProps: {
          fields: reactive({}),
        },
        handleOk: async (conRef) => {
          await unref(conRef).validate();
          const { code } = await addBusinessGroup({
            group_name: unref(conRef).fields.group_name,
            parent_id: unref(conRef).fields.parent_id
              ? unref(conRef).fields.parent_id
              : GROUPENUM.ALL,
            desc_info: unref(conRef).fields.desc_info,
          });
          //刷新表格;
          !code && refreshTable();
        },
      },
      addModal,
    );
  };
  //
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    if (isTableView.value) {
      unref(tableRef).refreshTableData(keepPage);
    } else {
      unref(treeRef).refreshTree();
    }
  };
  const columns = useColumns(t, refreshTable);
  //视图切换
  const switchView = () => {
    isTableView.value = !isTableView.value;
  };
  // // 搜索框变化刷新表格
  // const onSearch = (v, e) => {
  //   const { value } = v.target ?? { value: v };
  //   if (e && value) {
  //     refreshTable();
  //   }
  //   if (!value && !e) {
  //     refreshTable();
  //   }
  // };
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
        margin-right: 16px;
      }
      .tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .switchview {
          margin-right: 8px;
        }
      }
    }
  }
  .treeContainers {
    height: calc(100vh - 64px);
  }
</style>
