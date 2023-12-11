<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-06-28 20:57:46
 * @LastEditTime: 2023-08-02 17:45:12
-->
<template>
  <a-layout class="layout">
    <a-layout-sider :trigger="null" class="slider" theme="light">
      <!-- 标题 start -->
      <div class="header">
        <!-- <fund-filled class="icon" /> -->
        <div class="iconContainer">
          <custom-icon class="icon" type="#ax-icon_weihu-weihu" />
        </div>
        <span>{{ t('menu.operation') }}</span>
      </div>
      <!-- 标题 end -->
      <div class="line"></div>
      <!-- 侧边菜单栏 start-->
      <aside-menu class="asidemenuop" :menus="operationRoutersCmp" routerName="operation" />
      <!-- 侧边菜单栏 end-->
    </a-layout-sider>
    <!-- 内容区域 start-->
    <a-layout-content class="layout-content">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </a-layout-content>

    <!-- 内容区域 end-->
  </a-layout>
</template>

<script setup lang="ts">
  import operationRouters from '@/router/modules/operation/modules';
  import asideMenu from '@/opeLayout';
  import { useI18n } from 'vue-i18n';
  import { useProductLogo } from '@/store/modules/product-logo';
  import { computed, watchEffect, ref } from 'vue';
  import { E_Win_State } from '@/store/modules/product-logo/type';
  import { RouteRecordRaw } from 'vue-router';
  import { deleteNode } from '@/utils/tools';
  import { cloneDeep } from 'lodash';
  const { t } = useI18n();
  const productLogoStore = useProductLogo();
  //查看当前windows是否安装了
  const win_state = computed(() => productLogoStore.win_state);
  const operationRoutersCmp = ref<RouteRecordRaw[]>([]);
  watchEffect(() => {
    if (win_state.value === E_Win_State.None) {
      operationRoutersCmp.value = deleteNode(
        cloneDeep(operationRouters),
        'operation-layout-basics-server',
      );
    } else {
      operationRoutersCmp.value = operationRouters;
    }
  });
</script>

<style scoped lang="less">
  .layout {
    .slider {
      padding: 8px;
      .line {
        height: 1px;
        background: rgba(0, 0, 0, 0.04);
        margin: 8px 16px 16px 16px;
      }
      .header {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        font-size: @fz16;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        line-height: 24px;
        .iconContainer {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          margin-right: 8px;
          background-color: @primary-color;
          .icon {
            color: #fff;
            font-size: @fz16 !important;
          }
        }
      }
    }
    :deep(.ant-layout-sider) {
      border-right: 1px solid #fafafa !important;
    }
    .asidemenuop {
      height: calc(100vh - 100px);
      overflow: auto;
      :deep(.ant-menu-item) {
        padding-left: 16px !important;
        height: 40px;
        line-height: 40px;
        margin: 0;
        font-size: @fz13;
        color: rgba(0, 0, 0, 0.7);
        &:active {
          background-color: rgba(0, 0, 0, 0.04);
          border-radius: 8px;
        }

        .ant-menu-item-icon + span {
          margin-left: 8px;
        }
      }
      :deep(.ant-menu-item-group-title) {
        padding-left: 16px !important;
        padding-top: 24px !important;
      }
      :deep(.ant-menu-item-selected) {
        background: rgba(0, 0, 0, 0.08);
        border-radius: 8px;
      }
    }
  }
  .layout-content {
    background-color: #fff;
  }
</style>
