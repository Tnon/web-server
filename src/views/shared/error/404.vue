<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2023-02-16 20:04:11
-->
<template>
  <div class="page-container">
    <div>
      <h1>404</h1>
      <h1>{{ t('common.oops') }}</h1>
      <router-link to="/" class="ant-btn ant-btn-primary">
        {{ t('common.backHome') }}
      </router-link>
    </div>
    <img src="../../../assets/404.gif" alt="" />
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
</script>

<style lang="less" scoped>
  .ant-btn {
    padding: 6px 15px !important;
    line-height: unset;
  }
  .page-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
</style>
