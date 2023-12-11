<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-10-12 12:02:03
-->
<template>
  <div class="userContainer">
    <div class="header">
      <!-- 返回 start -->
      <div class="backtext" @click="goBack">
        <LeftOutlined class="back" />
        {{ t('reinforce.enable_vrl_patch') }}：
        <countTo :endVal="totalNum" />
      </div>
      <!-- 返回 end -->

      <a-input-search
        v-model:value.trim="agms.search_data"
        :placeholder="t('reinforce.ssffg')"
        class="searchIn"
        @search="onSearch"
        @change="onSearch"
      />
    </div>
    <slots-table
      :scroll="{ y: 'calc(100vh - 184px)' }"
      :isCheck="isCheck"
      v-model:total-num="totalNum"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :disabledKeys="disabledKeys"
      :get-list-func="getpatchList"
    />
  </div>
</template>

<script lang="ts" setup>
  import { unref, ref, reactive } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getpatchList } from '@/api/reinforce';
  import { useColumns } from './index';
  import { useI18n } from 'vue-i18n';
  import { LeftOutlined } from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router';

  const { t } = useI18n();
  const totalNum = ref(0);
  const router = useRouter();
  //table dom
  const tableRef: any = ref<HTMLElement>();
  //禁选
  const disabledKeys = ref<any>([]);
  //全选
  const isCheck = ref<boolean>(false);
  //搜索数据源
  const agms = reactive({
    search_data: '', // "2,3,5,7"
  });
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
  };
  const columns = useColumns(t, refreshTable);

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
  //返回
  const goBack = () => {
    router.push({
      name: 'reinforce-layout-virpatch-index',
    });
  };
</script>
<style lang="less" scoped>
  .userContainer {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    background: rgba(0, 0, 0, 0.04);

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      .backtext {
        display: flex;
        align-items: center;
        font-size: @fz16;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        cursor: pointer;
        .back {
          margin-right: 8px;
        }
      }
      .searchIn {
        width: 220px;
      }
      .tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .mark {
          margin: 0 16px;
        }
        .search {
          width: 220px;
          margin-right: 16px;
        }
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
    margin-right: 16px;
  }
  .swt_view {
    margin-left: 8px;
  }
  .filterContainer {
  }
</style>
