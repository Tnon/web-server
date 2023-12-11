<template>
  <div class="versionM">
    <div class="header">
      <!-- 搜索 start -->
      <a-input-search
        v-model:value.trim="agms.searchdata"
        :placeholder="t('common.hostNameIp')"
        class="search"
        @search="searchData"
        @change="searchData"
      />
      <!-- 搜索 end -->
      <!-- 批量升级 start -->
      <batch-bar
        v-if="isCheck"
        :selectedType="selectedType"
        v-model:isCheck="isCheck"
        :tableRef="tableRef"
        :agms="agms"
        :refreshTable="refreshTable"
      />

      <!-- 批量升级 end -->
      <div class="rOption">
        <!-- 批量标记 start-->
        <batch-pop
          :refreshTable="refreshTable"
          v-model:selectedType="selectedType"
          v-model:isCheck="isCheck"
          v-model:disabledKeys="disabledKeys"
          v-model:canSelectApi="canSelectApi"
        />
        <!-- 批量标记 end-->

        <!-- 筛选 start -->
        <filter-pop :agms="agms" :refreshTable="refreshTable" />
        <!-- 筛选 end -->
        <!-- 主机ip显示管理 start -->
        <a-button type="text" @click="hostIpShowManage">
          <template #icon>
            <SettingOutlined />
          </template>
          {{ t('operation.zjklfs') }}
        </a-button>
        <!-- 主机ip显示管理 end -->
        <!-- 导出 start -->
        <export-data
          api="/api/report/activation/host_agent_list"
          class="exportbtn"
          :params="agms"
        />
        <!-- 导出 end -->
        <!-- 更多操作 start -->
        <more-pop />
        <!-- 更多操作 end -->
      </div>
    </div>
    <!-- 表格 start -->
    <slots-table
      ref="tableRef"
      v-model:columns="columns"
      row-key="host_id"
      :arguments="agms"
      :get-list-func="getAgentList"
      class="agentTable"
      :isCheck="isCheck"
      :get-can-select-func="canSelectApi"
      :disabledKeys="disabledKeys"
      :scroll="{ y: 'calc(100vh - 355px)' }"
    >
      <template #headerCellcustom="{ column }">
        <template v-if="column.dataIndex === 'showip'">
          {{ t('operation.showIp') }}
          <a-tooltip placement="bottom" theme="light" color="#fff">
            <template #title>
              <span style="color: #000">
                {{ t('operation.showIpTips') }}
              </span>
            </template>
            <custom-icon type="#ax-tips" />
          </a-tooltip>
        </template>
      </template>
    </slots-table>
    <!-- 表格 end -->
  </div>
</template>

<script lang="ts" setup>
  import { watch, reactive, ref, createVNode, unref } from 'vue';
  import { SettingOutlined } from '@ant-design/icons-vue';
  import { useColumns } from './type';
  import { SlotsTable } from '@/components/slots-table';
  import { getAgentList, getUninstallNum } from '@/api/operation/run';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { useI18n } from 'vue-i18n';
  import batchPop from './cmts/batchPop';
  import filterPop from './cmts/filterPop';
  import morePop from './cmts/morePop';
  import batchBar from './cmts/batchBar';
  import exportData from '@/components/exportData';
  import { RunAgentFilter } from '@/api/operation/model';
  import { ONLINESTATUS, OSTYPE } from '@/enums/assetsType';
  import useCreatDraw from '@/hooks/use-click-row';
  import drawTitle from './cmts/drawTitle';
  import showIpDraw from './cmts/showIpDraw';

  const { t } = useI18n();

  //全选
  const isCheck = ref<boolean>(false);
  //表格
  const tableRef: any = ref<HTMLElement>();
  //表格结构体
  const agms = reactive<RunAgentFilter>({
    searchdata: '',
    online: undefined,
    self_verify: undefined,
    groups: '',
    //屏蔽windows
    osver: OSTYPE.LINUX,
    os: '',
  });
  //刷新表格
  const refreshTable = (keep_page?: boolean) => {
    tableRef.value.refreshTableData(keep_page);
    initRowSelection();
  };
  //表格列
  const columns = useColumns(t, refreshTable);

  const searchData = (v, e) => {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      refreshTable();
    }
    if (!value && !e) {
      refreshTable();
    }
  };
  // 监听变化刷新表格
  watch([() => agms.groups, () => agms.self_verify, () => agms.osver, () => agms.online], () => {
    //刷新表格
    refreshTable();
  });
  //不能选择的
  const disabledKeys = ref<any>([]);
  //全选数量API
  const canSelectApi = ref<Fn>();
  //批量卸载还是升级
  const selectedType = ref<string>('');
  //主动选择
  const selectHostRecords = (id, childId?) => {
    isCheck.value = true;
    selectedType.value = 'selectHost';
    canSelectApi.value = getUninstallNum;
    disabledKeys.value = [{ key: 'online', value: ONLINESTATUS.OFFLINE }];

    console.log(id, childId);
    unref(tableRef).initSelectRow(['3a0c7ffcdae4497ebd72d29b08fe756c']);
  };
  //主机IP显示管理
  const hostIpShowManage = () => {
    useCreatDraw(
      {
        // 英文模式下不显示漏洞名称
        title: createVNode(drawTitle),
        instanceKey: 'ShowTipTitle',
        width: 320,
        contentProps: { drawClass: 'showIpDraw', selectHostRecords },
      },
      showIpDraw,
    );
  };

  //清空选择
  watch(isCheck, (v) => {
    if (!v) {
      selectedType.value = '';
    }
  });
</script>

<style lang="less" scoped>
  .versionM {
    flex: 1;
    background: #ffffff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 165px);

    .header {
      flex: 0 0 56px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;

      .search {
        width: 220px;
        margin-right: 16px;
      }

      .rOption {
        display: flex;
        align-items: center;

        .exportbtn {
          margin: 0 16px;
        }
      }
    }
  }
</style>
