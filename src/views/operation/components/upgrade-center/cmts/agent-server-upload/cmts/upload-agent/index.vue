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
      <img @click="jumpDetail" class="upicon" :src="linPkg" />
      <!-- 系统logo end -->
      <!-- 包信息 start -->
      <div class="pkginfo">
        <div class="uptitle">
          {{ t('operation.productsystem') }}
        </div>
        <div class="version">
          {{ t('operation.agtvs') }}
          {{ packageMsg.package_version ? packageMsg.package_version : '-' }}
        </div>
        <div class="pubtime">
          {{ t('operation.pubtime') }}
          {{ packageMsg.created_at ? packageMsg.created_at : '-' }}
        </div>
        <div class="versions">
          <!-- Agent版本 start -->
          <div class="upversion">
            <div class="label">
              {{ t('operation.agtMver') }}
            </div>
            <div class="vers">
              {{ packageMsg.agent_version ? packageMsg.agent_version : '-' }}
            </div>
          </div>
          <!-- Agent版本 end -->
          <!-- 安全驱动版本 start -->
          <div class="upversion">
            <div class="label">
              {{ t('operation.driver_upgraded_status') }}
            </div>
            <div class="vers">
              {{ packageMsg.driver_version ? packageMsg.driver_version : '-' }}
            </div>
          </div>
          <!-- 安全驱动版本 end -->
        </div>
      </div>
      <!-- 包信息 end -->

      <div class="operation">
        <!-- 上传安装包 start -->
        <!-- <upload-file
          action="/resource/pkg/agent"
          :data="uploadData"
          @change="handleChange"
          accept=".gz"
          v-permission="{
            name: 'agentUpload',
            showUsers: [USERTOKEN.admin, USERTOKEN.super],
          }"
        >
          <a-button type="primary" class="upbtn" :loading="uplpadPrg !== 0 && uplpadPrg !== 100">
            {{ t('operation.updPkg') }}
          </a-button>
        </upload-file> -->
        <!-- 上传安装包 end -->
        <!-- 上传安装包 start -->
        <simpleUpload
          ref="simpleUploadRef"
          target="/resource/pkg/upload"
          accept=".gz"
          upload-type="agent"
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
        <!-- 版本撤回 start -->
        <a-button
          type="text"
          v-permission="{
            name: 'agentBack',
            showUsers: [USERTOKEN.admin, USERTOKEN.super],
          }"
          :disabled="(uplpadPrg !== 0 && uplpadPrg !== 100) || !packageMsg.enable_recall"
          @click="recallVersion(packageMsg.enable_recall)"
        >
          <template #icon><rollback-outlined /></template>
          {{ t('operation.back') }}
        </a-button>
        <!-- 版本撤回 end -->
      </div>
    </div>
  </a-spin>
</template>
<script lang="ts" setup>
  import { computed, createVNode, PropType, ref, unref, watch } from 'vue';
  import { RollbackOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { recallAgent } from '@/api/operation/upgrade';
  import linPkg from '@/assets/images/lin_pkg.png';
  import { useI18n } from 'vue-i18n';
  import { OSTYPE } from '@/enums/assetsType';
  import { pwdConfirm } from '@/components/pwdConfirm';
  import { useModal, useValidatePwd } from '@/hooks';
  import { PackageState } from '../../type';
  import { USERTOKEN } from '@/store/modules/user/type';
  import { useServerUpload } from '@/store/modules/server-upload';
  import simpleUpload from '@/components/simple-upload';
  import { formatSeconds } from '@/utils/tools';
  const props = defineProps({
    packageMsg: {
      type: Object as PropType<Partial<PackageState>>,
      required: true,
    },
    closeModal: Function,
  });
  const serverUpload = useServerUpload();
  const emit = defineEmits(['refreshCmt']);
  //spining文案
  const spinText = ref('');
  const { t } = useI18n();
  //上传组件
  const simpleUploadRef = ref();
  //spining
  const spinning = ref<boolean>(false);
  //上传进度
  // const uplpadPrg = ref<number>(0);
  const uplpadPrg = computed(() => serverUpload.agent.progress);
  //上传速度
  const speed = computed(() => serverUpload.agent.speed);
  //校验MD5百分比
  const validateMd5 = ref<number>(0);
  //剩余时间（秒）
  const timeRemaining = computed(() => serverUpload.agent.timeRemaining);
  const router = useRouter();
  const jumpDetail = () => {
    router.push({
      name: 'adaptation',
    });
    props.closeModal!();
  };
  //上传附带参数
  // const uploadData = {
  //   osver: OSTYPE.LINUX,
  //   file_type: UPCLIPKGTYPE.AGENT, //1代表agent 2代表特征库
  // };
  // //上传完成
  // const handleChange = (info: FileInfo & Event) => {
  //   //百分比
  //   uplpadPrg.value = Math.floor(info.file.percent as number);
  //   //上传进度到90开始解析
  //   if (uplpadPrg.value >= 98) {
  //     spinning.value = true;
  //   }
  //   //解析完成/上传错误
  //   if (info.file.status === 'done' || info.file.status === 'error') {
  //     spinning.value = false;
  //   }
  //   //上传接口失败
  //   if (info.file.status === 'error') {
  //     message.error(t('common.serverError'));
  //   }
  //   if (info.file.response) {
  //     if (info.file.response.code) {
  //       message.error(info.file.response.msg || t('setting.uploadError'));
  //     } else {
  //       message.success(t('setting.uploadSuc'));
  //       emit('refreshCmt');
  //     }
  //   }
  // };
  //上传完成
  const uploadResult = (result) => {
    if (!result.code) {
      emit('refreshCmt');
    } else {
      message.error(result.msg || t('setting.uploadError'));
    }
  };
  const refreshCmt = (boolean) => {
    emit('refreshCmt', boolean);
  };
  //触发上传
  const triggerUpload = () => {
    unref(simpleUploadRef).uploadBtnClick();
  };
  //版本撤回
  const recallVersion = async (boolean) => {
    if (!boolean) {
      return;
    }
    useModal(
      {
        title: t('operation.cfmpwdtitle'),
        handleOk: async (conRef) => {
          await conRef.validate();
          return useValidatePwd(
            recallAgent,
            {
              osver: OSTYPE.LINUX,
            },
            conRef,
            refreshCmt,
            true,
          );
        },
      },
      createVNode(pwdConfirm),
    );
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
