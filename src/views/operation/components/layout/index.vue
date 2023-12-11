<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-07 19:52:38
 * @LastEditTime: 2023-08-02 17:38:10
-->
<template>
  <a-layout class="layout">
    <a-layout-header :trigger="null" class="upgradeTopMenu">
      <div class="leftcontent">
        <!-- 操作栏 start -->
        <slot name="upgrade" :refreshMethods="refreshMethods"></slot>
        <!-- 操作栏 end -->
        <!--顶部菜单栏 start-->
        <top-menu :menus="routers" class="menus" :needPermission="false" mode="horizontal" />
        <!--顶部菜单栏 end-->
      </div>
    </a-layout-header>
    <!--      内容区域start-->
    <a-layout-content class="layout-content">
      <router-view v-slot="{ Component }">
        <transition name="zoom-fade" mode="out-in" appear>
          <component :is="Component" ref="dymicRef" />
        </transition>
      </router-view>
    </a-layout-content>
    <!--      内容区域end-->
  </a-layout>
</template>

<script lang="ts" setup>
  import { PropType, ref, unref } from 'vue';
  import type { RouteRecordRaw } from 'vue-router';
  import TopMenu from '@/setLayout/menu.vue';
  defineProps({
    routers: Array as PropType<RouteRecordRaw[]>,
  });
  //动态ref
  const dymicRef = ref<any>(null);
  const refreshMethods = () => {
    unref(dymicRef).refreshData();
  };
</script>

<style lang="less" scoped>
  .layout {
    display: flex;
    height: 100%;
    padding: 16px 16px 0;
    background-color: #fff !important;
    .leftcontent {
      display: flex;
      align-items: center;
      width: 100%;
      .menus {
        flex: 1;
      }
    }
  }
  .upgradeTopMenu {
    display: flex;
    justify-content: space-between;
    padding: 0px 0px 16px 0 !important;
    border: none;
    align-items: center;
    z-index: 9;
    position: relative;
    background: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    height: auto;
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
    ::v-deep(.ant-menu-item-selected) {
      background: #f1f1f1;
      font-size: @fz12;
      font-weight: 600;
      color: #000000;
    }
  }
</style>
