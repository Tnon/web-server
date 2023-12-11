<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-20 10:30:41
 * @LastEditTime: 2022-12-20 10:38:50
-->
<template>
  <div>
    <a-popover placement="bottom" destroyTooltipOnHide>
      <template #content>
        <div class="cnt">
          {{ t('operation.lpbz') }}
        </div>
      </template>
      <warning-filled class="iconWarning" />
    </a-popover>
  </div>
</template>

<script setup lang="ts">
  import { WarningFilled } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .cnt {
    width: 200px;
  }
  .iconWarning {
    color: @danger-color;
  }
</style>
