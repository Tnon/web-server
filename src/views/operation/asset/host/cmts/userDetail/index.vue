<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-19 17:34:41
 * @LastEditTime: 2022-10-28 15:10:01
-->
<template>
  <div class="name" @click="viewUserDetail">{{ userNumber }} </div>
</template>

<script setup lang="ts">
  import { useModal } from '@/hooks';
  import { useI18n } from 'vue-i18n';
  import addModal from './cmts/addModal';

  const props = defineProps({
    userNumber: {
      type: Number,
      required: true,
    },
    group_id: {
      type: Number,
      required: true,
    },
    refreshTable: {
      type: Function,
      required: true,
    },
  });
  const { t } = useI18n();
  //路由跳转
  const viewUserDetail = () => {
    useModal(
      {
        title: t('operation.yfemgls'),
        width: 1080,
        footer: false,
        contentProps: {
          group_id: props.group_id,
          modalTitle: t('operation.yfemgls'),
          refreshTable: props.refreshTable,
        },
        wrapClassName: 'noheadModal',
      },
      addModal,
    );
  };
</script>

<style scoped lang="less">
  .name {
    cursor: pointer;
    color: @primary-color;
  }
</style>
