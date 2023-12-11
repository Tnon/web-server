<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-25 11:38:28
 * @LastEditTime: 2023-07-31 18:08:35
-->
<template>
  <div class="container">
    <!-- 版本 start -->
    <engine-version ref="engineRef" v-model:filter="filterCmp" />
    <!-- 版本 end -->

    <!-- 版本管理 start -->
    <engine-table ref="engineTableRef" v-model:filter="filterCmp" />
    <!-- 版本管理 end -->
  </div>
</template>

<script setup lang="ts">
  import { EngineFilter } from '@/api/operation/model';
  import { ref, unref, PropType, computed } from 'vue';
  import engineVersion from '../cmts/engineVersion';
  import engineTable from '../cmts/engineTable';
  const props = defineProps({
    filter: {
      type: Object as PropType<Partial<EngineFilter>>,
      required: true,
    },
  });
  const emit = defineEmits(['update:filter']);
  //agent和驱动元素
  const engineRef = ref<any>(null);
  //agent和驱动表格元素
  const engineTableRef = ref<any>(null);

  //升级完后 刷新数据
  const refreshData = (boolean) => {
    unref(engineRef).getVersions();
    unref(engineTableRef).refreshTable(boolean);
  };
  const filterCmp = computed({
    get: () => props.filter,
    set: (v) => emit('update:filter', v),
  });
  //将刷新的方法传出去
  defineExpose({ refreshData });
</script>

<style scoped lang="less">
  .container {
    // overflow: auto;
    // height: calc(100vh - 335px);
    display: flex;
    flex-direction: column;
  }
</style>
