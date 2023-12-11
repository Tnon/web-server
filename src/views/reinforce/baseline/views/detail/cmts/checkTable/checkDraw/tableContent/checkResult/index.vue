<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-03-10 12:53:24
 * @LastEditTime: 2023-03-13 20:40:31
-->
<template>
  <div>
    <template v-if="type === E_Check_Result.Pass">
      <span class="success">{{ t('reinforce.pass') }}</span>
    </template>
    <template v-if="type === E_Check_Result.NoPass">
      <span class="error">{{ t('reinforce.npass') }}</span>
    </template>
    <template v-if="type === E_Check_Result.Error">
      <a-popover placement="bottomLeft" destroyTooltipOnHide>
        <template #content>
          {{ reason ?? '-' }}
        </template>
        <span class="error">{{ t('reinforce.passsb') }}</span>
      </a-popover>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { E_Check_Result } from './type';

  defineProps({
    type: {
      type: Number as PropType<E_Check_Result>,
      required: true,
    },
    reason: String,
  });
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .error {
    color: @danger-color;
  }
  .success {
    color: @primary-color;
  }
</style>
