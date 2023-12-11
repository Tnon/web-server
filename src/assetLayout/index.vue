<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-06 10:53:51
 * @LastEditTime: 2023-07-06 11:06:19
-->
<template>
  <a-menu
    class="menu"
    v-model:selectedKeys="state.selectedKeys"
    mode="horizontal"
    @click="clickMenuItem"
    @openChange="openChange"
  >
    <template v-for="item in assetRoutes">
      <!-- 横向导航条计算属性，计算宽度有问题 -->
      <menu-item
        :menu-info="item"
        :key="item.name"
        :staticsCount="staticsCount"
        v-if="hasPerimission(item.name)"
      />
    </template>
  </a-menu>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import MenuItem from './menu-item.vue';
  import { useRoute, useRouter } from 'vue-router';
  import assetRoutes from '@/router/modules/hostAsset/index';
  import { getOverviewRouterName, hasPerimission } from '@/utils/permission';
  import { getAssetOverview } from '@/api/asset/overview';

  // 当前路由
  const currentRoute = useRoute(); // 当前路由对象信息
  const router = useRouter(); // 当前路由实例
  const state = reactive({
    // 定义一开始的时候选中状态，选中当前路由name
    selectedKeys: [(currentRoute.meta as any).parentSelectedKeys ?? currentRoute.name],
  });

  // 跟随页面路由变化，切换菜单选中状态
  watch(
    () => currentRoute.fullPath,
    () => {
      if (currentRoute.name == 'login') return;
      state.selectedKeys = [(currentRoute.meta as any).parentSelectedKeys ?? currentRoute.name];
    },
  );

  // 点击菜单
  const clickMenuItem = ({ key }) => {
    state.selectedKeys = [(currentRoute.meta as any).parentSelectedKeys ?? currentRoute.name];
    if (currentRoute.meta.keepIp) {
      const {
        query: { id, ip },
      } = currentRoute;
      router.replace({ name: key, query: { id, ip } });
    } else {
      router.push({ name: key });
    }
  };
  //资产清点模块的数量
  const staticsCount = ref({});
  //打开submenu事件
  const openChange = async (openKeys) => {
    // console.log(openKeys);
    if (openKeys.length) {
      const { statistic } = await getAssetOverview();
      //资产信息
      if (openKeys.includes('hostAsset-layout-assetInfo')) {
        staticsCount.value = statistic?.asset ?? {};
      } else if (openKeys.includes('hostAsset-layout-accountRisk')) {
        //账户风险
        if (statistic && statistic.risk) {
          staticsCount.value = {
            accountRiskweakpwd: statistic.risk.weakpwd,
            accountRiskappweakpwd: statistic.risk.appweakpwd,
            accountRiskapprisk: statistic.risk.apprisk,
            accountRiskaccrisk: statistic.risk.accrisk,
            accountRisksysrisk: statistic.risk.sysrisk,
          };
        }
      } else if (openKeys.includes('hostAsset-layout-assetRisk'))
        if (statistic && statistic.risk) {
          //资产漏洞
          staticsCount.value = {
            assetRiskkernel: statistic.risk.kernel,
            assetRiskapp: statistic.risk.app,
            assetRiskweb: statistic.risk.web,
          };
        }
    }
  };
  //找出第一个路由
  const overviewRouterName = getOverviewRouterName('hostAsset');
  // 当前路由
  const path = currentRoute.path;
  path === '/hostAsset' && router.push({ name: overviewRouterName });
</script>
<style lang="less" scoped>
  .menu {
    width: 100%;
  }
</style>
