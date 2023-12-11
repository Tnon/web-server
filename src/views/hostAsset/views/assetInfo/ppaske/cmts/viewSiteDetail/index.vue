<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-04 18:54:26
 * @LastEditTime: 2022-07-25 18:25:10
-->
<template>
  <div class="viewDetail" @click="openDetail"> {{ t('asset.viewDetail') }} </div>
</template>

<script setup lang="ts">
  import { useModal } from '@/hooks';
  import siteDetail from '../siteDetail';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
  });
  //打开详情
  const openDetail = () => {
    useModal(
      {
        title: props.record.domain_name,
        width: 800,
        footer: false,
        contentProps: {
          record: props.record,
        },
      },
      siteDetail,
    );
  };
</script>

<style scoped lang="less">
  .viewDetail {
    color: @primary-color;
    cursor: pointer;
  }
</style>
