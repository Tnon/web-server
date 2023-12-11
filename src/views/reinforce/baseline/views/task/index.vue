<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-10-12 12:01:32
-->
<template>
  <div class="userContainer">
    <div class="header">
      <!-- 返回 start -->
      <div class="backtext" @click="goBack">
        <LeftOutlined class="back" />
        {{ t('reinforce.task_count') }}
      </div>
      <!-- 返回 end -->
      <!-- 批量条 start -->
      <batch-bar
        class="batbar"
        v-if="isCheck"
        :selectedType="boxType"
        v-model:isCheck="isCheck"
        :tableRef="tableRef"
        :agms="agms"
        :refreshTable="refreshTable"
      />
      <!-- 批量条 end -->
      <div class="tools">
        <!-- 批量管理 start -->
        <batch-manage
          v-model:boxType="boxType"
          v-model:isCheck="isCheck"
          v-model:disabledKeys="disabledKeys"
          @refreshTable="refreshTable"
          v-model:canSelectApi="canSelectApi"
        >
          {{ t('common.batchOpt') }}
        </batch-manage>
        <!-- 批量管理 end -->

        <!-- 高级筛选 start -->
        <div class="filterContainer">
          <!-- 高级筛选 start -->
          <advanSearch class="filters" :params="agms" @confirm="btnConfirm" />
          <!-- 高级筛选 end -->
        </div>

        <!-- 高级筛选 end -->

        <!-- 新建规则 start -->
        <a-button type="primary" class="newAdd" @click="addNewRule">
          <template #icon>
            <plus-outlined />
          </template>
          {{ t('reinforce.xjjxrw') }}
        </a-button>
        <!-- 新建规则 end -->
        <!-- <div class="line"></div> -->
        <!-- 导出 start -->
        <!-- <export-data api="/api/report/user" :params="agms" class="exportIc" /> -->
        <!-- 导出 end -->
      </div>
    </div>
    <slots-table
      :scroll="{ y: 'calc(100vh - 183px)' }"
      :isCheck="isCheck"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :disabledKeys="disabledKeys"
      :get-list-func="getTaskList"
      :get-can-select-func="canSelectApi"
    />
  </div>
</template>

<script lang="ts" setup>
  import { unref, ref, reactive, watch, createVNode } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getTaskList, addNewTask } from '@/api/reinforce';
  import { useColumns } from './index';
  import batchManage from './cmts/batchManage';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { useI18n } from 'vue-i18n';
  import advanSearch from './cmts/advanSearch';
  import { LeftOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { I_Task_Filter, E_BatchOption } from './type';
  import { useRoute, useRouter } from 'vue-router';
  import batchBar from './cmts/batchBar';
  import { useModal } from '@/hooks';
  import taskForm from './cmts/taskForm';

  const { t } = useI18n();

  const router = useRouter();

  // 跳转携带参数
  const {
    query: { taskName, taskId },
  } = useRoute() as any;
  const boxType = ref<E_BatchOption>(E_BatchOption.None);
  //全选数量API
  const canSelectApi = ref<Fn>();
  //table dom
  const tableRef: any = ref<HTMLElement>();
  //禁选
  const disabledKeys = ref<any>([]);
  //全选
  const isCheck = ref<boolean>(false);
  //搜索数据源
  const agms = reactive<I_Task_Filter>({
    //任务名称
    task_name: taskName ?? '',
    //任务id
    task_id: taskId ? ~~taskId : undefined,
    //任务创建人
    create_user: undefined,
    //任务状态
    status: undefined,
    //基线规则
    rule_codes: undefined,
    //主机组
    host_group: '',
    //主机
    host_list: [],
  });
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
    initRowSelection();
  };
  const columns = useColumns(t, refreshTable, isCheck);

  //筛选条件确定
  const btnConfirm = (v) => {
    Object.assign(agms, v);
    refreshTable();
  };
  //返回
  const goBack = () => {
    router.go(-1);
  };
  //清空选择
  watch(isCheck, (v) => {
    if (!v) {
      boxType.value = E_BatchOption.None;
    }
  });

  //新增规则
  const addNewRule = () => {
    useModal(
      {
        title: t('reinforce.xjjxrw'),
        width: 800,
        handleOk: async ({ modelRef, validate }) => {
          await validate();
          await addNewTask(modelRef);
          refreshTable();
        },
      },
      createVNode(taskForm),
    );
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
      .tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  .batbar {
    flex: 1;
    background: rgba(24, 186, 121, 0.1);
    border-radius: 4px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 16px;
    margin: 0 16px;
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
  .filterContainer {
    margin-right: 16px;
    .filters {
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
  }
</style>
