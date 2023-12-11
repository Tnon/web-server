<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-29 11:15:06
 * @LastEditTime: 2023-08-16 18:30:52
-->
<template>
  <div>
    <uploader
      ref="uploaderRef"
      class="uploader-app"
      :options="initOptions"
      :auto-start="false"
      :key="token"
      @file-added="onFileAdded"
      @file-success="onFileSuccess"
      @file-progress="onFileProgress"
      @file-error="onFileError"
    >
      <!-- <uploader-list> -->
      <template #default>
        <!-- 不支持h5上传 start -->
        <uploader-unsupport />
        <!-- 不支持h5上传 end -->
        <!-- 上传按钮 start -->
        <uploader-btn ref="btnRef" :attrs="initOptions.attrs" />
        <!-- 上传按钮 end -->
      </template>
      <!-- </uploader-list> -->

      <!-- 单文件信息 end -->
    </uploader>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { Language } from '@/enums/language';
  import { useServerUpload } from '@/store/modules/server-upload';
  import { useUserToken } from '@/store/modules/user';
  import { getNavigatorLang } from '@/utils/tools';
  import { PropType, computed, nextTick, reactive, ref, unref } from 'vue';
  import { generateMD5 } from './md5';
  import { mergeChunks } from '@/api/operation/upgrade';
  import { message } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    validateMd5: {
      type: Number,
      required: true,
    },
    spinning: {
      type: Boolean,
      required: true,
    },
    uploadType: {
      type: String as PropType<'agent' | 'server'>,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    accept: {
      type: String,
      reqired: true,
    },
  });
  const emit = defineEmits(['update:validateMd5', 'uploadResult', 'update:spinning']);
  const { t } = useI18n();
  const userTokenStore = useUserToken();
  const serverUpload = useServerUpload();
  const token = computed(() => userTokenStore.token);
  const tokenType = computed(() => userTokenStore.tokenType);
  const headers = computed(() => ({
    Authorization: `${unref(tokenType)} ${unref(token)}`,
    'Local-Lan':
      userTokenStore.userLanguage === Language.DEFAULT
        ? getNavigatorLang()
        : userTokenStore.userLanguage,
  }));
  //上传实例
  const uploaderRef = ref();
  //配置
  const initOptions = reactive({
    target: props.target,
    singleFile: true,
    chunkSize: 20480000, //20M
    //并发上传数，默认 3。
    simultaneousUploads: 5,
    headers,
    fileParameterName: 'file',

    attrs: {
      accept: [props.accept],
    },
    maxChunkRetries: 5,
    // 是否开启服务器分片校验
    testChunks: true,
    //处理参数格式
    processParams: (params) => {
      return {
        chunk_number: params.chunkNumber,
        chunk_size: params.chunkSize,
        current_chunk_size: params.currentChunkSize,
        total_chunks: params.totalChunks,
        identifier: params.identifier,
        filename: params.filename,
      };
    },
    // 服务器分片校验函数，秒传及断点续传基础
    checkChunkUploadedByResponse: (chunk, message) => {
      let skip = false;
      let objMessage = JSON.parse(message);
      if (objMessage.is_uploaded) {
        skip = true;
      } else {
        if (objMessage.has_been_uploaded) {
          skip = objMessage.has_been_uploaded.split(',').indexOf(chunk.offset + 1 + '') >= 0;
        } else {
          skip = false;
        }
      }

      return skip;
    },
  });

  //添加文件
  const onFileAdded = async (file) => {
    if (props.uploadType === 'server' && file.size > 1024 * 1024 * 1024 * 2) {
      message.error(t('operation.plfjwgns'));
    } else if (props.uploadType === 'agent' && file.size > 1024 * 1024 * 1024 * 1.5) {
      message.error(t('operation.plfjwgnss'));
    } else {
      const md5 = await computeMD5(file);
      file.uniqueIdentifier = md5;
      file.resume();
    }
  };
  const computeMD5 = (file) => {
    if (!file.name.endsWith('.tar' + props.accept)) {
      message.error(
        props.uploadType === 'server' ? t('operation.plfjgns') : t('operation.plfjgna'),
      );
      // 暂停文件
      file.pause();
      return Promise.reject('');
    }

    // 暂停文件
    file.pause();
    // 开始计算MD5
    return new Promise((resolve, reject) => {
      generateMD5(file, {
        onProgress(currentChunk, chunks) {
          // 实时展示MD5的计算进度
          nextTick(() => {
            emit('update:validateMd5', parseInt((currentChunk / chunks) * 100 + ''));
          });
        },
        onSuccess(md5) {
          resolve(md5);
        },
        onError() {
          file.cancel();
          reject();
        },
      });
    });
  };
  //重新上传次数
  const retryNum = ref(0);
  //上传成功
  const onFileSuccess = async (_, file, response) => {
    const res = JSON.parse(response);
    //通知合并
    if (res.merge) {
      emit('update:spinning', true);
      const mergeRes = await mergeChunks(
        {
          identifier: file.uniqueIdentifier,
          filename: file.name,
        },
        props.uploadType === 'server' ? '/server/update/merge' : '/resource/pkg/merge',
      );
      emit('update:spinning', false);
      emit('uploadResult', mergeRes);
    } else {
      retryNum.value = retryNum.value + 1;
      if (retryNum.value < 10) {
        file.retry();
      }
    }
    serverUpload.initData(props.uploadType);
  };
  //上传进度
  const onFileProgress = (_, file, response) => {
    //平均速度
    serverUpload.SetServerSpeed(props.uploadType, parseInt(file.averageSpeed / 1024 / 1024 + ''));
    //百分比
    serverUpload.SetServerProgress(props.uploadType, file.progress() * 100);
    //剩余时间
    serverUpload.SetServertimeRemaining(props.uploadType, file.timeRemaining());
    //上传错误
    if (response.xhr.response) {
      const res = JSON.parse(response.xhr.response);
      if (res.code) {
        emit('uploadResult', res);
        serverUpload.initData(props.uploadType);
        file.cancel();
      }
    }
  };
  //上传失败
  const onFileError = (rootFile, file, response) => {
    emit('uploadResult', response);
    file.cancel();
    serverUpload.initData(props.uploadType);
  };
  //上传点击事件
  const btnRef = ref<any>();
  const uploadBtnClick = () => {
    unref(btnRef).$el.click();
  };

  defineExpose({ uploadBtnClick });
</script>

<style scoped lang="less">
  .uploader-app {
    .uploader-btn {
      display: none;
    }
  }
</style>
