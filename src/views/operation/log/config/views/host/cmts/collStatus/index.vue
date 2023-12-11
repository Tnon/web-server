<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-29 18:51:38
 * @LastEditTime: 2023-08-29 19:20:38
-->
<template>
  <div class="text" @click="openDetail">{{ normal + ' / ' + total }} </div>
</template>

<script setup lang="ts">
  import { useModal } from '@/hooks';
  import { createVNode } from 'vue';
  import { useI18n } from 'vue-i18n';
  import collDetail from '../collDetail';
  const props = defineProps<{
    normal: number;
    total: number;
    host_id: string;
    ip: string;
  }>();
  const { t } = useI18n();
  const openDetail = () => {
    useModal(
      {
        title: props.ip + t('operation.cjzts'),
        footer: false,
        width: 800,
        wrapClassName: 'modalBodyNopad',
        contentProps: {
          host_id: props.host_id,
        },
      },
      createVNode(collDetail),
    );
  };
</script>

<style scoped lang="less">
  .text {
    color: @primary-color;
    cursor: pointer;
  }
</style>
