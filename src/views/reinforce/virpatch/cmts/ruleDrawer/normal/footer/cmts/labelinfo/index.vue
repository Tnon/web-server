<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-23 11:41:55
 * @LastEditTime: 2023-11-01 13:47:19
-->
<template>
  <div>
    <template v-for="(item, key) in dataSource" :key="key">
      <div class="formIt">
        <div class="label">{{ t(`arcomn.${key}Draw`) }}</div>
        <div class="value">
          <template v-if="key === 'cve_code'">
            <loopCodeDetail
              :drawTitle="record.vul_name"
              :showTitle="item"
              :record="{ vul_id: record.vul_id }"
            />
          </template>
          <template v-else>{{ item }} </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import loopCodeDetail from '@/views/reinforce/virpatch/cmts/tableContent/cmts/loopCodeDetail';
  import { useI18n } from 'vue-i18n';
  defineProps({
    dataSource: Object,
    record: Object as any,
  });
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .formIt {
    margin: 16px 0;
    font-size: @fz12;
    font-weight: 400;
    color: rgb(0 0 0 / 60%);
    display: flex;
    align-items: flex-start;

    .label {
      min-width: 138px;
      display: inline-block;
      color: rgb(0 0 0 / 90%);
    }

    .value {
      word-break: break-word;
    }
  }
</style>
