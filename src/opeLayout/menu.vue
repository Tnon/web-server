<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-30 10:43:39
 * @LastEditTime: 2022-11-03 18:19:29
-->
<template>
  <a-menu :selectedKeys="state.selectedKeys" mode="inline" @click="clickMenuItem">
    <template v-for="item in menus" :key="item.name">
      <menu-item :menu-info="item" />
    </template>
  </a-menu>
</template>

<script setup lang="ts">
  import type { RouteRecordRaw } from 'vue-router';
  import { PropType, reactive, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import MenuItem from './menu-item.vue';
  import { getOverviewRouterName } from '@/utils/permission';

  const props = defineProps({
    menus: Array as PropType<RouteRecordRaw[]>,
    routerName: String,
  });

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
    router.push({ name: key });
  };
  //找出第一个路由
  const overviewRouterName = getOverviewRouterName(props.routerName);
  // 当前路由
  const path = currentRoute.path;
  path === '/' + props.routerName && router.push({ name: overviewRouterName });
</script>

<style scoped></style>
