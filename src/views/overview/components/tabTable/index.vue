<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-26 17:18:37
 * @LastEditTime: 2023-05-18 09:46:22
-->
<template>
  <div class="maincontainer">
    <div class="tabCon">
      <!-- tab和统计 start -->
      <template v-for="item in allTabs" :key="item.key">
        <div class="node" @click="switchTab(item.key)">
          <!-- 数字箭头 start -->
          <div class="numRi">
            <count-to class="num" :class="{ hascolor: !!item.count }" :endVal="item.count" />
            <RightOutlined class="ricon" />
          </div>
          <!-- 数字箭头 start -->
          <div class="label" :class="{ actived: othSta.actived === item.key }">
            {{ item.label }}
          </div>
        </div>
      </template>
      <!-- tab和统计 end -->
    </div>
    <!-- 表格 start -->
    <slots-table
      :scroll="{ y: '380px' }"
      :pageOption="{ size: 'small' }"
      ref="tableRef"
      v-model:columns="othSta.columns"
      row-key="id"
      :get-list-func="othSta.api"
      class="hostDetailTable"
      :arguments="othSta.agms"
    />
    <!-- 表格 end -->
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { RightOutlined } from '@ant-design/icons-vue';
  import { useColumnsData } from '.';
  import { SlotsTable } from '@/components/slots-table';
  import { getAttRiskNum } from '@/api/overview';
  import { HANDLETYPE } from '@/enums/attack_risk';
  const props = defineProps({
    refreshMethods: Object,
  });
  const { t } = useI18n();
  const tableRef = ref();

  //刷新表格
  const refreshTable = () => {
    tableRef.value.refreshTableData();
  };
  const tabTableApi = () => {
    getCount();
    refreshTable();
  };
  //所有的列
  const columnsData = useColumnsData(t, tabTableApi);
  const othSta = reactive({
    actived: 'alarm',
    columns: columnsData['alarm'].columns,
    api: columnsData['alarm'].api,
    agms: columnsData['alarm'].agms,
  });
  props.refreshMethods!.tabTableApi = tabTableApi;

  //种类
  const allTabs = ref([
    {
      label: t('menu.attack'),
      count: 0,
      key: 'alarm',
    },
    {
      label: t('menu.ngav'),
      count: 0,
      key: 'event',
    },
    {
      label: t('menu.assets'),
      count: 0,
      key: 'asset',
    },
    {
      label: t('menu.reinforce'),
      count: 0,
      key: 'reinforce',
    },
    {
      label: t('menu.operation'),
      count: 0,
      key: 'operation',
    },
  ]);
  //选中的tab
  //切换
  const switchTab = (key) => {
    othSta.actived = key;
    othSta.columns = columnsData[key].columns;
    othSta.api = columnsData[key].api;
    othSta.agms = columnsData[key].agms ?? {};
  };

  //获取统计数据
  const getCount = async () => {
    const { code, ...res } = await getAttRiskNum({ handle: HANDLETYPE.UNHANDLE });
    if (!code) {
      allTabs.value.forEach((ele) => {
        if (ele.key === 'alarm') {
          ele.count = res.alarm_num;
        }
        if (ele.key === 'event') {
          ele.count = res.event_num;
        }
        if (ele.key === 'asset') {
          ele.count = res.asset_num;
        }
        if (ele.key === 'reinforce') {
          ele.count = res.reinforce_num;
        }
        if (ele.key === 'operation') {
          ele.count = res.maintain_num;
        }
      });
    }
  };
  getCount();
</script>

<style scoped lang="less">
  .maincontainer {
    display: flex;
    flex-direction: column;
    .tabCon {
      margin: 16px 4px 0 4px;
      display: flex;

      .node {
        margin: 0 2px;
        flex: 150px 0 0;
        .numRi {
          margin-bottom: 8px;
          padding: 0 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          &:hover {
            .num {
              margin-right: 12px;
            }
          }
          .num {
            font-size: @fz20;
            margin-right: 8px;
            font-weight: 600;
            transition: all 0.3s;
            line-height: 32px;
          }
          .hascolor {
            color: #f75555;
          }
          .ricon {
            color: rgba(0, 0, 0, 0.4);
          }
        }
        .label {
          background: rgba(0, 0, 0, 0.02);
          border-radius: 10px 10px 0px 0px;
          padding: 10px 16px;
          font-size: @fz13;
          font-weight: normal;
          line-height: 16px;
          color: rgba(0, 0, 0, 0.7);
          cursor: pointer;
          transition: all 0.3s;
        }
        .actived {
          font-weight: 600;
          background: #ffffff;
        }
      }
    }
    .hostDetailTable {
      flex: 490px 0 0;
      :deep(th) {
        background-color: #fff;
      }
    }
  }
</style>
