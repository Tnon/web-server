<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-26 20:44:50
 * @LastEditTime: 2023-01-16 16:49:31
-->
<template>
  <div class="content">
    <!-- 内容头部  start-->
    <div class="header">
      <div class="title">{{ groupName }}</div>
      <move-del-host
        v-if="boxType"
        @refreshTable="refreshTable"
        :dataTableRef="dataTableRef"
        v-model:boxType="boxType"
        v-model:isCheck="isCheck"
        :filter="state"
      />

      <div class="roption">
        <div class="tools">
          <!-- 批量管理 start -->
          <batch-manage
            v-model:boxType="boxType"
            v-model:disabledKeys="disabledKeys"
            v-model:isCheck="isCheck"
            @refreshTable="refreshTable"
          >
            {{ t('common.batchOpt') }}
          </batch-manage>
          <!-- 批量管理 end -->

          <!-- 高级筛选 start   这里可以直接传对象，待优化-->
          <advan-filter
            v-model:online="state.online"
            v-model:tags="state.tags"
            v-model:os="state.os"
          >
            <span class="filter">
              {{ t('common.filter') }}
              <span class="flag" v-if="StateEffect"></span>
            </span>
          </advan-filter>
          <!-- 高级筛选 end -->

          <!-- 分割线 start -->
          <div class="line"></div>
          <!-- 分割线 end -->

          <!-- 导出 start -->
          <export-data api="/api/report/entitylist" :params="state" />
          <!-- 导出 end -->
        </div>
      </div>
    </div>
    <!-- 内容头部  end-->

    <!-- 表格 start -->
    <data-table
      :agms="state"
      ref="dataTableRef"
      v-model:boxType="boxType"
      v-model:isCheck="isCheck"
      :disabledKeys="disabledKeys"
    />
    <!-- 表格 end -->
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import batchManage from '../batchManage';
  import advanFilter from '../advanFilter';
  import dataTable from '../dataTable';
  import MoveDelHost from '../MoveDelHost';
  import { useI18n } from 'vue-i18n';
  import { ONLINESTATUS } from '@/enums/assetsType';
  import exportData from '@/components/exportData';
  import { GroupHost } from '@/api/operation/model';
  import { GROUPENUM } from '@/enums/moveGroup';
  const props = defineProps({
    //选中的组ID
    groups: {
      type: String,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
    refreshTable: {
      type: Function,
      required: true,
    },
  });
  const { t } = useI18n();
  //选择没选择
  const StateEffect = computed(() => {
    let flag = '';
    for (let k in state) {
      if (k !== 'groups' && k !== 'group_id') {
        const kvalue = state[k] === 0 ? '' : state[k];
        flag += kvalue;
      }
    }
    return flag;
  });
  //table 元素父
  const dataTableRef = ref<any>(null);

  //是否开启筛选列
  const isCheck = ref<boolean>(false);

  //禁选
  const disabledKeys = ref<any>([]);

  //调用子组件的刷新方法
  const refreshTable = (keepPage?: boolean) => {
    unref(dataTableRef).refreshTable(keepPage);
    props.refreshTable();
  };

  //批量管理选项
  const boxType = ref<string>('');

  //条件的结构体,导出参数
  const state = reactive<GroupHost>({
    online: ONLINESTATUS.ALL,
    tags: '',
    groups: props.groups,
    group_id: GROUPENUM.ALL,
    os: '', // 系统信息（系统版本）
  });
</script>
<style lang="less" scoped>
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .header {
    flex: 0 0 48px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: @fz16;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-right: 16px;
    }
    .roption {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .tools {
        display: flex;
        align-items: center;
        padding-right: 48px;

        .line {
          width: 1px;
          height: 16px;
          background: #eeeeee;
          margin: 0 16px;
        }
      }
    }
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
</style>
