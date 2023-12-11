<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2023-06-19 18:37:19
-->
<template>
  <div class="asidemenu">
    <a-menu :selected-keys="state.selectedKeys" mode="inline" theme="light" @click="clickMenuItem">
      <template v-for="item in allRouters" :key="item.name">
        <menu-item :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
  import { computed, inject, reactive, ref, unref, watch, watchEffect } from 'vue';
  import MenuItem from './menu-item.vue';
  import { RouteRecordRaw, useRoute, useRouter } from 'vue-router';
  import { adminRouters } from '@/router/common';
  import { useProductLogo } from '@/store/modules/product-logo';
  import { cloneDeep } from 'lodash';
  import { deleteNode } from '@/utils/tools';
  const productLogoStore = useProductLogo();
  const acdr_enabled = computed(() => productLogoStore.acdr_enabled);
  // 当前路由
  const currentRoute = useRoute();
  const router = useRouter();
  //选中路由的结构体
  const state = reactive({
    selectedKeys: [(currentRoute.name as string).split('-')[0]],
  });
  // 跟随页面路由变化，切换菜单选中状态
  watch(
    () => currentRoute.fullPath,
    () => {
      if (currentRoute.name == 'login') return;
      state.selectedKeys = [(currentRoute.name as string).split('-')[0]];
    },
  );
  const reloadContentRouter: any = inject('reloadContentRouter');
  // 点击菜单
  const clickMenuItem = ({ key }: any) => {
    if (state.selectedKeys[0] !== key) {
      router.push({ name: key });
    } else {
      reloadContentRouter();
    }
  };
  const allRouters = ref<RouteRecordRaw[]>([]);
  //全部路由
  watchEffect(() => {
    if (unref(acdr_enabled)) {
      allRouters.value = adminRouters;
    } else {
      allRouters.value = deleteNode(cloneDeep(adminRouters), 'acdr');
    }
  });
</script>
<style lang="less" scoped>
  .asidemenu {
    padding: 0 8px;
    :deep(.ant-menu) {
      &::before,
      &::after,
      .ant-menu::after {
        display: none;
      }

      .ant-menu-item {
        margin: 8px 0 !important;
        padding: 8px 0 !important;
        border-radius: 8px;
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5) !important;
        flex-direction: column;
        height: auto;
        &:active {
          background-color: rgba(0, 0, 0, 0.08);
        }
      }
      .ant-menu-item-selected {
        color: #000000 !important;
        background: #eee !important;
        font-weight: 800 !important;
      }
      .ant-menu-title-content {
        margin: 2px 0 0 0 !important;
        line-height: normal;
      }

      .ant-menu-inline,
      .ant-menu-vertical,
      .ant-menu-vertical-left {
        border: none;
      }
    }
  }
</style>
