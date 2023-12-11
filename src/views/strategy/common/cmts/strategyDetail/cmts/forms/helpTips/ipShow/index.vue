<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-29 19:01:44
 * @LastEditTime: 2022-12-29 19:10:25
-->
<template>
  <div class="container">
    <div class="item">
      <div class="label">{{ t('strategy.ljipyx') }}：</div>
      <div class="value">{{ t('strategy.ipux') }}</div>
    </div>
    <div class="item">
      <div class="label">{{ t('strategy.zdiipyx') }}：</div>
      <div class="value">{{ t('strategy.zdyipyx') }}</div>
    </div>
    <div class="item">
      <div class="label">{{ t('strategy.zdineyx') }}：</div>
      <div class="value">{{ t('strategy.wkyx') }}</div>
    </div>
    <div class="title">{{ t('strategy.mripgz') }}</div>
    <div>{{ t('strategy.mripgzone') }}</div>
    <div>{{ t('strategy.mripgztwo') }}</div>
    <div>{{ t('strategy.mripgzthree') }}</div>
    <div>{{ t('strategy.mripgzfour') }}</div>
    <div>{{ t('strategy.mripgzfive') }}</div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
</script>

<style scoped lang="less">
  .container {
    color: rgba(0, 0, 0, 0.8);
    padding: 8px;
  }
  .item {
    display: flex;
    align-items: center;
    margin: 4px 0;
    .label {
      font-weight: 600;
    }
  }
  .title {
    font-weight: 600;
    margin-top: 8px;
  }
</style>
