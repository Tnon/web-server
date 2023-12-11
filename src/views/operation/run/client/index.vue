<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-05 18:06:40
 * @LastEditTime: 2022-07-11 19:50:19
-->
<template>
  <div>
    <!-- 筛选 start -->
    <top-filter v-model:activedType="cmtType" />
    <!-- 筛选 end -->
    <transition name="zoom-fade" mode="out-in" appear>
      <!-- 动态组件 start -->
      <component :is="modules[cmtType]" />
      <!-- 动态组件 end -->
    </transition>
  </div>
</template>

<script setup lang="ts">
  import modules from './views/';
  import { ref } from 'vue';
  import topFilter from './components/topFilter';
  import type { CmtTypes } from './type';
  import { useRoute } from 'vue-router';
  // 总览跳转携带参数
  const {
    query: { type },
  } = useRoute() as any;
  const cmtType = ref<CmtTypes>(type ?? 'agent');
</script>

<style scoped></style>
