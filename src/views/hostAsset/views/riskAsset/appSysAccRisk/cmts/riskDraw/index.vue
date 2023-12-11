<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-06-20 10:27:15
 * @LastEditTime: 2023-07-10 10:15:16
-->
<template>
  <div class="detail" @click="openDraw">
    {{ t('asset.detail') }}
  </div>
</template>

<script setup lang="ts">
  import useCreatDraw from '@/hooks/use-click-row';
  import { useI18n } from 'vue-i18n';
  import drawContent from './cmts/drawContent';
  import { getRiskDrawApi } from '@/api/asset/accountRisk/apprisk';
  const props = defineProps<{
    title: string;
    uuid: string;
    type: string;
    host_id?: string;
  }>();
  const { t } = useI18n();

  const openDraw = async () => {
    const { desc, verify, proposal, level } = await getRiskDrawApi(
      {
        uuid: props.uuid,
        host_id: props.host_id,
      },
      '/api/asset/' + props.type + '/detail/panelview',
    );
    useCreatDraw(
      {
        title: props.title,
        width: 800,
        contentProps: {
          level,
          desc,
          verify,
          proposal,
        },
      },
      drawContent,
    );
  };
</script>

<style scoped lang="less">
  .detail {
    color: @primary-color;
    cursor: pointer;
  }
</style>
