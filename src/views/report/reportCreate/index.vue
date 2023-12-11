<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-11 18:47:52
 * @LastEditTime: 2023-10-30 14:34:26
-->
<template>
  <div class="container">
    <div class="header">
      <!-- 任务名搜索 start -->
      <a-input-search
        class="search"
        v-model:value="agms.title"
        :placeholder="t('report.taskNamePlhder')"
        @search="searchData"
        @change="searchData"
      />
      <!-- 任务名搜索 end -->
      <!-- 批量操作pop start-->
      <batch-bar
        v-if="isCheck"
        :selectedType="selectedType"
        v-model:isCheck="isCheck"
        :tableRef="tableRef"
        :agms="agms"
        :refreshTable="refreshTable"
      />
      <!-- 批量操作pop end-->
      <div class="rOption">
        <!-- 批量操作pop start-->
        <batch-pop
          :refreshTable="refreshTable"
          v-model:selectedType="selectedType"
          v-model:isCheck="isCheck"
          v-model:disabledKeys="disabledKeys"
          v-model:canSelectApi="canSelectApi"
        />
        <!-- 批量操作pop end-->

        <!-- 筛选 start -->
        <filter-pop :agms="agms" @changeValue="selectChange" />
        <!-- 筛选 end -->

        <!-- 报表模板 start -->
        <a-button class="button" type="text" @click="reportTemplate">
          <template #icon>
            <hdd-outlined />
          </template>
          {{ t('report.reportTemplate') }}
        </a-button>
        <!-- 报表模板 end -->

        <!-- 新建报表任务 start -->
        <a-button type="primary" @click="createTask">
          <template #icon>
            <plus-outlined />
          </template>
          {{ t('report.createTask') }}
        </a-button>
        <!-- 新建报表任务 end -->
      </div>
    </div>
    <!-- 表格 start -->
    <slots-table
      ref="tableRef"
      row-key="id"
      :scroll="{ y: 'calc(100vh - 223px)' }"
      :arguments="agms"
      :columns="columns"
      :get-list-func="getTaskList"
      :isCheck="isCheck"
      :disabledKeys="disabledKeys"
      :get-can-select-func="canSelectApi"
    />
    <!-- 表格 end -->
  </div>
</template>
<script lang="ts" setup>
  import { createVNode, reactive, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { SlotsTable } from '@/components/slots-table';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { useColumns } from './index';
  import { getTaskList, createTaskRequest } from '@/api/report';
  import { TaskFilter } from '@/api/report/model';
  import { useModal } from '@/hooks';
  import templateForm from './components/templateForm';
  import batchBar from './components/batchBar';
  import filterPop from './components/filterPop';
  import batchPop from './components/batchPop';
  import createTaskForm from './components/createTask';
  import { HddOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { preendTrim } from '@/utils/tools';
  import creatTaskTitle from './components/creatTaskTitle';

  const { t } = useI18n();

  // 表格dom
  const tableRef: any = ref<HTMLElement>();
  // 表格选择
  const isCheck = ref<boolean>(false);
  // 不能选择的
  const disabledKeys = ref<any>([]);
  // 全选数量API
  const canSelectApi = ref<Fn>();
  // 批量删除/执行/停止执行
  const selectedType = ref<string>('');

  // 表格参数
  const agms = reactive<TaskFilter>({
    type: undefined, // 任务类型
    start_time: undefined, // 时间戳
    end_time: undefined, // 时间戳
    status: undefined, // 任务状态
    report_template_id: undefined, // 使用的模板
    title: '', // 任务名
  });

  // 刷新表格
  const refreshTable = (keep_page?: boolean) => {
    tableRef.value.refreshTableData(keep_page);
    initRowSelection();
  };
  // 列
  const columns = useColumns(t);

  // 筛选条件变化
  const selectChange = (localAgms) => {
    Object.assign(agms, localAgms);
  };
  // 两种情况agms改变:1、filterPop子组件筛选；2、创建模板对话框查看。
  watch(
    [
      () => agms.type,
      () => agms.start_time,
      () => agms.end_time,
      () => agms.status,
      () => agms.report_template_id,
    ],
    () => {
      refreshTable();
    },
  );
  // 任务名搜索
  const searchData = (v, e) => {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      refreshTable();
    }
    if (!value && !e) {
      refreshTable();
    }
  };

  // 报告模板查看及管理
  const reportTemplate = () => {
    useModal(
      {
        title: t('report.reportTemplate'),
        width: 1200,
        wrapClassName: 'modalBodyNopad',
        footer: false,
        contentProps: {
          filter: agms,
        },
      },
      templateForm,
    );
  };
  // 创建任务
  const createTask = () => {
    useModal(
      {
        title: createVNode(creatTaskTitle),
        instanceKey: 'taskTitle',
        width: 800,
        handleOk: async (contentRef) => {
          try {
            await contentRef.validate();
          } catch {
            return Promise.reject('');
          }
          contentRef.formState.timeRange = undefined;
          if (contentRef.formState.accept_email) {
            contentRef.formState.accept_email = preendTrim(
              contentRef.formState.accept_email.split(','),
            ).join(',');
          }
          await createTaskRequest(contentRef.formState);
          refreshTable();
        },
      },
      createTaskForm,
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
  .container {
    height: calc(100vh - 48px);
    padding: 0 16px;
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      justify-content: space-between;
      padding: 12px 0; // background不在margin中生效

      .search {
        width: 220px;
        margin-right: 16px;
      }
      .rOption {
        display: flex;
        .button {
          margin-right: 8px;
        }
      }
    }
  }
</style>
