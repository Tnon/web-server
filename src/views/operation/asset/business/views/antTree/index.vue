<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-24 16:22:51
 * @LastEditTime: 2022-12-22 20:56:37
-->
<template>
  <div class="flowContainer" id="mountNodeTree" v-if="toogleflag"> </div>
</template>

<script setup lang="ts">
  import { getBusinessGroups } from '@/api/operation/asset';
  import { GROUPENUM } from '@/enums/moveGroup';
  import { onMounted, nextTick, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { renderTree } from '../tools/renderTree';
  defineProps({
    flowLoading: {
      type: Boolean,
      required: true,
    },
  });
  const toogleflag = ref(true);
  const emit = defineEmits(['update:flowLoading']);
  const { t } = useI18n();
  //画布实例
  const refreshTree = async () => {
    emit('update:flowLoading', true);
    toogleflag.value = false;
    const { items, host_total, group_total } = await getBusinessGroups({
      filter: {
        id: GROUPENUM.ALL,
      },
      exclude_host: false,
      exclude_id: '',
      page: {
        page_index: -1,
        page_size: 20,
      },
    } as any);
    toogleflag.value = true;
    nextTick(() => {
      renderTree({
        id: GROUPENUM.ALL,
        name: t('operation.allgroup'),
        host_num: host_total,
        host_group_num: group_total,
        children: items,
      });
    });

    emit('update:flowLoading', false);
  };
  onMounted(async () => {
    refreshTree();
  });
  defineExpose({ refreshTree });
</script>

<style scoped lang="less">
  .flowContainer {
    width: 100%;
    height: 100%;
  }
</style>
