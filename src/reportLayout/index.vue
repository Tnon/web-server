<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-13 19:59:37
 * @LastEditTime: 2023-01-12 18:13:33
-->
<template>
  <a-menu
    v-model:selectedKeys="state.selectedKeys"
    mode="horizontal"
    @click="clickMenuItem"
    class="menu"
  >
    <template v-for="item in menus" :key="item.name">
      <menu-item :menu-info="item" v-if="hasPerimission(item.name)" />
    </template>
  </a-menu>
</template>

<script lang="ts" setup>
  import { reactive, watch, PropType } from 'vue';
  import MenuItem from './menu-item.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { hasPerimission } from '@/utils/permission';
  defineProps({
    // 路由信息
    menus: {
      type: Array as PropType<any[]>,
    },
  });
  // 当前路由
  const currentRoute = useRoute(); // 当前路由对象信息
  const router = useRouter(); // 当前路由实例
  const state = reactive({
    // 定义一开始的时候选中状态，选中当前路由name
    selectedKeys: [
      // ??类似于 || 前面的值除了null和undefined之外。不管后面是什么值，都返回前面的值
      (currentRoute.meta as any).parentSelectedKeys ?? currentRoute.name,
    ],
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
</script>
<style lang="less" scoped>
  .menu {
    width: 100%;
  }
</style>
