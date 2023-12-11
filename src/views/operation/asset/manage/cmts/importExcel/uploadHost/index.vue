<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-10-28 09:57:22
 * @LastEditTime: 2021-12-21 11:56:19
-->
<template>
  <div
    :class="
      uploadStatus === ResultStatus.SUCCESS || uploadStatus === ResultStatus.UPLOADING
        ? 'successColor'
        : uploadStatus === ResultStatus.FAIL
        ? 'failColor'
        : uploadStatus === ResultStatus.SOME
        ? 'someColor'
        : ''
    "
  >
    <!-- 未上传 start -->
    <div class="uploadCnt" v-if="uploadStatus === ResultStatus.INIT">
      <!-- 上传文件 start -->
      <upload-file accept=".xlsx" :beforeUpload="beforeUpload">
        <span class="upFile">{{ fileName ?? t('asset.uploadFile') }}</span>
      </upload-file>
      <!-- 上传文件 end -->
      <!-- 上传按钮 start -->
      <a-button type="primary" @click="handleUpload" :disabled="!fileName">
        {{ t('common.imtHost') }}
      </a-button>
      <!-- 上传按钮 end -->
    </div>
    <!-- 未上传 end -->
    <!-- 已上传 start -->
    <div class="upStatus" v-else>
      <div class="upLeft" v-if="uploadStatus !== ResultStatus.UPLOADING">
        <!-- <CheckCircleOutlined  class="reusltIcon" /> -->
        <component :is="iconMap.get(uploadStatus)" class="reusltIcon" />
        <div>
          <div class="title">
            <span v-if="uploadStatus === ResultStatus.SUCCESS">
              <!-- 导入成功 -->
              {{ t('asset.iptSuc') }}
            </span>
            <!-- 导入失败 -->
            <span v-else-if="uploadStatus === ResultStatus.FAIL">
              {{ t('asset.iptFail') }}
            </span>
            <!-- 部分成功 -->
            <span v-else>{{ t('asset.partSuc') }}</span>
          </div>
          <!-- 导入结果记录 -->
          <div class="message">{{ message }}</div>
        </div>
      </div>
      <div v-else class="upLeft">
        <!-- 导入中。。。 -->
        <component :is="iconMap.get(uploadStatus)" class="reusltIcon" />
        {{ t('asset.imping') }}
      </div>
      <div class="upRight">
        <!-- 勿关闭弹窗 -->
        <span v-if="uploadStatus === ResultStatus.UPLOADING" class="Noclose">
          {{ t('asset.dcMod') }}
        </span>
        <!-- 下载日志 -->
        <a-button type="text" @click="downloadLog" v-else>
          {{ t('asset.dldLog') }}
        </a-button>
      </div>
    </div>
    <!-- 已上传 end -->
  </div>
</template>

<script lang="ts" setup>
  import uploadFile, { FileItem } from '@/components/upload-file';
  import { reactive, ref, toRefs, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { ResultStatus, iconMap } from './index';
  import { message as Message } from 'ant-design-vue';
  import { uploadHostXls } from '@/api/asset/hostInfo/host';
  import { exportLog } from '@/utils/tools';

  const { t } = useI18n();
  const props = defineProps({
    mode: String,
    refreshAll: Function,
  });
  // const uploadStatus = ref<ResultStatus>(ResultStatus.INIT)
  //结果message
  const resultState = reactive<{
    message: string;
    log_id: number;
    uploadStatus: ResultStatus;
  }>({
    message: '',
    log_id: 0,
    uploadStatus: ResultStatus.INIT,
  });
  //获取上传文件名
  const fileName = ref<string | null>(null);
  //存储上传的文件
  const hostFile = ref<FileItem>();
  //上传前的钩子
  const beforeUpload = (file): boolean | Promise<any> => {
    if (file.size / 1024 / 1024 > 10) {
      Message.error(t('asset.excSize'));
    } else {
      hostFile.value = file;
      fileName.value = file.name;
    }
    return false;
  };
  //上传
  const handleUpload = async () => {
    resultState.uploadStatus = ResultStatus.UPLOADING;
    const formData = new FormData();
    formData.append('file', hostFile.value as any);
    formData.append('mode', props.mode!);
    try {
      const { code, status: uploadStatus, ...other } = await uploadHostXls(formData as any);
      if (code) {
        resultState.uploadStatus = ResultStatus.INIT;
        hostFile.value = undefined;
        fileName.value = null;
      } else {
        Object.assign(resultState, other, { uploadStatus });
        props.refreshAll!();
      }
    } catch {
      // 导入失败 500
      resultState.uploadStatus = ResultStatus.INIT;
      hostFile.value = undefined;
      fileName.value = null;
    }
  };

  const { message, log_id, uploadStatus } = toRefs(resultState);
  //下载日志
  const downloadLog = () => {
    exportLog('/api/asset/host/downloadimportlog/' + unref(log_id));
  };
</script>

<style scoped lang="less">
  .successColor {
    color: #18ba79;
  }
  .failColor {
    color: @danger-color;
  }
  .someColor {
    color: @warn-color;
  }
  .uploadCnt {
    .upFile {
      cursor: pointer;
      color: #18ba79;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 16px;
    background: #f8f8f8;
    border-radius: 8px;
  }
  .upStatus {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: 68px;
    background: #f8f8f8;
    border-radius: 8px;
    .upLeft {
      display: flex;
      align-items: center;
      .reusltIcon {
        font-size: @fz22;
        margin-right: 8px;
      }
      .title {
        font-size: @fz12;
        font-weight: 600;
        margin-bottom: 4px;
      }
      .message {
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.4);
      }
    }
    .Noclose {
      color: rgba(0, 0, 0, 0.6);
    }
  }
</style>
