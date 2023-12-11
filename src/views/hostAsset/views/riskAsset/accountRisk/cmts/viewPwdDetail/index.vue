<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-18 18:15:00
 * @LastEditTime: 2022-10-08 16:41:27
-->
<template>
  <div class="viewDetail" @click="showDetailModal">{{ t('asset.viewDetail') }}</div>
</template>
<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import { useModal } from '@/hooks';
  import loginRecord from '../loginRecord';

  const { t } = useI18n();
  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
  });
  // 详情对话框
  const showDetailModal = () => {
    useModal(
      {
        title: t('asset.loginHistoryRecord'), // '登录历史记录'
        footer: false,
        width: 600,
        wrapClassName: 'modalBodyNopad',
        contentProps: {
          record: props.record,
        },
      },
      loginRecord,
    );
  };
</script>
<style lang="less" scoped>
  .viewDetail {
    color: @primary-color;
    cursor: pointer;
  }
</style>
