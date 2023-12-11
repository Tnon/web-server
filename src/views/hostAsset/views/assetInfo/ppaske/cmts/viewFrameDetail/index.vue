<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-04 18:54:26
 * @LastEditTime: 2022-11-18 17:26:15
-->
<template>
  <div class="viewDetail" @click="openDetail"> {{ record.count || 0 }} </div>
</template>

<script setup lang="ts">
  import { useModal } from '@/hooks';
  import frameDetail from '../frameDetail';
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
        title: props.record.frame_name + t('asset.gljarp'),
        width: 800,
        footer: false,
        contentProps: {
          record: props.record,
        },
      },
      frameDetail,
    );
  };
</script>

<style scoped lang="less">
  .viewDetail {
    color: @primary-color;
    cursor: pointer;
  }
</style>
