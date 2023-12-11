<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-18 16:37:45
 * @LastEditTime: 2022-11-08 11:41:07
-->
<template>
  <div class="viewDetail" @click="openDetail">{{ t('asset.viewDetail') }}</div>
</template>
<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import { useModal } from '@/hooks';
  import jarDetail from '../jarDetail';

  const { t } = useI18n();
  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
  });
  const openDetail = () => {
    useModal(
      {
        title: t('asset.jarDetail'),
        width: 600,
        footer: false,
        contentProps: {
          record: props.record,
        },
      },
      jarDetail,
    );
  };
</script>
<style lang="less" scoped>
  .viewDetail {
    color: @primary-color;
    cursor: pointer;
  }
</style>
