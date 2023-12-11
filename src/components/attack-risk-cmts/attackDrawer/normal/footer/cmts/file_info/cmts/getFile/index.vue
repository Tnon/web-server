<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-23 14:36:54
 * @LastEditTime: 2023-03-13 20:18:23
-->
<template>
  <div class="item">
    <div class="text">{{ fileName }} </div>
    <div class="download" @click="downloadOrGetFile">{{ textInfo.text }}</div>
  </div>
</template>

<script setup lang="ts">
  import { onUnmounted, PropType, reactive, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { getFileStatus } from '.';
  import { getFileApi, getFinalFileStatus } from '@/api/attack_risk';
  import { exportReportExcel } from '@/utils/tools';
  const props = defineProps({
    fileName: {
      type: String,
      required: true,
    },
    fileStatus: Number,
    dataSource: Object,
    getFileInfo: {
      type: Object as PropType<{
        detail_id: string | number;
        process_id?: string;
        mac: string;
        file_size: string;
      }>,
      required: true,
    },
    url: String,
    file_type: Number,
    directory_name: String,
    statusKeyName: String,
    urlKeyName: String,
    source: Number, //1告警 2事件
    file_md5: String,
  });
  const { t } = useI18n();
  const textInfo = reactive({
    text: '',
    canDownload: true,
    downloadFile: true,
  });
  watchEffect(() => {
    Object.assign(textInfo, getFileStatus(props.fileStatus, t));
  });
  let timer: any = 0;
  //s轮训获取文件状态
  const setintervalGetFileStatus = () => {
    timer = setInterval(async () => {
      const { file_status, file_url, code } = await getFinalFileStatus({
        detail_id: props.getFileInfo.detail_id + '',
        file_type: props.file_type!,
        source: props.source,
      });
      if (code) {
        clearInterval(timer);
      } else {
        props.dataSource![props.statusKeyName!] = file_status;
        if (file_status >= 3) {
          if (file_status === 3) {
            props.dataSource![props.urlKeyName!] = file_url;
          }
          clearInterval(timer);
        }
      }
    }, 1000);
  };
  //获取还是下载文件
  const downloadOrGetFile = async () => {
    if (textInfo.canDownload) {
      if (textInfo.downloadFile) {
        //下载文件
        props.dataSource![props.urlKeyName!] &&
          exportReportExcel(props.dataSource![props.urlKeyName!], props.fileName);
      } else {
        //获取状态
        const { code } = await getFileApi({
          detail_id: props.getFileInfo.detail_id + '',
          process_id: props.getFileInfo.process_id + '',
          mac: props.getFileInfo.mac,
          file_type: props.file_type!, //文件信息2 类文件1
          file_size: props.getFileInfo.file_size,
          directory_name: props.directory_name!,
          file_name: props.fileName,
          file_md5: props.file_md5,
        });
        if (props.dataSource![props.statusKeyName!] !== undefined) {
          if (!code) {
            if (props.dataSource) {
              props.dataSource![props.statusKeyName!] = 1; //模拟获取中
            }
          }
        }
        if (!code) {
          // 开始轮训获取文件的状态
          setintervalGetFileStatus();
        }
      }
    }
  };
  // };
  onUnmounted(() => {
    clearInterval(timer);
  });
</script>

<style scoped lang="less">
  .item {
    display: flex;
    align-items: center;
    .text {
      margin-right: 16px;
      max-width: 400px;
      word-break: break-all;
    }
    .download {
      cursor: pointer;
      color: @primary-color;
    }
  }
</style>
