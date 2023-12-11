<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-18 16:45:15
 * @LastEditTime: 2022-11-08 11:41:04
-->
<template>
  <div class="container">
    <div class="title">{{ t('asset.cbasic') }}</div>
    <template v-for="(item, key) in state" :key="key">
      <div class="node">
        <div class="label">{{ t(`asset.${key}label`) }}</div>
        <div class="val">{{ item }}</div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
  });
  const state = reactive({
    name: '',
    summary: '',
    version: '',
    is_exec: '',
    path: '',
    pid: '',
    service_name: '',
  });
  const getDetailData = async () => {
    for (let key in state) {
      state[key] = props.record[key];
    }
  };
  getDetailData();
</script>
<style lang="less" scoped>
  .node {
    display: inline-flex;
    width: 100%;
    margin-bottom: 16px;
    .label {
      font-weight: 500;
      flex: 100px 0 0;
    }
    .val {
      word-break: break-word;
    }
  }
  .title {
    margin-bottom: 16px;
    font-size: @fz16;
    font-weight: 500;
  }
</style>
