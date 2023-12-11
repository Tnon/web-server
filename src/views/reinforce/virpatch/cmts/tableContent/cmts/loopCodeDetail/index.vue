<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-05-08 16:29:53
 * @LastEditTime: 2023-11-01 13:46:13
-->
<template>
  <div class="code" @click="openDetail">{{ showTitle }} </div>
</template>

<script setup lang="ts">
  import { Language } from '@/enums/language';
  import useCreatDraw from '@/hooks/use-click-row';
  import { useUserToken } from '@/store/modules/user';
  import draw from '@/views/hostAsset/views/assetRisk/draw';
  import { computed } from 'vue';

  const props = defineProps<{
    drawTitle: string;
    showTitle: string;
    record: {
      vul_id: string;
    };
  }>();
  // 当前系统语言
  const userTokenStore = useUserToken();
  const currentLang = computed(() => userTokenStore.userLanguage);
  const openDetail = () => {
    props.showTitle &&
      props.showTitle !== '-' &&
      useCreatDraw(
        {
          // 英文模式下不显示漏洞名称
          title: currentLang.value === Language.EN ? '' : props.drawTitle!,
          contentProps: {
            record: props.record,
          },
        },
        draw,
      );
  };
</script>

<style scoped lang="less">
  .code {
    cursor: pointer;
    color: @primary-color;
  }
</style>
