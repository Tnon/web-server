<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-25 19:05:51
 * @LastEditTime: 2023-10-13 10:29:55
-->
<template>
  <div class="boxcon">
    <div class="leftCon">
      <div class="header">
        <!-- 期间统计 start -->
        <statisc v-model:fold="fold" :class="!fold ? 'static' : ''" />
        <!-- 期间统计 end -->
        <!-- 登出期间 start -->
        <logoutSta class="logout" :refreshMethods="refreshMethods" v-show="fold" />
        <!-- 登出期间 end -->
        <!-- 定时刷新 start -->
        <div class="autoRefre">
          <autoRefresh tokenType="overview" :refreshMothod="refreshMothod" />
        </div>
        <a-button @click="openMonitor">大屏</a-button>
        <!-- 定时刷新 end -->
      </div>

      <!-- 告警事件资产维护等 start -->
      <tab-table :refreshMethods="refreshMethods" />
      <!-- 告警事件资产维护等 end -->

      <!-- 告警图表 start -->
      <alarmChartTable :refreshMethods="refreshMethods" />
      <!-- 告警图表 end -->
    </div>
    <div class="rightCon">
      <!-- 授权卡片 start -->
      <license-card />
      <!-- 授权卡片 end -->

      <!-- 主机风险统计 start -->
      <host-attack :refreshMethods="refreshMethods" />
      <!-- 主机风险统计 end -->
      <!-- 操作系统分布及离线统计 start -->
      <operatingsys-chart class="container" :refreshMethods="refreshMethods" />
      <!-- 操作系统分布及离线统计 end -->

      <!-- 操作系统主机分布 start -->
      <operatingsys-table :refreshMethods="refreshMethods" />
      <!-- 操作系统主机分布 end -->
    </div>
    <!-- 攻击风险运维 start -->
    <!-- <atck-risk :refreshMethods="refreshMethods" /> -->
    <!-- 攻击风险运维 end -->

    <!-- 操作系统分布及离线统计 start -->
    <!-- <operatingsys-offline :refreshMethods="refreshMethods" /> -->
    <!-- 操作系统分布及离线统计 end -->
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import statisc from './components/statis';
  import logoutSta from './components/logoutSta';
  // import atckRisk from './components/atckRisk';
  import hostAttack from './components/hostAttack';
  import tabTable from './components/tabTable';
  import licenseCard from './components/licenseCard';
  import autoRefresh from '@/components/refreshAuto';
  import alarmChartTable from './components/alarmChartTable';
  import operatingsysChart from '../hostAsset/views/overview/cmts/operatingsysOffline/cmts/opreratingsysChart';
  import operatingsysTable from '../hostAsset/views/overview/cmts/operatingsysOffline/cmts/operatingsysTable';
  import { useRouter } from 'vue-router';
  //期间统计显示
  const fold = ref<boolean>(true);
  //定时刷新方法集合
  const refreshMethods = reactive<{ [k: string]: Fn | undefined }>({
    logoutStaApi: undefined, // header登出时间
    tabTableApi: undefined, //统计
    atckrisktypeApi: undefined, // 告警监控-左侧告警类型分布
    hostStaticApi: undefined, //主机和风险数量统计
    osDistriChartApi: undefined, // 操作系统分布饼图
    osDistriTableApi: undefined, // 操作系统分布表格

    // offflieTableApi: undefined, // 离线主机统计表格
    // atckriskApi: undefined, // 攻击风险运维
    // echartsApi: undefined, // 告警见监控-右侧折线图
    // lasteventApi: undefined, // 最新告警
  });
  //定时刷新方法
  const refreshMothod = () => {
    for (let k in refreshMethods) {
      if (refreshMethods[k]) {
        refreshMethods[k]!();
      }
    }
  };
  const router = useRouter();
  //打开大屏
  const openMonitor = () => {
    const routerUrl = router.resolve({
      name: 'monitor',
    });
    window.open(routerUrl.href, '_blank');
  };
</script>
<style lang="less" scoped>
  .boxcon {
    height: 100%;
    overflow: auto;
    padding: 16px;

    // display: flex;
    .leftCon {
      display: inline-block;
      width: 70%;
      vertical-align: top;
      .header {
        display: flex;
        align-items: center;
        .static {
          width: 100%;
          transition: all 0.2s;
          border-radius: 8px 8px 0 0;
        }
        .logout {
          background: #fff;
          height: 40px;
          display: flex;
          align-items: center;
          border-radius: 8px;
          margin-left: 8px;
          padding: 0 12px;
          flex: 1;
          font-size: @fz12;
          color: rgba(0, 0, 0, 0.6);
        }
        .autoRefre {
          background: #fff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          margin-left: 8px;
          :deep(.ant-btn) {
            height: 40px;
          }
        }
      }
    }
    .rightCon {
      display: inline-block;
      width: calc(30% - 16px);
      background-color: #fff;
      margin-left: 16px;
      .container {
        height: 300px;
      }
    }
  }
</style>
