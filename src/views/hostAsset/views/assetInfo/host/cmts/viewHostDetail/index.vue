<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-26 18:47:53
 * @LastEditTime: 2022-11-08 13:38:04
-->
<template>
  <div class="viewDetail" @click="jumpHostDetail">{{ t('asset.lookOver') }}</div>
</template>
<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';

  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
  });
  const { t } = useI18n();
  const router = useRouter();
  const jumpHostDetail = () => {
    router.push({
      name: 'hostAsset-layout-assetInfo-host-detail-host',
      query: { id: props.record.host_id, ip: props.record.ip },
    });
  };
</script>
<style lang="less" scoped>
  .viewDetail {
    color: @primary-color;
    cursor: pointer;
  }
</style>
