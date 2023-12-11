<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-07 19:52:38
 * @LastEditTime: 2023-08-02 17:33:47
-->
<template>
  <a-layout class="layout">
    <a-layout-header :trigger="null" class="assTopMenu">
      <!--顶部菜单栏 start-->
      <assetLayout mode="horizontal" />
      <!--顶部菜单栏 end-->
    </a-layout-header>
    <!--      内容区域start-->
    <a-layout-content class="layout-content">
      <!-- Component:要传递给 <component> 的 VNodes 是 prop 
            route ： 解析出的标准化路由地址。-->
      <router-view v-slot="{ Component }">
        <!-- <transition name="zoom-fade" mode="out-in" appear> -->
        <component :is="Component" />
        <!-- </transition> -->
      </router-view>
    </a-layout-content>
    <!--      内容区域end-->
  </a-layout>
</template>

<script lang="ts" setup>
  import assetLayout from '@/assetLayout';
</script>

<style lang="less" scoped>
  .layout {
    display: flex;
    height: 100%;
    .layout-content {
      flex: 1;
    }
  }
  .assTopMenu {
    flex: 0 0 48px;
    padding: 8px 6px !important;
    border: none;
    z-index: 9;
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    ::v-deep(.ant-menu) {
      .ant-menu-item,
      .ant-menu-submenu {
        padding: 0 !important;
        margin: 0 2px !important;
        border-radius: 7px;
        font-size: @fz13;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        line-height: 32px;

        .ant-menu-title-content {
          padding: 6px 15px !important;
        }
        &::after {
          display: none;
        }
      }
      .ant-menu-submenu-selected,
      .ant-menu-item-selected {
        // background: #eeeeee;
        .iconParent {
          background-color: @primary-color;
          .btnIcons {
            color: #fff;
          }
        }
        font-size: @fz14;
        font-weight: 600;
        color: #000000;
      }
    }
  }
</style>
