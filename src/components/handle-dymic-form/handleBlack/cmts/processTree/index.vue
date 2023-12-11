<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-09 10:20:11
 * @LastEditTime: 2022-12-09 18:54:53
-->
<template>
  <a-tree-select
    :multiple="true"
    treeNodeFilterProp="name"
    tree-checkable
    allow-clear
    :field-names="{ children: 'items', label: 'name', key: 'id', value: 'id' }"
    :tree-data="treeData"
    v-model:value="pidsCmp"
    @dropdownVisibleChange="dropdownVisibleChange"
    :placeholder="t('arcomn.selectpid')"
  />
</template>

<script setup lang="ts">
  import { getBusinessGroups } from '@/api/operation/asset';
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    pids: Array,
  });
  const { t } = useI18n();
  //树的数据（分组）
  const treeData = ref<any>();
  const emit = defineEmits(['update:pids']);
  const dropdownVisibleChange = async (b) => {
    if (b) {
      const { items } = await getBusinessGroups({
        filter: {
          id: -1,
        },
        page: {
          page_index: -1,
          page_size: 20,
        },
      } as any);
      treeData.value = items;
    }
  };
  //选中的pid
  const pidsCmp = computed({
    get: () => props.pids,
    set: (v) => emit('update:pids', v),
  });
</script>
