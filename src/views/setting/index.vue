<template>
  <div class="basicInfo">
    <a-row :gutter="16">
      <!-- 控制台logo start -->
      <a-col :span="12">
        <div class="controlLogo bk_br_sd">
          <div class="title">{{ t('setting.conLogo') }}</div>
          <!-- 上传图片 start -->
          <up-load-img />
          <!-- 上传图片 end -->
        </div>
      </a-col>
      <!-- 控制台logo end -->

      <!-- 登录页信息 start -->
      <a-col :span="12">
        <div class="logoInfo bk_br_sd">
          <div class="title">{{ t('setting.landMsg') }}</div>
          <!-- 表单信息 start -->
          <slots-form
            :colsMap="loginInfo"
            :formItemLayout="{}"
            class="loginForm"
            :fields="fields"
            ref="loginForm"
          />
          <!-- 表单信息 end -->
          <div class="commit">
            <a-button type="primary" @click="commit" :loading="saveLoading">
              {{ t('common.save') }}
            </a-button>
          </div>
        </div>
      </a-col>
      <!-- 登录页信息 end -->
    </a-row>

    <!-- 控制台信息 start -->
    <controlInfo />
    <!-- 控制台信息 end -->
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, unref } from 'vue';
  import { useLoginInfo } from './index';
  import slotsForm from '@/components/slots-form';
  import { upLoadImg } from './cmts/uploadImg';
  import { controlInfo } from './cmts/controlInfo';
  import { updateBasicInfoApi, getBasicInfoApi } from '@/api/product';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const loginInfo = useLoginInfo(t);
  //登录表单
  const loginForm = ref<any>(null);
  //字段
  const fields = reactive<{ name: string; support: string; contact: string }>({
    name: '',
    support: '',
    contact: '',
  });
  //交互
  const saveLoading = ref<boolean>(false);
  //提交
  const commit = async () => {
    try {
      await unref(loginForm).validate();
    } catch {
      return;
    }
    saveLoading.value = true;

    updateSysConfig();
  };

  // 修改登录页信息
  const updateSysConfig = () => {
    updateBasicInfoApi(fields).finally(() => {
      saveLoading.value = false;
    });
  };

  // 获取登录页信息
  const getBasicInfo = async () => {
    const formFields = await getBasicInfoApi();
    formFields && Object.assign(fields, formFields);
  };
  getBasicInfo();
</script>

<style lang="less" scoped>
  .basicInfo {
    margin: 16px;
    overflow: hidden;
    .controlLogo,
    .logoInfo {
      height: 300px;
      .title {
        height: 48px;
        font-size: @fz14;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        line-height: 48px;
        padding: 0 24px;
      }
      .commit {
        position: absolute;
        bottom: 16px;
        right: 24px;
      }
      ::v-deep(.ant-form-item-label) {
        width: 136px;
      }
    }
    .logoInfo {
      .loginForm {
        margin: 32px 0 28px 40px;
        ::v-deep(.ant-form-item-control) {
          line-height: 32px;
        }
        ::v-deep(.ant-input) {
          width: 280px;
          border-radius: 8px;
        }
        ::v-deep(.ant-form-item-label) {
          line-height: 32px;
          margin-right: 16px;
        }
      }
    }
  }
</style>
