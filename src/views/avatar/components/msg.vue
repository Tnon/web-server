<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-16 15:14:00
 * @LastEditTime: 2023-01-12 11:54:43
-->
<template>
  <div>
    <div class="header">{{ t('setting.perInfo') }}</div>
    <upload-file action="storage/avatar" :beforeUpload="beforeUpload" @change="handleChange">
      <a-avatar class="avatarCOn" :src="avatatUrl">
        <template #icon><showAvatar :name="userInfo.name!" /></template>
      </a-avatar>
    </upload-file>

    <div class="fitem">
      <div class="label">{{ t('user.name') }}</div>
      <div class="value">{{ userInfo.name }}</div>
    </div>
    <div class="fitem">
      <div class="label">{{ t('user.loginEmail') }}</div>
      <div class="value">{{ userInfo.email }}</div>
      <EditOutlined class="editicon" @click="editMsg('email', userInfo.email)" />
    </div>
    <div class="fitem">
      <div class="label">{{ t('user.mobNum') }}</div>
      <div class="value">{{ userInfo.mobile }}</div>
      <EditOutlined class="editicon" @click="editMsg('mobile', userInfo.mobile)" />
    </div>
    <div class="fitem">
      <div class="label">{{ t('user.telNum') }}</div>
      <div class="value">{{ userInfo.telephone }}</div>
      <EditOutlined class="editicon" @click="editMsg('telephone', userInfo.telephone)" />
    </div>
    <div class="fitem">
      <div class="label">{{ t('report.creatTime') }}</div>
      <div class="value">{{ userInfo.created_at }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, unref } from 'vue';
  import { EditOutlined } from '@ant-design/icons-vue';
  import showAvatar from '@/components/showAvatar';
  import { message } from 'ant-design-vue';
  import { useModal } from '@/hooks';
  import uploadFile, { FileItem, FileInfo } from '@/components/upload-file';
  import { useUserToken } from '@/store/modules/user';
  import { isPng } from '@/utils/is';
  import modifyModal from './modifyModal';
  import { updateDeptApi, updateMobileApi, upadteTelphoneApi } from '@/api/user';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    avatatUrl: String,
    userInfo: {
      type: Object,
      required: true,
    },
  });
  const { t } = useI18n();
  const userTokenStore = useUserToken();
  //头像
  const editMsg = (type, content) => {
    let titleNext = '';
    switch (type) {
      case 'email':
        titleNext = t('user.loginEmail');
        break;
      case 'mobile':
        titleNext = t('user.mobNum');
        break;
      default:
        titleNext = t('user.telNum');
        break;
    }
    useModal(
      {
        title: t('common.modify') + titleNext,
        contentProps: {
          fields: reactive({
            [type]: content || '',
          }),
          type,
        },
        handleOk: async (conRef) => {
          await unref(conRef.formRef).validate();
          let params = {
            data: {
              [type]: conRef.fields[type],
              id: props.userInfo!.id,
            },
          };
          switch (type) {
            case 'email':
              // 修改邮箱名称
              const { email } = await updateDeptApi(params);
              props.userInfo!.email = email;
              break;
            case 'mobile':
              // 修改电话号码
              const { mobile } = await updateMobileApi(params);
              props.userInfo!.mobile = mobile;
              break;
            default:
              // 修改座机号码
              if (!conRef.fields[type]) {
                message.error(t('user.pIptMnum'));
                return;
              }
              const { telephone } = await upadteTelphoneApi(params);
              props.userInfo!.telephone = telephone;
              break;
          }
          userTokenStore.SetUserInfo(props.userInfo!);
        },
      },
      modifyModal,
    );
  };
  //上传之前校验
  const beforeUpload = (file: FileItem) => {
    if (isPng(file.name!)) {
      Promise.resolve(file);
    } else {
      message.error(t('setting.upLpng'));
      return false;
    }
  };
  //上传完成
  const handleChange = (info: FileInfo & Event) => {
    if (info.file.status === 'error') {
      message.error(t('setting.uploadError'));
    }
    if (info.file.status === 'done') {
      const { url: centerlogo } = info.file.response as any;
      userTokenStore.SetUserInfoAvatar(centerlogo);
    }
    if (info.file.response) {
      if (info.file.response.code) {
        message.error(info.file.response.msg || t('setting.uploadError'));
      } else {
        message.success(t('setting.uploadSuc'));
        const { url: centerlogo } = info.file.response as any;
        userTokenStore.SetUserInfoAvatar(centerlogo);
      }
    }
  };
</script>
<style lang="less" scoped>
  .header {
    height: 40px;
    line-height: 40px;
    font-weight: 800;
    font-size: @fz18;
    color: rgba(0, 0, 0, 0.8);
    letter-spacing: 0;
    text-align: justify;
    margin-bottom: 20px;
  }
  .avatarCOn {
    width: 60px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    &:hover {
      background: #000;
      opacity: 0.4;
    }
  }
  .fitem {
    margin: 30px 0;
    display: flex;
    .label {
      min-width: 150px;
      font-size: @fz12;
      color: #888;
    }
    .value {
      flex: 1;
    }
    .editicon {
      color: #00be2d;
      cursor: pointer;
      font-size: @fz18;
    }
  }
</style>
