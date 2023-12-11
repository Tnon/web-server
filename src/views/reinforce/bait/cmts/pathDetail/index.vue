<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-03 18:34:28
 * @LastEditTime: 2023-08-07 11:19:14
-->
<template>
  <div class="node" v-if="exception_list && exception_list.length" @click="openDetail">
    {{ exception_list.length }}
  </div>
  <div v-else>0</div>
</template>

<script setup lang="ts">
  import { useModal } from '@/hooks';
  import { E_Ex_Code } from './type';
  import { useI18n } from 'vue-i18n';
  import detailContent from './cmts/detailContent';
  const props = defineProps<{
    exception_list: {
      ex_code: E_Ex_Code;
      path: string;
    }[];
    file_path: string;
  }>();
  const { t } = useI18n();
  const openDetail = () => {
    if (props.exception_list && props.exception_list.length) {
      useModal(
        {
          title: t('reinforce.smgdf', [props.file_path]),
          wrapClassName: 'modalBodyNopad',
          width: 800,
          contentProps: {
            exception_list: props.exception_list,
          },
          footer: false,
        },
        detailContent,
      );
    }
  };
</script>

<style scoped lang="less">
  .node {
    cursor: pointer;
    color: @primary-color;
  }
</style>
