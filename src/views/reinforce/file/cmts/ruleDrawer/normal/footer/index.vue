<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-05 15:21:08
 * @LastEditTime: 2023-03-07 10:40:42
-->
<template>
  <div class="footer">
    <switch-nodes v-model:actived="fType" :types="dymicTab" />
    <component
      :is="fType === 'timeline' ? timeLine : labelInfo"
      :id="id"
      :handle="handle"
      :dataSource="dataSource[fType]"
    />
  </div>
</template>
<script lang="ts" setup>
  import switchNodes from '@/components/switchNodes';
  import labelInfo from './cmts/labelinfo';
  import timeLine from './cmts/timeline';
  import { ref, PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { HandleType } from '../../../tableContent/type';
  defineProps({
    dataSource: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    handle: {
      type: Number as PropType<HandleType>,
      required: true,
    },
  });
  const { t } = useI18n();
  // 刚开始默认选中的tab
  const fType = ref<string>('risk_info');
  // 初始化tab
  const dymicTab = ref<any>([
    {
      title: t('arcomn.riskMsg'),
      type: 'risk_info',
    },
    {
      title: t('arcomn.process_info'),
      type: 'process_info',
    },
    {
      title: t('arcomn.file_info'),
      type: 'file_info',
    },
    {
      title: t('arcomn.jkjl'),
      type: 'timeline',
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
