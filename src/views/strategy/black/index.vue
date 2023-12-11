<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-17 18:55:14
 * @LastEditTime: 2023-10-26 15:33:32
-->
<template>
  <div class="container">
    <div class="header">
      <div class="rightOption">
        <!-- 搜索框 start -->
        <a-input-search
          class="search"
          v-model:value.trim="agms.search_data"
          :placeholder="t('strategy.sesatrr')"
          @search="onSearch"
          @change="onSearch"
        />
        <!-- 搜索框 end -->
        <!-- 高级筛选 start -->
        <advanSearch :params="agms" @confirm="refreshTable" />
        <!-- 高级筛选 end -->
        <!-- 新增 start -->
        <a-button type="primary" @click="addWhite">
          <template #icon>
            <PlusOutlined />
          </template>
          {{ t('strategy.add') }}
        </a-button>
        <!-- 新增 end -->
      </div>
    </div>
    <!-- 数据表 start -->
    <slots-table
      class="dataTable"
      :scroll="{ y: 'calc(100vh - 167px)' }"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :get-list-func="getTableList"
      :arguments="agms"
    />
    <!-- 数据表 end -->
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, unref, watch } from 'vue';
  import advanSearch from '@/views/strategy/common/cmts/advanSearch';
  import { useColumns } from '.';
  import { useI18n } from 'vue-i18n';
  import { addBPolicy, getTableList } from '@/api/strategy/white';
  import { SlotsTable } from '@/components/slots-table';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { useModal } from '@/hooks';
  import handleBlack from '@/components/handle-dymic-form/handleBlack';
  import { E_WB_Enum, I_BW_Filter } from '@/views/strategy/common/types';
  import { message } from 'ant-design-vue';
  const agms = reactive<Partial<I_BW_Filter>>({
    //搜索框
    search_data: '',
    //攻击类型 多选
    attack_type: undefined,
    //应用分组 多选
    apply_group: undefined,
    //属性
    attribute: undefined,
    //创建人
    create_user: undefined,
    //最新内容变更芯
    update_content_user: undefined,
    //最新应用分组变更人
    update_group_user: undefined,
    policy_type: E_WB_Enum.Black,
  });
  const { t } = useI18n();
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
  };
  const columns = useColumns(t);
  //table dom
  const tableRef: any = ref<HTMLElement>();

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
  //新增策略
  const addWhite = () => {
    //加入白名单
    useModal(
      {
        title: t('strategy.add'),
        width: 800,
        contentProps: {
          title: t('strategy.add'),
          record: {},
        },
        handleOk: async (contRef) => {
          await contRef.validate();
          const { code } = await addBPolicy(
            Object.assign({}, contRef.formState, { rule_source: 1 }),
          );
          if (!code) {
            message.success(t('message.appaddSuc'));
          }
          refreshTable();
        },
        wrapClassName: 'noheadModal',
      },
      handleBlack,
    );
  };
  //攻击类型和主机分组改变 刷新表格
  watch([() => agms.risk_path, () => agms.host_group], () => {
    refreshTable();
  });
</script>

<style scoped lang="less">
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
      flex: 48px 0 0;
      display: flex;
      align-items: center;
      padding: 0 16px;
      justify-content: space-between;
      justify-content: flex-end;

      .rightOption {
        display: flex;
        align-items: center;

        .line {
          width: 1px;
          height: 16px;
          background: rgba(0, 0, 0, 0.12);
          margin: 0 16px;
        }
      }
    }
  }
</style>
