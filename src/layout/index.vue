<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2023-08-02 17:26:22
-->
<template>
  <a-layout class="layout">
    <a-layout-sider class="layout-sider80" :trigger="null" theme="light">
      <!--      网站logo start-->
      <logo />
      <!--      网站logo end-->
      <!--      侧边菜单栏start-->
      <aside-menu />
      <!--      侧边菜单栏end-->
      <!-- 系统切换 start -->
      <switch-system />
      <!-- 系统切换 end -->
      <!--      设置/头像start-->
      <setting-avatar />
      <!--      设置/头像end-->
    </a-layout-sider>
    <!--      内容区域start-->
    <a-layout-content class="layout-content">
      <div class="tabsview" v-if="refreshContent">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </a-layout-content>
    <!--      内容区域end-->
  </a-layout>
</template>

<script lang="ts" setup>
  import { ref, provide, nextTick } from 'vue';
  import Logo from './logo/index.vue';
  import AsideMenu from './menu/menu.vue';
  import SettingAvatar from './setava/index.vue';
  import SwitchSystem from './switch-system';
  import { useRoute, useRouter } from 'vue-router';
  import { getOverviewRouterName } from '@/utils/permission';

  //根据权限手动重定向
  const currentRoute = useRoute();
  const router = useRouter();
  // 当前路由
  const path = currentRoute.path;
  //重新加载内容的方法
  const refreshContent = ref<boolean>(true);
  const reloadContentRouter = async () => {
    refreshContent.value = false;
    await nextTick();
    refreshContent.value = true;
  };
  provide('reloadContentRouter', reloadContentRouter);
  //找出第一个路由
  const overviewRouterName = getOverviewRouterName();
  path === '/' && router.push({ name: overviewRouterName });
</script>

<style lang="less" scoped>
  .layout {
    display: flex;
    height: 100vh;
    .ant-layout {
      min-width: 1080px;
      background: #f8f8f8;
    }
    .layout-sider80 {
      width: 80px !important;
      flex: 0 0 80px !important;
      max-width: 80px !important;
      min-width: 80px !important;
      background: #fafafa !important;
      border-right: 1px solid rgba(0, 0, 0, 0.04);
      :deep(.ant-menu) {
        background: #fafafa !important;
      }
    }
    .layout-content {
      flex: auto;
      overflow: auto;
      background: #f8f8f8;
      .tabsview {
        min-width: 1200px;
        overflow: hidden;
        height: 100%;
      }
    }
  }
</style>
