<template>
  <a-upload :showUploadList="false" :headers="headers">
    <slot></slot>
  </a-upload>
</template>
<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { useUserToken } from '@/store/modules/user';
  import { Language } from '@/enums/language';
  import { getNavigatorLang } from '@/utils/tools';
  defineProps({} as any);
  const userTokenStore = useUserToken();
  const token = computed(() => userTokenStore.token);
  const tokenType = computed(() => userTokenStore.tokenType);
  // 内部含有响应式数据，需使用computed
  const headers = computed(() => ({
    Authorization: `${unref(tokenType)} ${unref(token)}`,
    'Local-Lan':
      userTokenStore.userLanguage === Language.DEFAULT
        ? getNavigatorLang()
        : userTokenStore.userLanguage,
  }));
  // 修改前数据
  // const headers = {
  //   Authorization: `${unref(tokenType)} ${unref(token)}`,
  //   'Local-Lan':
  //     userTokenStore.userLanguage === Language.DEFAULT
  //       ? getNavigatorLang()
  //       : userTokenStore.userLanguage,
  // };
</script>
