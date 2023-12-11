<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-03-07 20:00:30
 * @LastEditTime: 2023-03-08 11:30:37
-->
<template>
  <div class="tag" :class="{ unhandle: type === 0, guidang: type === HANDLESTATUS.GUIDANG }">
    {{ t(`arcomn.${text}`) }}
  </div>
</template>
<script lang="ts" setup>
  import { ref, watchEffect } from 'vue';
  import { Pstatus } from '@/enums/pstatus';
  import { useI18n } from 'vue-i18n';
  import { HANDLESTATUS } from '@/enums/attack_risk';
  const props = defineProps({
    type: {
      type: Number,
      required: true,
    },
  });
  const { t } = useI18n();
  const text = ref<string>('');
  watchEffect(() => {
    text.value = Pstatus[props.type!];
  });
</script>
<style lang="less" scoped>
  .tag {
    display: inline-block;
    font-size: @fz12;
    // font-weight: 600;
    color: #ffffff;
    padding: 0px 8px;
    background: @primary-color;
    border-radius: 2px;
  }
  .unhandle {
    background: @danger-color;
  }
  .guidang {
    background: #aaa;
  }
</style>
