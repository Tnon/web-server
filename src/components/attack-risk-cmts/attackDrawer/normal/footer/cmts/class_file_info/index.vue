<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-23 11:41:55
 * @LastEditTime: 2023-03-13 20:16:36
-->
<template>
  <div>
    <template v-for="(item, key) in dataSource" :key="key">
      <div class="formIt">
        <div class="label">{{ t(`arcomn.${key}Draw`) }}</div>

        <!-- 类文件信息文件下载 start -->
        <template v-if="key === 'class_file_url'">
          <get-file
            :getFileInfo="getFileInfo"
            :url="item"
            :fileName="dataSource!.class_name"
            :dataSource="dataSource"
            :fileStatus="dataSource!.class_file_status"
            :file_type="1"
            :file_md5="dataSource!.file_md5"
            :directory_name="dataSource!.class_loader"
            statusKeyName="class_file_status"
            urlKeyName="class_file_url"
            :source="1"
          />
        </template>
        <!-- 类文件信息文件下载 end -->

        <!-- 文件信息和类文件信息 获取文件 start -->
        <template v-else-if="key === 'class_file_status'">
          <file-status :status="item" />
        </template>
        <!-- 文件信息和类文件信息 获取文件 end -->

        <template v-else>
          <div class="value">{{ item }}</div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import getFile from '../file_info/cmts/getFile';
  import fileStatus from '../file_info/cmts/fileStatus';
  import { PropType } from 'vue';
  defineProps({
    dataSource: Object,
    getFileInfo: {
      type: Object as PropType<{
        detail_id: string;
        process_id?: string;
        mac: string;
        file_size: string;
      }>,
      required: true,
    },
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
