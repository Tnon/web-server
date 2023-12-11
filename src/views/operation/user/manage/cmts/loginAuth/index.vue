<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-16 14:56:36
 * @LastEditTime: 2023-07-31 17:16:21
-->
<template>
  <div>
    <template v-if="u_src === UserType.Normal">
      <span class="node">{{ t('user.sysauth') }}</span>
    </template>
    <template v-else>
      <span class="node">{{ t('user.sysauth') }}</span>
      <span class="node">{{ t('user.ldapauth') }}</span>
    </template>
  </div>
</template>
<script setup lang="ts">
  import { UserType } from '@/store/modules/user/type';
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  defineProps({
    u_src: {
      type: Number as PropType<UserType>,
      required: true,
    },
  });
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .node {
    padding: 0 8px;
    border-radius: 2px;
    background-color: @primary-color;
    color: #fff;
    font-size: @fz12;
    display: inline-block;
    margin: 4px 0;
    min-width: 80px;
    text-align: center;
    margin-right: 4px;
  }
</style>
