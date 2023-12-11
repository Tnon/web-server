<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-11 18:20:05
 * @LastEditTime: 2023-08-02 17:42:45
-->
<template>
  <a-layout>
    <!--顶部菜单栏 start-->
    <a-layout-header :trigger="null" class="reportTopMenu">
      <report-layout :menus="reportRouters" />
    </a-layout-header>
    <!--顶部菜单栏 end-->

    <!-- 内容区域start -->
    <a-layout-content>
      <router-view v-slot="{ Component }">
        <transition name="zoom-fade" mode="out-in" appear>
          <component :is="Component" />
        </transition>
      </router-view>
    </a-layout-content>
    <!-- 内容区域end -->
  </a-layout>
</template>

<script lang="ts" setup>
  // import TopMenu from '@/setLayout/menu.vue';
  import reportRouters from '@/router/modules/report/index';
  import { getOverviewRouterName } from '@/utils/permission';
  import { useRoute, useRouter } from 'vue-router';
  import reportLayout from '@/reportLayout';
  //找出第一个路由
  const overviewRouterName = getOverviewRouterName('report');
  // 当前路由
  const currentRoute = useRoute(); // 当前路由对象信息
  const router = useRouter(); // 当前路由实例
  // 当前路由
  const path = currentRoute.path;
  path === '/report' && router.push({ name: overviewRouterName });
</script>

<style lang="less" scoped>
  .reportTopMenu {
    height: 48px;
    padding: 0px 16px !important;
    border: none;
    z-index: 9;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    line-height: normal;
    ::v-deep(.ant-menu-item) {
      padding: 6px 15px !important;
      margin: 0 2px !important;
      border-radius: 7px;
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      line-height: 20px;
      &::after {
        display: none;
      }
      &:hover {
        background: #f1f1f1;
      }
    }
    :deep(.ant-menu) {
      background: none;
    }
    ::v-deep(.ant-menu-item-selected) {
      background: #f1f1f1;
      font-size: @fz12;
      font-weight: 600;
      color: #000000;
    }
  }
</style>
