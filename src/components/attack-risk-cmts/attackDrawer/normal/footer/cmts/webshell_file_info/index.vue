<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-23 11:41:55
 * @LastEditTime: 2023-01-11 15:52:55
-->
<template>
  <div>
    <template v-for="(item, key) in dataSource" :key="key">
      <div class="formIt">
        <div class="label">{{ t(`arcomn.${key}Draw`) }}</div>

        <!-- 类文件信息文件下载 start -->
        <template v-if="key === 'file_url'">
          <div class="value downlink" @click="downloadFile">{{ dataSource!.file_name }}</div>
        </template>
        <!-- 类文件信息文件下载 end -->
        <template v-else>
          <div class="value">{{ item }}</div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { exportReportExcel } from '@/utils/tools';
  const props = defineProps({
    dataSource: Object,
  });
  const { t } = useI18n();

  const downloadFile = () => {
    //下载文件
    props.dataSource!.file_url &&
      exportReportExcel(props.dataSource!.file_url!, props.dataSource!.file_name);
  };
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
  .downlink {
    cursor: pointer;
    color: @primary-color;
  }
</style>
