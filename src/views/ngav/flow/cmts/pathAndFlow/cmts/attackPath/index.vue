<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-21 11:16:04
 * @LastEditTime: 2023-10-31 15:30:16
-->
<template>
  <div class="attackPath">
    <!-- 攻击路径下拉框 start -->
    <switch-nodes
      class="switchBar"
      v-model:actived="seletedPathCmp"
      :types="
        select_options.map((ele) => ({ title: ele.act_path_name, type: ele.act_path_sha256 }))
      "
    />
    <!-- 攻击路径下拉框 end -->
  </div>
</template>

<script setup lang="ts">
  import { PropType, computed } from 'vue';
  import { SelectOption, PathCi } from '@/views/ngav/flow/type';
  import switchNodes from '@/components/switchNodes';
  const props = defineProps({
    select_options: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
    seletedPathSha256: {
      type: String,
      required: true,
    },
    selectedCiInfo: {
      type: Object as PropType<PathCi>,
      required: true,
    },
  });
  //双向绑定
  const emit = defineEmits(['update:seletedPathSha256']);
  //选择路径的中介
  const seletedPathCmp = computed({
    get: () => props.seletedPathSha256,
    set: (v) => emit('update:seletedPathSha256', v),
  });
</script>

<style scoped lang="less">
  .attackPath {
    padding: 4px 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    .switchBar {
      border: none;
      :deep(.defaultS) {
        padding: 4px 16px;
        border-radius: 8px;
      }
      :deep(.actived) {
        background: rgba(0, 0, 0, 0.08);
      }
    }
  }
</style>
