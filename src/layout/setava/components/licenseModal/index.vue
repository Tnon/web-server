<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-26 18:33:41
 * @LastEditTime: 2023-08-16 10:42:14
-->
<template>
  <div>
    <!-- 版本信息 start -->
    <div class="version">
      <div class="logo">
        <a-image :src="logoUrl" :preview="false">
          <template #placeholder>
            <loading-outlined />
          </template>
        </a-image>
      </div>

      <div class="vername">
        <div class="name">{{ t('license.memProSys') }}</div>
        <div class="ver">{{ product_version }}</div>
      </div>
    </div>
    <!-- 版本信息 end -->
    <div class="cardcon">
      <!-- 授权状态 start -->
      <div class="licen">
        <custom-icon
          class="cion"
          :class="[authStatus.flag === 'Authorized' ? 'sucColor' : 'errColor']"
          type="#ax-authorization"
        />
        <div class="sket">{{ t('license.' + authStatus.status) }}</div>
      </div>
      <!-- 授权状态 end -->
      <div class="authStatus" v-if="authStatus.flag === 'Authorized'">
        <!-- 授权剩余 start -->
        <div class="dayrm">
          <template v-if="isNumber(authDays)">
            <div class="label">{{ t('license.sysqqx') }}</div>
            <!-- 天数统计 start -->
            <div class="static">
              <div class="fr">{{ authStatus.flag === 'Authorized' ? dayrm : '-' }}</div>
              <div class="total">/ {{ authDays }}{{ t('license.days') }}</div>
            </div>
            <!-- 天数统计 end -->
          </template>
          <template v-else>
            <div class="label">{{ t('license.' + authDays) }}</div>
          </template>
        </div>
        <!-- 授权剩余 end -->

        <!-- 台数剩余 start -->
        <div class="dayrm">
          <div class="label">{{ t('license.suzdd') }}</div>
          <!-- 天数统计 start -->
          <div class="static">
            <div class="fr">{{ authStatus.flag === 'Authorized' ? numbSurplus : '-' }}</div>
            <div class="total">/ {{ authNum }}{{ t('setting.agtUil') }}</div>
          </div>
          <!-- 天数统计 end -->
        </div>
        <!-- 台数剩余 end -->
      </div>

      <!-- 详情 start -->
      <div class="detail">
        <!-- 服务器id start -->
        <div class="header">
          {{ t('license.serverID') }}
        </div>
        <div class="content">
          <span class="id">{{ serverId }}</span>
          <span class="copy" @click="copy"><copy-outlined /></span>
        </div>
        <!-- 服务器id end -->
      </div>
      <!-- 详情 end -->
    </div>
    <div class="line"></div>
    <div class="upd">{{ t('license.updaAuth') }}</div>
    <div class="updsub">{{ t('license.updaAuthsub') }}</div>
    <!-- 选文件和上传 start -->
    <div class="btns">
      <upload-file accept=".lic" :beforeUpload="beforeUpload" class="fileInput">
        <a-input type="text" readonly v-model:value.trim="fileName">
          <template #suffix>
            <template v-if="!fileName">
              <span class="selef">
                {{ t('license.seleFile') }}
              </span>
            </template>
            <template v-else>
              <span class="delFile" @click.stop="delFile">
                <DeleteOutlined />
              </span>
            </template>
          </template>
        </a-input>
      </upload-file>

      <a-button class="updlics" :loading="uploading" @click="handleUpload" :disabled="!fileName">
        {{ t('license.updaAuth') }}
      </a-button>
    </div>
    <!-- 选文件和上传 end -->
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useLicense } from '@/store/modules/license-auth';
  import { useI18n } from 'vue-i18n';
  import { isNumber } from 'lodash';
  import { CopyOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import useClipboard from 'vue-clipboard3';
  import { message } from 'ant-design-vue';
  import uploadFile, { FileItem } from '@/components/upload-file';
  import { uoloadLicense } from '@/api/system';
  import { useProductLogo } from '@/store/modules/product-logo';
  const { t } = useI18n();
  const licenseStore = useLicense(),
    produceStore = useProductLogo();
  //授权状态
  const authStatus = computed(() => licenseStore.authStatus);
  //剩余天数
  const dayrm = computed(() => licenseStore.lic_rmday);
  // const dayrm = ref(120);
  //版本
  const product_version = computed(() => produceStore.productVersion);
  const logoUrl = computed(() => produceStore.logoUrl);
  //授权天数
  const authDays = computed(() => licenseStore.authDays);
  //授权台数
  const authNum = computed(() => licenseStore.authNum);
  //使用台数
  const numbSurplus = computed(() => licenseStore.numbSurplus);
  //服务器id
  const serverId = computed(() => licenseStore.servid);
  //复制
  const { toClipboard } = useClipboard();
  const copy = async () => {
    try {
      await toClipboard(serverId.value);
      message.success(t('setting.copClid'));
    } catch (e) {}
  };

  //上传状态
  const uploading = ref<boolean>(false);
  //获取上传文件名
  const fileName = ref<string>('');
  //存储上传的文件
  const licenseFile = ref<FileItem>();
  //上传前的钩子
  const beforeUpload = (file): boolean | Promise<any> => {
    if (file.name.endsWith('.lic')) {
      licenseFile.value = file;
      fileName.value = file.name;
    } else {
      message.error(t('message.puplicF'));
    }
    return false;
  };
  //上传
  const handleUpload = async () => {
    const formData = new FormData();
    uploading.value = true;
    formData.append('file', licenseFile.value as any);
    const { code } = await uoloadLicense(formData);
    uploading.value = false;
    if (!code) {
      //获取license
      await licenseStore.getLicense();
    }
    delFile();
  };
  //删除文件
  const delFile = () => {
    if (!uploading.value) {
      licenseFile.value = undefined;
      fileName.value = '';
    }
  };
</script>

<style scoped lang="less">
  .version {
    margin: 0 16px;
    background: #f8f8f8;
    display: flex;
    align-items: center;
    border-radius: 10px 10px 0 0;
    padding: 16px;
    .logo {
      width: 40px;
      margin-right: 16px;
    }
    .vername {
      .name {
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 0px;
        margin-bottom: 2px;
        color: #000000;
      }
      .ver {
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .cardcon {
    position: relative;
    margin: 0 8px;
    min-height: 120px;
    background: linear-gradient(90deg, #1f2124 0%, #14161a 100%);
    border-radius: 16px;
    z-index: 2;
    padding: 16px;

    .licen {
      flex: 1;
      display: flex;
      align-items: center;
      .cion {
        font-size: 32px !important;
      }
      .sucColor {
        color: @primary-color;
      }
      .errColor {
        color: @danger-color;
      }
      .sket {
        font-size: @fz16;
        font-weight: 600;
        margin-left: 8px;
        color: #fff;
      }
    }
    .authStatus {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .dayrm {
        display: flex;
        flex-direction: column;
        padding: 16px 0;
        .label {
          font-size: @fz13;
          font-weight: 600;
          color: #ffffff;
        }
        .static {
          display: flex;
          align-items: baseline;
          font-size: @fz13;
          font-weight: normal;
          color: rgba(255, 255, 255, 0.55);
          .fr {
            font-size: @fz20;
            font-weight: 600;
            color: @primary-color;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .suc {
    color: @primary-color;
  }
  .err {
    color: @danger-color;
  }

  .detail {
    color: #fff;
    transition: all 0.3s;
    overflow: hidden;
    margin-top: 12px;
    .header {
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 8px;
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .id {
        word-break: break-word;
        margin-right: 16px;
      }
      .copy {
        cursor: pointer;
      }
    }
  }
  .btns {
    display: flex;
    align-items: center;
    margin: 16px;
    .fileInput {
      flex: 1;
      margin-right: 16px;
      :deep(.ant-upload) {
        width: 100%;
        .ant-input-affix-wrapper {
          border-radius: 8px;
          .selef {
            color: @primary-color;
            cursor: pointer;
          }
          .delFile {
            cursor: pointer;
            color: @warn-color;
          }
        }
      }
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.08);
    margin: 24px 16px 16px 16px;
  }
  .upd {
    font-size: @fz14;
    font-weight: 600;
    line-height: 24px;
    color: #000000;
    margin: 0 16px;
  }
  .updsub {
    font-size: @fz12;
    font-weight: normal;
    line-height: 16px;
    margin: 0 16px;
    color: rgba(0, 0, 0, 0.4);
    margin-top: 4px;
  }
</style>
