<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-25 20:34:23
 * @LastEditTime: 2022-12-29 19:12:48
-->
<template>
  <div class="acl">
    <!-- 标题 start -->
    <div class="header">
      {{ t('operation.server') }}
    </div>
    <!-- 标题 end -->
    <div class="content">
      <!-- 副标题 start -->
      <div class="title">
        {{ t('setting.aclIp') }}
      </div>
      <!-- 副标题 end -->
      <!-- acl模式 start -->
      <a-radio-group v-model:value="aclValue" class="radioGroup">
        <a-radio :value="1" class="noacl crad">
          {{ t('setting.anyIP') }}
          <a-button type="primary" class="confirmBtn" v-show="aclValue === 1" @click="commit">
            {{ t('common.save') }}
          </a-button>
        </a-radio>
        <a-radio :value="2" class="noacl crad">{{ t('setting.onlyIP') }}</a-radio>
      </a-radio-group>
      <!-- acl模式 end -->
      <!-- 自定义ip显示 start -->
      <ip-address v-show="aclValue === 2" :clientIp="clientIp" v-model:ipAddreses="ipAddreses">
        <template #save>
          <a-button type="primary" @click="commit">
            {{ t('operation.saapp') }}
          </a-button>
        </template>
      </ip-address>
      <!-- 自定义ip显示 end -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';

  import { message } from 'ant-design-vue';
  import { updateIpControlApi, getIpControlApi } from '@/api/operation/safe';
  import ipAddress from './cmts/ipAddress';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  //登录ip
  const clientIp = ref('');
  //ip段
  const ipAddreses = ref<{ id?: number; ip_begin: string; ip_end: string }[]>([]);
  //acl控制方式
  const aclValue = ref<number>(1);
  // 获取ip地址段
  const getIPAddress = async () => {
    const { items, enabled, client_ip } = await getIpControlApi();
    ipAddreses.value = items;
    aclValue.value = enabled ? 2 : 1;
    clientIp.value = client_ip;
  };
  getIPAddress();
  // 保存可访问ip地址
  const commit = async () => {
    if (!ipAddreses.value.length && unref(aclValue) === 2) {
      message.error(t('setting.pAddIp'));
      return;
    }
    const enabled = unref(aclValue) !== 1;
    await updateIpControlApi({
      enabled,
      items: [...ipAddreses.value, { ip_begin: clientIp.value, ip_end: clientIp.value }],
    });
  };
</script>

<style lang="less" scoped>
  .acl {
    margin-bottom: 16px;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      line-height: 56px;
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
    }
    .content {
      position: relative;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      padding: 16px 24px;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: @fz14;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        margin-bottom: 24px;
      }
      .radioGroup {
        padding-left: 24px;
        .confirmBtn {
          margin-left: 16px;
        }
        .crad {
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.8);
          line-height: 20px;
          display: block;
        }
        .noacl {
          margin-bottom: 12px;
        }
      }
    }
  }
</style>
