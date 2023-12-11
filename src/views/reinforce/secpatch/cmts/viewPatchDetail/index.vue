<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-26 18:47:53
 * @LastEditTime: 2023-04-27 18:07:41
-->
<template>
  <div class="viewDetail" @click="viewDetail">{{ t('asset.lookOver') }}</div>
</template>
<script lang="ts" setup>
  import useCreatDraw from '@/hooks/use-click-row';
  import { useI18n } from 'vue-i18n';
  import secPatchDrawer from '../secPatchDrawer';
  import { createVNode } from 'vue';

  const props = defineProps<{
    patch_id: number;
    host_id: string;
  }>();
  const { t } = useI18n();
  const viewDetail = () => {
    useCreatDraw(
      {
        title: t('reinforce.bdxq'),
        contentProps: {
          patch_id: props.patch_id,
          host_id: props.host_id,
        },
      },
      createVNode(secPatchDrawer),
    );
  };
</script>
<style lang="less" scoped>
  .viewDetail {
    color: @primary-color;
    cursor: pointer;
  }
</style>
