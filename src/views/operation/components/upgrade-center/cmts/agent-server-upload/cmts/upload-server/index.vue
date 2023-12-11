<template>
  <a-spin :tip="spinText" :spinning="spinning">
    <div class="uploadFile">
      <!-- 进度条 start -->
      <a-progress
        class="uploadprogre"
        :strokeWidth="2"
        :showInfo="false"
        strokeColor="#18ba79"
        :percent="uplpadPrg"
        v-if="uplpadPrg !== 0 && uplpadPrg !== 100"
        status="active"
      />
      <!-- 进度条 end -->
      <!-- 速度 start -->
      <div class="extraInfo" v-if="uplpadPrg !== 0 && uplpadPrg !== 100">
        <span class="speed">{{ speed + 'M/s' }}</span>
        <span class="timer">{{ t('operation.shyfhs') + formatSeconds(timeRemaining) }}</span>
      </div>
      <!-- 速度 end -->
      <!-- 系统logo start -->
      <img class="upicon" :src="serPkg" alt="" />
      <!-- 系统logo end -->
      <!-- 包信息 start -->
      <div class="pkginfo">
        <div class="uptitle">
          {{ t('operation.productserver') }}
        </div>
        <div class="version">
          {{ t('operation.agtvs') }}
          {{ packageMsg.version ? packageMsg.version : '-' }}
        </div>
        <div class="pubtime">
          {{ t('operation.pubtime') }}
          {{ packageMsg.release_at ? packageMsg.release_at : '-' }}
        </div>
        <div class="versions">
          <!-- 基础包版本 start -->
          <div class="upversion">
            <div class="label">
              {{ t('operation.baseServer') }}
            </div>
            <div class="vers">
              {{ packageMsg.base_pkg_version ? packageMsg.base_pkg_version : '-' }}
            </div>
          </div>
          <!-- 基础包版本 end -->
          <!-- 升级包版本 start -->
          <div class="upversion">
            <div class="label">
              {{ t('operation.upgpserver') }}
            </div>
            <div class="vers">
              {{ packageMsg.upgrade_pkg_version ? packageMsg.upgrade_pkg_version : '-' }}
            </div>
          </div>
          <!-- 升级包版本 end -->
        </div>
      </div>
      <!-- 包信息 end -->

      <div class="operation">
        <!-- 上传安装包 start -->
        <simpleUpload
          ref="simpleUploadRef"
          target="/server/update/upload"
          accept=".xz"
          upload-type="server"
          v-permission="{
            name: 'serverUpload',
            showUsers: [USERTOKEN.admin, USERTOKEN.super],
          }"
          v-model:validateMd5="validateMd5"
          v-model:spinning="spinning"
          @uploadResult="uploadResult"
        >
          <a-button
            type="primary"
            @click="triggerUpload"
            class="upbtn"
            :loading="(uplpadPrg !== 0 && uplpadPrg !== 100) || packageMsg.is_merge"
          >
            {{ packageMsg.is_merge ? t('operation.mergeing') : t('operation.updPkg') }}
          </a-button>
        </simpleUpload>
        <!-- 上传安装包 end -->
        <!-- 安装包删除 start -->
        <a-button
          type="text"
          :disabled="(uplpadPrg !== 0 && uplpadPrg !== 100) || !packageMsg.version"
          @click="deletePackage"
          v-permission="{
            name: 'serverDelete',
            showUsers: [USERTOKEN.admin, USERTOKEN.super],
          }"
        >
          <template #icon><delete-outlined /></template>
          {{ t('operation.delete') }}
        </a-button>
        <!-- 安装包删除 end -->
      </div>
    </div>
  </a-spin>
</template>
<script lang="ts" setup>
  import { createVNode, PropType, ref, unref, watch, computed } from 'vue';
  import { DeleteOutlined } from '@ant-design/icons-vue';
  import { deleteServer } from '@/api/operation/upgrade';
  import serPkg from '@/assets/images/ser_pkg.png';
  import { useI18n } from 'vue-i18n';
  import { pwdConfirm } from '@/components/pwdConfirm';
  import { useModal, useValidatePwd } from '@/hooks';
  import { ServerPackageState } from '../../type';
  import { USERTOKEN } from '@/store/modules/user/type';
  import simpleUpload from '@/components/simple-upload';
  import { message } from 'ant-design-vue';
  import { useServerUpload } from '@/store/modules/server-upload';
  import { formatSeconds } from '@/utils/tools';
  defineProps({
    packageMsg: {
      type: Object as PropType<Partial<ServerPackageState>>,
      required: true,
    },
  });
  const serverUpload = useServerUpload();
  const emit = defineEmits(['refreshCmt']);
  const { t } = useI18n();
  //上传组件
  const simpleUploadRef = ref();
  //spining
  const spinning = ref<boolean>(false);
  //spining文案
  const spinText = ref('');
  //上传进度
  // const uplpadPrg = ref<number>(0);
  const uplpadPrg = computed(() => serverUpload.server.progress);
  //上传速度
  const speed = computed(() => serverUpload.server.speed);
  //校验MD5百分比
  const validateMd5 = ref<number>(0);
  //剩余时间（秒）
  const timeRemaining = computed(() => serverUpload.server.timeRemaining);
  //上传完成
  const uploadResult = (result) => {
    if (!result.code) {
      emit('refreshCmt');
    } else {
      message.error(result.msg || t('setting.uploadError'));
    }
  };
  //监听md5
  watch(validateMd5, (v) => {
    if (v === 100 || v === 0) {
      spinning.value = false;
      spinText.value = '';
    } else {
      spinText.value = t('setting.pasingmd5') + v + '%';
      spinning.value = true;
    }
  });
  //触发上传
  const triggerUpload = () => {
    unref(simpleUploadRef).uploadBtnClick();
  };
  const refreshCmt = (boolean) => {
    emit('refreshCmt', boolean);
  };
  //安装包删除
  const deletePackage = async () => {
    useModal(
      {
        title: t('operation.cfmpwdtitledel'),
        handleOk: async (conRef) => {
          await conRef.validate();
          return useValidatePwd(deleteServer, {}, conRef, refreshCmt, true);
        },
      },
      createVNode(pwdConfirm),
    );
  };
</script>
<style lang="less" scoped>
  .uploadFile {
    border-radius: 8px;
    border: 1px solid #eeeeee;
    display: flex;
    align-items: flex-start;
    padding: 24px;
    position: relative;
    .pkginfo {
      flex: 1;
      .uptitle {
        font-size: @fz14;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        margin-bottom: 4px;
      }
      .version {
        font-size: @fz12;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
      }
      .pubtime {
        font-size: @fz12;
        color: rgba(0, 0, 0, 0.4);
        margin: 4px 0 16px 0;
      }
    }
    .operation {
      display: flex;
      flex-direction: column;
    }
    .versions {
      display: flex;
      justify-content: space-between;
      .upversion {
        .label {
          font-size: @fz12;
          color: rgba(0, 0, 0, 0.4);
          margin-bottom: 4px;
        }
        .vers {
          font-size: @fz12;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }

    .upicon {
      margin-right: 24px;
      cursor: pointer;
      width: 48px;
      height: 48px;
    }
    .upbtn {
      margin-bottom: 8px;
    }
  }
  .uploadprogre {
    position: absolute;
    bottom: -8px;
    left: 0;
  }
  .extraInfo {
    position: absolute;
    bottom: 10px;
    right: 16px;
    color: rgba(0, 0, 0, 0.8);
    font-size: @fz12;
    .speed {
      margin-right: 16px;
    }
  }

  .nodes {
    padding: 0 16px;
    line-height: 30px;
    font-size: @fz12;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
  .notallow {
    cursor: not-allowed;
    color: rgba(0, 0, 0, 0.5);
  }
</style>
