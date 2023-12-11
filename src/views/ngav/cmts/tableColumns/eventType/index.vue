<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-20 15:01:37
 * @LastEditTime: 2022-12-16 11:16:42
-->
<template>
  <div class="eventType tdAbsolute" :class="[classNm]">
    <img class="icon" :src="iconName" />
    <div class="title">{{ typeName }}</div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { getHandledStatus } from '.';
  const props = defineProps({
    handled: {
      type: Number,
      required: true,
    },
  });
  const { t } = useI18n();
  // 文案
  const typeName = ref(''),
    // 类名
    classNm = ref(''),
    // 图标类型
    iconName = ref('');
  watchEffect(() => {
    const { text, className, iconType } = getHandledStatus(props.handled, t);
    typeName.value = text;
    classNm.value = className;
    iconName.value = iconType;
  });
</script>

<style scoped lang="less">
  .eventType {
    align-items: center;
    .icon {
      width: 32px;
      height: 32px;
    }
    .title {
      font-size: @fz12;
      font-weight: 500;
    }
  }
  .primary {
    background: linear-gradient(270deg, rgba(24, 186, 121, 0) 0%, rgba(24, 186, 121, 0.2) 100%);
    color: #18ba79;
  }
  .warning {
    background: linear-gradient(270deg, rgba(246, 200, 77, 0) 0%, rgba(246, 200, 77, 0.22) 100%);
    color: #f6c84d;
  }
</style>
