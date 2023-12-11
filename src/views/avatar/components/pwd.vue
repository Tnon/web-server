<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-30 10:06:32
 * @LastEditTime: 2022-12-22 17:39:00
-->
<template>
  <div>
    <div class="header">{{ t('setting.pwdSeting') }}</div>
    <updatePwd ref="passwordForm" />
    <div style="float: right">
      <a-button type="primary" @click="commit">
        {{ t('common.confirm') }}
      </a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { updatePwd } from '@/components/updatePwd';
  import { setUserPasswordApi } from '@/api/operation/user';
  import { useUserToken } from '@/store/modules/user';
  import { pCompile } from '@/utils/urlUtils';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const userTokenStore = useUserToken();
  const passwordForm = ref<any>('');
  // 密码设置
  const commit = async () => {
    const { id } = userTokenStore.user_info;
    // if (u_src === UserType.LDAP) {
    //   message.error(t('user.ldapNoPwd'));
    //   return false;
    // }
    try {
      await unref(passwordForm).slotsForm.validate();
      const { code } = await setUserPasswordApi({
        chpwd: {
          new: pCompile(unref(passwordForm).fields.newPassword),
          old: pCompile(unref(passwordForm).fields.oldPassword),
        },
        id,
      });
      !code && unref(passwordForm).slotsForm.resetFields();
    } catch {
      return;
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
</style>
