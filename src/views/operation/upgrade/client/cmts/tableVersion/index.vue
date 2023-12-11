<template>
  <div class="versionM">
    <!-- 未适配提示 start -->
    <div class="tips" v-if="showTips && filter.osver === OSTYPE.LINUX">
      <span>
        <warning-filled />
        {{ t('operation.unadptips', [unadpnum]) }}
      </span>
      <div class="rightTool">
        <span class="linktext" @click="viewUnadapList">{{ t('operation.viewUnadList') }}</span>
        <!--  -->
        <export-data api="/api/report/noadaptedlist" :params="{}">
          <span class="linktext">{{ t('operation.downUnadList') }}</span>
        </export-data>
        <close-outlined class="icon" @click="showTips = false" />
      </div>
    </div>
    <!-- 未适配提示 end -->
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
          :osver="agms.osver"
        />
        <!-- 批量标记 end-->
        <!-- 筛选 start -->
        <filter-pop :agms="agms" :refreshTable="refreshTable" />
        <!-- 筛选 end -->
        <!-- 更多操作 start -->
        <!-- <custom-icon class="RIcon" @click="refreshTable(true)" type="#ax-update" /> -->
        <more-pop
          :refreshTable="refreshTable"
          :refreshVersion="refreshVersion"
          :agms="agms"
          ref="morePopVNode"
        />
        <!-- 更多操作 end -->
      </div>
    </div>
    <!-- 表格 start -->
    <slots-table
      ref="tableRef"
      v-model:columns="columns"
      :scroll="{ y: showTips ? 'calc(100vh - 542px)' : 'calc(100vh - 486px)' }"
      row-key="host_id"
      :arguments="agms"
      :get-list-func="getTableList"
      class="agentTable"
      :isCheck="isCheck"
      :get-can-select-func="canSelectApi"
      :disabledKeys="disabledKeys"
    />
    <!-- 表格 end -->
  </div>
</template>

<script lang="ts" setup>
  import { watch, reactive, ref, PropType, watchEffect, unref } from 'vue';
  import { useColumns } from './type';
  import { SlotsTable } from '@/components/slots-table';
  import { getTableList, getUnadapListApi } from '@/api/operation/upgrade';
  import { ClientFilter } from '@/api/operation/model';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { useI18n } from 'vue-i18n';
  import batchPop from './cmts/batchPop';
  import filterPop from './cmts/filterPop';
  import morePop from './cmts/morePop';
  import batchBar from './cmts/batchBar';
  import { CloseOutlined, WarningFilled } from '@ant-design/icons-vue';
  import exportData from '@/components/exportData';
  import { OSTYPE } from '@/enums/assetsType';
  const props = defineProps({
    filter: {
      type: Object as PropType<Partial<ClientFilter>>,
      required: true,
    },
    refreshVersion: Function,
  });

  const emit = defineEmits(['update:filter']);
  const { t } = useI18n();

  //全选
  const isCheck = ref<boolean>(false);
  //表格
  const tableRef: any = ref<HTMLElement>();
  //表格结构体
  const agms = reactive<ClientFilter>({
    searchdata: '',
    os_info: '',
    groups: '',
    online: undefined,
  });
  //将外部的条件和内部合并
  watchEffect(() => {
    Object.assign(agms, props.filter);
  });
  //刷新表格
  const refreshTable = (keep_page?: boolean) => {
    tableRef.value.refreshTableData(keep_page);
    initRowSelection();
  };
  //表格列
  const columns = ref<any[]>([]);
  watchEffect(() => {
    columns.value = useColumns(t, refreshTable, props.filter.osver);
  });

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
  watch(
    [
      () => agms.groups,
      () => agms.driver_upgraded_status,
      () => agms.agent_upgraded_status,
      () => agms.agent_version,
      () => agms.osver,
      () => agms.online,
      () => agms.driver_version,
    ],
    () => {
      //agent状态和驱动状态要抛出
      emit(
        'update:filter',
        Object.assign(props.filter, {
          driver_upgraded_status: agms.driver_upgraded_status,
          agent_upgraded_status: agms.agent_upgraded_status,
          agent_version: agms.agent_version,
          driver_version: agms.driver_version,
        }),
      );
      //刷新表格
      refreshTable();
    },
  );
  //不能选择的
  const disabledKeys = ref<any>([]);
  //全选数量API
  const canSelectApi = ref<Fn>();
  //批量卸载还是升级
  const selectedType = ref<string>('');

  //清空选择
  watch(isCheck, (v) => {
    if (!v) {
      selectedType.value = '';
    }
  });
  //更多元素dom
  const morePopVNode = ref<any>();
  // 搜索框变化刷新表格
  //未适配主机数量
  const unadpnum = ref<number>(0);
  //提示显示
  const showTips = ref(false);
  //获取未适配数量
  const getUnadapList = async () => {
    const { count } = await getUnadapListApi();
    unadpnum.value = count;
    showTips.value = !!unadpnum.value;
  };
  getUnadapList();
  //查看未适配系统
  const viewUnadapList = () => {
    unref(morePopVNode).viewUnadpList();
  };
  //抛出刷新的
  defineExpose({ refreshTable });
</script>

<style lang="less" scoped>
  .versionM {
    flex: 1;
    background: #ffffff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    .tips {
      display: flex;
      background: rgba(247, 85, 85, 0.1);
      margin-top: 24px;
      font-size: @fz14;
      font-weight: 400;
      color: #f75555;
      line-height: 24px;
      padding: 4px 16px;
      align-items: center;
      justify-content: space-between;
      .icon {
        cursor: pointer;
        margin-left: 16px;
      }
      .rightTool {
        display: flex;
        align-items: center;
      }
      .linktext {
        cursor: pointer;
        text-decoration: underline;
        margin-left: 16px;
      }
    }
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
      }
    }
  }
</style>
