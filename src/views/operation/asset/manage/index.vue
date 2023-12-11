<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-26 20:44:50
 * @LastEditTime: 2023-04-07 18:04:14
-->
<template>
  <div class="content">
    <!-- 内容头部  start-->
    <div class="header">
      <div class="title">{{ t('operation.assetManage') }}</div>
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
            v-model:groups="state.groups"
            v-model:os="state.os"
          >
            <span class="filter">
              {{ t('common.filter') }}
              <span class="flag" v-if="StateEffect"></span>
            </span>
          </advan-filter>
          <!-- 高级筛选 end -->

          <!-- 导入excel start -->
          <import-excel class="imtbtn" :refreshAll="refreshTable">
            {{ t('common.imtHost') }}
          </import-excel>
          <!-- 导入excel end -->

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
  import batchManage from './cmts/batchManage';
  import advanFilter from './cmts/advanFilter';
  import dataTable from './cmts/dataTable';
  import MoveDelHost from './cmts/MoveDelHost';
  import importExcel from './cmts/importExcel';
  import { useI18n } from 'vue-i18n';
  import { GROUPS, ONLINESTATUS } from '@/enums/assetsType';
  import exportData from '@/components/exportData';
  import { GroupHost } from '@/api/operation/model';
  import { useRoute } from 'vue-router';

  const { t } = useI18n();
  // 主机组跳转携带参数
  const {
    query: { group_id },
  } = useRoute() as any;
  //选择没选择
  const StateEffect = computed(() => {
    let flag = '';
    for (let k in state) {
      if (k !== 'group_id') {
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
  };

  //批量管理选项
  const boxType = ref<string>('');

  //条件的结构体,导出参数
  const state = reactive<GroupHost>({
    online: ONLINESTATUS.ALL,
    tags: '',
    group_id: GROUPS.ALL,
    os: '', // 系统信息（系统版本）
    groups: group_id ?? '', //高级筛选的分组
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
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: @fz14;
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
