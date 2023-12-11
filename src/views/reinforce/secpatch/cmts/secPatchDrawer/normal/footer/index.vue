<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-05 15:21:08
 * @LastEditTime: 2023-04-27 18:39:17
-->
<template>
  <div class="footer">
    <switch-nodes v-model:actived="fType" :types="dymicTab" />
    <component :is="cmts[fType]" :dataSource="dataSource[fType]" />
  </div>
</template>
<script lang="ts" setup>
  import switchNodes from '@/components/switchNodes';
  import cmts from './cmts';
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  defineProps({
    dataSource: {
      type: Object,
      required: true,
    },
  });
  const { t } = useI18n();
  // 刚开始默认选中的tab
  const fType = ref<string>('base_info');
  // 初始化tab
  const dymicTab = ref<any>([
    {
      title: t('reinforce.jbxx'),
      type: 'base_info',
    },
    {
      title: t('reinforce.yxyy'),
      type: 'effect_app',
    },
    {
      title: t('arcomn.repairSuggest'),
      type: 'suggestions',
    },
  ]);
</script>
<style lang="less" scoped>
  .footer {
    padding: 24px 0;
  }
  .emptyStatus {
    margin-top: 100px;
  }
</style>
