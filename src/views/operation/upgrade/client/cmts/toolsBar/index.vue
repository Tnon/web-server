<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2023-08-09 09:19:44
-->
<template>
  <div class="tools">
    <!-- 通过命令安装 start -->
    <a-button class="node" type="text" @click="pwdInstall">
      <ContainerOutlined />
      {{ t('operation.insByCmd') }}
    </a-button>
    <!-- 通过命令安装 end -->
    <!-- 下载地址 start -->
    <a-button class="node" type="text" @click="copy">
      <DatabaseOutlined />
      {{ t('operation.downUrl') }}
    </a-button>
    <!-- 下载地址 start -->
    <!-- 升级方式 start -->
    <!-- <a-popover
      destroyTooltipOnHide
      placement="bottomRight"
      @openChange="upgradeTypePopVisible"
      trigger="click"
    >
      <template #content>
        <div class="content">
          <a-radio-group v-model:value="upgradeType">
            <a-radio :value="1">https</a-radio>
            <a-radio :value="2">socket</a-radio>
          </a-radio-group>
          <div class="saveCls">
            <a-button type="primary" size="small" @click="saveUpgradeType">
              {{ t('common.save') }}
            </a-button>
          </div>
        </div>
      </template>
      <a-button
        class="node"
        type="text"
        v-permission="{
          name: 'engineUpload',
          showUsers: [USERTOKEN.admin, USERTOKEN.super],
        }"
      >
        <DesktopOutlined />
        {{ t('operation.upgMode') }}
      </a-button>
    </a-popover> -->
    <!-- 升级方式 end -->
    <!-- 主机IP显示 start -->
    <a-popover
      destroyTooltipOnHide
      placement="bottomRight"
      @openChange="ipTypePopVisible"
      trigger="click"
    >
      <template #content>
        <div class="content">
          <a-radio-group v-model:value="ipType">
            <a-radio :value="1">{{ t('operation.mip') }}</a-radio>
            <a-radio :value="2">{{ t('operation.cip') }}</a-radio>
          </a-radio-group>
          <div class="saveCls">
            <a-button type="primary" size="small" @click="saveIpType">
              {{ t('reinforce.yy') }}
            </a-button>
          </div>
        </div>
      </template>
      <a-button
        class="node"
        type="text"
        v-permission="{
          name: 'engineUpload',
          showUsers: [USERTOKEN.admin, USERTOKEN.super],
        }"
      >
        <BarsOutlined />
        {{ t('operation.zjipsh') }}
      </a-button>
    </a-popover>
    <!-- 主机IP显示 end -->
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { ContainerOutlined, DatabaseOutlined, BarsOutlined } from '@ant-design/icons-vue';
  import pwdInstallModal from '../pwdInstall';
  import { useModal } from '@/hooks';
  import useClipboard from 'vue-clipboard3';
  import { useRouter } from 'vue-router';
  import {
    // getUpGradeType,
    // setUpGradeType,
    getIpTypeApi,
    setIpTypeApi,
  } from '@/api/operation/upgrade';
  import { useI18n } from 'vue-i18n';
  import { USERTOKEN } from '@/store/modules/user/type';

  const { t } = useI18n();
  const router = useRouter();
  //口令安装
  const pwdInstall = () => {
    useModal(
      {
        title: t('operation.insByCmd'),
        width: 640,
        footer: false,
        wrapClassName: 'modalBodyNopad',
      },
      pwdInstallModal,
    );
  };
  //复制
  useClipboard();
  const copy = async () => {
    router.push({
      name: 'download',
    });
  };
  //升级方式
  // const upgradeType = ref<number>(0);
  //ip显示
  const ipType = ref<number>(0);
  // //获取升级方式
  // const upgradeTypePopVisible = (v) => {
  //   v && getUpGType();
  // };
  //获取升级方式
  const ipTypePopVisible = (v) => {
    v && getIpType();
  };
  // const getUpGType = async () => {
  //   const { way } = await getUpGradeType();
  //   upgradeType.value = way;
  // };
  const getIpType = async () => {
    const { way } = await getIpTypeApi();
    ipType.value = way;
  };

  //设置升级方式
  // const saveUpgradeType = () => {
  //   setUpGradeType({ way: upgradeType.value });
  // };
  //设置ip显示
  const saveIpType = () => {
    setIpTypeApi({ way: ipType.value });
  };
</script>
<style lang="less" scoped>
  .tools {
    .node {
      display: inline-block;
      padding: 6px 16px;
      margin: 0 8px;
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      line-height: 20px;
    }
  }
  .content {
    .saveCls {
      margin-top: 20px;
      text-align: right;
    }
  }
</style>
