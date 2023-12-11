<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-30 10:12:22
 * @LastEditTime: 2023-03-24 16:25:58
-->
<template>
  <div class="processDetail" v-if="nodeInfo.file_detail_info">
    <div class="header">{{ t('ngav.fildet') }}</div>
    <div class="content">
      <template v-for="(item, key) in nodeInfo.file_detail_info" :key="key">
        <div class="formIt">
          <div class="label">{{ t(`ngav.${key}Draw`) }}</div>
          <template v-if="key === 'file_url'">
            <!-- 文件下载 start -->
            <get-file
              :getFileInfo="{
                detail_id,
                process_id: nodeInfo.pid_detail_info!['pid'],
                mac: nodeInfo!['mac'],
                file_size: nodeInfo.file_detail_info!['file_size'],
              }"
              :dataSource="nodeInfo.file_detail_info"
              :url="item"
              :fileName="nodeInfo.file_detail_info!.file_name"
              :fileStatus="nodeInfo.file_detail_info!.file_status"
              :file_type="3"
              :file_md5="nodeInfo.file_detail_info!.file_md5"
              :directory_name="nodeInfo.file_detail_info!.directory_name"
              statusKeyName="file_status"
              urlKeyName="file_url"
              :source="2"
            />
            <!-- 文件下载 end -->
          </template>
          <!-- 文件信息文件下载 end -->
          <!-- 文件信息和类文件信息 获取文件 start -->
          <template v-else-if="key === 'file_status'">
            <!-- 文件状态 start -->
            <file-status :status="item" />
            <!-- 文件状态 end -->
          </template>
          <!-- 文件信息和类文件信息 获取文件 end -->
          <div class="value" v-else>{{ item }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { Node } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import getFile from '@/components/attack-risk-cmts/attackDrawer/normal/footer/cmts/file_info/cmts/getFile';
  import fileStatus from '@/components/attack-risk-cmts/attackDrawer/normal/footer/cmts/file_info/cmts/fileStatus';
  import { useI18n } from 'vue-i18n';
  defineProps({
    nodeInfo: {
      type: Object as PropType<Node>,
      required: true,
    },
    detail_id: {
      type: Number,
      required: true,
    },
  });
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .processDetail {
    margin: 0 -24px;
    .header {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 16px;
    }
    .content {
      margin-bottom: 32px;
      .formIt {
        display: flex;
        margin: 16px 0;
        .label {
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.8);
          flex: 130px 0 0;
        }
        .value {
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
  }
</style>
