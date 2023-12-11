<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-26 20:44:50
 * @LastEditTime: 2023-10-12 11:55:25
-->
<template>
  <div class="content">
    <!-- 内容头部  start-->
    <div class="header">
      <move-del-host
        v-if="boxType"
        @refreshTable="refreshTable"
        :dataTableRef="dataTableRef"
        v-model:boxType="boxType"
        v-model:isCheck="isCheck"
        :filter="state"
      />
      <span v-if="!boxType" class="title">{{ t('common.allHost') }}</span>
      <!-- 卡片筛选 end -->
      <div class="roption">
        <!-- 搜索 start -->
        <a-input-search
          class="search"
          v-model:value.trim="state.searchdata"
          :placeholder="t('common.hostNameIp')"
          @search="onSearch"
          @change="onSearch"
        />
        <!-- 搜索 end -->
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
          v-model:secure_status="state.secure_status"
          v-model:online="state.online"
          v-model:osver="state.osver"
          v-model:asset_status="state.asset_status"
          v-model:groups="state.groups"
          v-model:tags="state.tags"
          :group="group_id"
          v-model:update_time="state.update_time"
          v-model:swtchecked="swtchecked"
          v-model:os="state.os"
        >
          <span class="filter">
            {{ t('common.filter') }}
            <span class="flag" v-if="StateEffect"></span>
          </span>
        </advan-filter>
        <!-- 高级筛选 end -->

        <!-- 切换视图 start -->
        <a-button type="text" class="swt_view" @click="switchView">
          <template #icon>
            <WalletOutlined />
          </template>
          {{ t('asset.swtView') }}
        </a-button>
        <!-- 切换视图 end -->

        <!-- 分割线 start -->
        <div class="line"></div>
        <!-- 分割线 end -->

        <!-- 导出 start -->
        <export-data api="/api/report/entitylist" :params="state" />
        <!-- 导出 end -->
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
  import { PropType, reactive, ref, watch, computed, unref } from 'vue';
  import { WalletOutlined } from '@ant-design/icons-vue';
  import batchManage from '../batchManage';
  import advanFilter from '../advanFilter';
  import dataTable from '../dataTable';
  import MoveDelHost from '../MoveDelHost';
  import { HostList } from '@/api/asset/model/assetsModel';
  import { useRoute, useRouter } from 'vue-router';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { useI18n } from 'vue-i18n';
  import {
    ASSETSTATUS,
    ONLINESTATUS,
    OSTYPE,
    SECURESTATUS,
    ORDERBYOFFLINE,
  } from '@/enums/assetsType';
  import exportData from '@/components/exportData';
  const props = defineProps({
    //选中的组ID
    group_id: {
      type: Number as PropType<number>,
      required: true,
    },
  });
  const { t } = useI18n();
  const router = useRouter();
  //选择没选择
  const StateEffect = computed(() => {
    let flag = '';
    for (let k in state) {
      //屏蔽windows
      // 将默认传递但是未出现在筛选框中的项排除
      if (k !== 'searchdata' && k !== 'group_id' && k !== 'osver' && k !== 'offline_order_by') {
        const kvalue = state[k] === 0 ? '' : state[k];
        flag += kvalue;
      }
    }
    return flag;
  });
  //路由 获取总览的参数
  const {
    query: { secure_status, online, osver, dataRange, asset_status, offline_order_by },
  } = useRoute();
  //table 元素父
  const dataTableRef = ref<any>(null);
  //是否开启筛选列
  const isCheck = ref<boolean>(false);

  //禁选
  // const disKey = reactive({
  //   disabled_keys: [],
  // });
  const disabledKeys = ref<any>([]);

  //调用子组件的刷新方法
  const refreshTable = (keepPage?: boolean) => {
    unref(dataTableRef).refreshTable(keepPage);
  };

  //卡片筛选是否显示（init:true）
  const swtchecked = ref<boolean>(true);

  //批量管理选项
  const boxType = ref<string>('');

  //条件的结构体,导出参数
  const state = reactive<HostList>({
    secure_status: secure_status ? Number(secure_status) : SECURESTATUS.ALL, //健康状态
    online: online ? Number(online) : ONLINESTATUS.ALL, //在线离线
    asset_status: asset_status ? Number(asset_status) : ASSETSTATUS.ALL, // 资产状态
    // 屏蔽windows
    osver: osver ? Number(osver) : OSTYPE.LINUX, //系统
    groups: '', //高级筛选的分组
    tags: '', //标签
    update_time: (dataRange as string) ?? '', //高级筛选的日期
    searchdata: '', //搜索
    group_id: props.group_id, //组
    os: '', // 系统信息（系统版本）
    offline_order_by: offline_order_by ? Number(offline_order_by) : ORDERBYOFFLINE.UNORDER, // 是否按照离线时间排序（总览页跳转时的需求）
  });
  //这里由于reactive合并，将选中的组id直接合并到state结构体
  watch(
    () => props.group_id,
    (v) => {
      //选择树分组变化，筛选项的分组初始化
      state.groups = '';
      state.group_id = v;
    },
  );
  // 搜索框变化刷新表格
  const onSearch = (v, e) => {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      //初始化筛选
      initRowSelection();
      refreshTable();
    }
    if (!value && !e) {
      //初始化筛选
      initRowSelection();
      refreshTable();
    }
  };
  const switchView = () => {
    router.push({ name: 'hostAsset-layout-assetInfo-host-system' });
  };
  // defineExpose({ refreshTable, refreshFilter });
  defineExpose({ refreshTable });
</script>
<style lang="less" scoped>
  .content {
    padding-bottom: 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .title {
    font-size: @fz14;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
  }
  .header {
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .roption {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .search {
        width: 220px;
      }
      .line {
        width: 1px;
        height: 16px;
        background: #eeeeee;
        margin-right: 16px;
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
