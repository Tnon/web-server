<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-06 10:53:51
 * @LastEditTime: 2023-01-12 18:13:45
-->
<template>
  <a-menu
    v-model:selectedKeys="state.selectedKeys"
    v-model:openKeys="openKeysValue"
    :mode="mode"
    @click="clickMenuItem"
  >
    <template v-for="item in menus" :key="item.name">
      <!-- 横向导航条计算属性，计算宽度有问题 -->
      <template v-if="needPermission">
        <menu-item :menu-info="item" v-if="hasPerimission(item.name)" />
      </template>
      <menu-item :menu-info="item" v-else />
    </template>
  </a-menu>
</template>

<script lang="ts" setup>
  import { reactive, computed, watch, PropType } from 'vue';
  import MenuItem from './menu-item.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { hasPerimission } from '@/utils/permission';

  const props = defineProps({
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean,
      default: false,
    },
    // 路由信息
    menus: {
      type: Array as PropType<any[]>,
    },
    openKeys: {
      type: Array,
      default: () => [],
    },
    mode: String,
    //是否需要权限验证，主机详情不需要，安装升级/运行管理不需要
    needPermission: {
      type: Boolean,
      required: true,
    },
  });
  const emit = defineEmits(['update:openKeys']);
  // 当前路由
  const currentRoute = useRoute(); // 当前路由对象信息
  const router = useRouter(); // 当前路由实例
  const state = reactive({
    // 定义一开始的时候选中状态，选中当前路由name
    selectedKeys: [
      // ??类似于 || 前面的值除了null和undefined之外。不管后面是什么值，都返回前面的值
      (currentRoute.meta as any).selectedKeys ?? currentRoute.name,
    ],
  });

  // 当前展开的菜单项key组成的数组
  const openKeysValue = computed({
    get: () => props.openKeys,
    set: (val) => emit('update:openKeys', val),
  });

  // 监听菜单收缩状态
  watch(
    () => props.collapsed,
    () => {
      state.selectedKeys = [currentRoute.name];
    },
  );

  // 跟随页面路由变化，切换菜单选中状态
  watch(
    () => currentRoute.fullPath,
    () => {
      if (currentRoute.name == 'login' || props.collapsed) return;
      state.selectedKeys = [(currentRoute.meta as any).selectedKeys ?? currentRoute.name];
    },
  );

  // 点击菜单
  const clickMenuItem = ({ key }) => {
    state.selectedKeys = [(currentRoute.meta as any).selectedKeys ?? currentRoute.name];
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
