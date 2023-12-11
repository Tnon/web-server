<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-06-28 20:57:46
 * @LastEditTime: 2023-08-02 17:45:52
-->
<template>
  <a-layout class="layout">
    <a-layout-sider :trigger="null" class="slider" theme="light">
      <!-- 标题 start -->
      <div class="header">
        <!-- <fund-filled class="icon" /> -->
        <div class="iconContainer">
          <custom-icon class="icon" type="#ax-Protection" />
        </div>
        <span>{{ t('menu.strategy') }}</span>
      </div>
      <!-- 标题 end -->
      <div class="line"></div>
      <!--      侧边菜单栏start-->
      <aside-menu class="asidemenuop" :menus="strategyRouters" routerName="strategy" />
      <!--      侧边菜单栏end-->
    </a-layout-sider>
    <!--      内容区域start-->
    <a-layout-content class="layout-content">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </a-layout-content>

    <!--      内容区域end-->
  </a-layout>
</template>

<script setup lang="ts">
  import strategyRouters from '@/router/modules/strategy/modules';
  import asideMenu from '@/opeLayout';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
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
