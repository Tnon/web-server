<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-26 18:47:53
 * @LastEditTime: 2023-04-28 10:44:05
-->
<template>
  <div class="viewDetail" @click="jumpHostDetail">{{ t('asset.lookOver') }}</div>
</template>
<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';

  const props = defineProps({
    ip: {
      type: String,
      required: true,
    },
    host_id: {
      type: String,
      required: true,
    },
  });
  const { t } = useI18n();
  const router = useRouter();
  const jumpHostDetail = () => {
    router.push({
      name: 'reinforce-layout-secpatch-hostdetail',
      query: { ip: props.ip, host_id: props.host_id },
    });
  };
</script>
<style lang="less" scoped>
  .viewDetail {
    color: @primary-color;
    cursor: pointer;
  }
</style>
