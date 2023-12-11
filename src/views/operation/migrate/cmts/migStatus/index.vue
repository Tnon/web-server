<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-18 10:17:41
 * @LastEditTime: 2022-09-01 12:46:42
-->
<template>
  <span :style="{ color }">{{ text }}</span>
</template>
<script lang="ts" setup>
  import { COLORS, MIGSTATUS } from '@/enums/pstatus';
  import { watchEffect, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    status: Number,
  });
  const { t } = useI18n();
  const text = ref<string>(''),
    color = ref<string>('');

  watchEffect(() => {
    text.value = '';
    color.value = '';
    switch (props.status) {
      // case MIGSTATUS.NOTMIG:
      //   text.value = '-';
      //   color.value = COLORS.NORMAL;
      //   break;
      case MIGSTATUS.SUCCESS:
        text.value = t('common.success');
        color.value = COLORS.SUCCESS;
        break;

      case MIGSTATUS.MANUAL:
        text.value = t('setting.succManMig');
        color.value = COLORS.SUCCESS;
        break;
      default:
        text.value = t('common.fail');
        color.value = COLORS.ERROR;
    }
  });
</script>
