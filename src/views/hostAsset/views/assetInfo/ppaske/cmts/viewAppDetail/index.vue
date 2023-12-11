<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-04 18:54:26
 * @LastEditTime: 2023-04-27 14:05:28
-->
<template>
  <div class="viewDetail" @click="openDetail"> {{ record.count }} </div>
</template>

<script setup lang="ts">
  import { useModal } from '@/hooks';
  import appDetail from '../appDetail';
  import { useI18n } from 'vue-i18n';
  import { PropType } from 'vue';
  const { t } = useI18n();
  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
    type: {
      type: String as PropType<'database' | 'app'>,
      required: true,
    },
  });
  //打开详情
  const openDetail = () => {
    useModal(
      {
        title: (props.record.app_name || props.record.database_name) + t('asset.reorna'),
        width: 900,
        footer: false,
        wrapClassName: 'modalBodyNopad',
        contentProps: {
          record: props.record,
          type: props.type,
        },
      },
      appDetail,
    );
  };
</script>

<style scoped lang="less">
  .viewDetail {
    color: @primary-color;
    cursor: pointer;
  }
</style>
