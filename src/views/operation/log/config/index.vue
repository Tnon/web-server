<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-29 15:30:03
 * @LastEditTime: 2023-09-21 17:42:04
-->
<template>
  <div class="container">
    <div class="pageHeader">
      <div class="left">
        <custom-icon class="hIcon" type="#ax-wh-hostbehaviorjournal" />
        <span class="title">{{ t('operation.collConfig') }}</span>
      </div>
      <a-button type="text" @click="openLogCinfig">
        <template #icon>
          <SettingOutlined />
        </template>
        {{ t('operation.rzfsdi') }}
      </a-button>
    </div>
    <!-- 没配置提示 start -->
    <div class="tips" v-if="noConfig">
      <div class="msg">
        <InfoCircleFilled />
        <span class="text">{{ t('operation.diskfd') }}</span>
      </div>
      <a-button type="text" @click="closeTips">
        <template #icon>
          <CloseOutlined />
        </template>
      </a-button>
    </div>
    <!-- 没配置提示 end -->
    <div class="header">
      <switch-nodes v-model:actived="fType" :types="tabs" />
    </div>
    <div
      class="content"
      :style="{ height: noConfig ? 'calc(100vh - 181px)' : 'calc(100vh - 121px)' }"
    >
      <transition name="zoom-fade" mode="out-in" appear>
        <component :is="fType === 'host' ? hostView : policyView" :noConfig="noConfig" />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
  import switchNodes from '@/components/switchNodes';
  import { reactive, ref, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import hostView from './views/host';
  import policyView from './views/policy';
  import { SettingOutlined, InfoCircleFilled, CloseOutlined } from '@ant-design/icons-vue';
  import { useModal } from '@/hooks/use-modal';
  import { useFormItems } from '.';
  import { cloneDeep } from 'lodash';
  import slotsFormCmp from '@/components/slots-form';
  import { saveSyslog, getSyslog } from '@/api/operation/syslog';
  // 刚开始默认选中的tab
  const fType = ref<string>('policy');
  const { t } = useI18n();
  const noConfig = ref(true);
  const tabs = [
    {
      title: t('operation.clsk'),
      type: 'policy',
    },
    {
      title: t('operation.zjcl'),
      type: 'host',
    },
  ];
  const formItems = useFormItems(t);
  //关闭提示
  const closeTips = () => {
    noConfig.value = false;
  };
  //获取配置
  const getSyslogConfig = async () => {
    const { code, ...res } = await getSyslog();
    if (!code) {
      Object.assign(fields, res, { protocol: res.protocol ? res.protocol : undefined });
      if (res.ip) {
        noConfig.value = false;
      } else {
        noConfig.value = true;
      }
    } else {
      noConfig.value = true;
    }
  };
  getSyslogConfig();
  //参数配置表单
  const fields = reactive<{
    ip: string;
    port: string;
    protocol: undefined | string;
  }>({
    ip: '', //ip
    port: '', // 端口
    protocol: undefined, // 协议
  });
  //打开配置
  const openLogCinfig = () => {
    useModal(
      {
        title: t('operation.asjsfk'),
        contentProps: {
          colsMap: formItems,
          fields: reactive(cloneDeep(fields)),
          layout: 'vertical',
          formItemLayout: {
            wrapperCol: { span: 24 },
          },
        },
        handleOk: async (contRef) => {
          await contRef.validate();
          // Object.assign(fields, unref(contRef).fields);
          await saveSyslog(unref(contRef).fields);
          getSyslogConfig();
        },
      },
      slotsFormCmp,
    );
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 16px;
    height: 100vh;
    .pageHeader {
      padding: 16px 0 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        .hIcon {
          width: 40px;
          height: 40px;
          background-color: @primary-color;
          border-radius: 10px;
          padding: 8px;
          color: #fff;
        }
        .title {
          font-size: @fz20;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.85);
          margin-left: 16px;
        }
      }
    }
    .tips {
      padding: 8px 12px;
      background: #f4f4f4;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      .msg {
        display: flex;
        align-items: center;
        .text {
          font-size: @fz12;
          color: rgba(0, 0, 0, 0.6);
          margin-left: 8px;
        }
      }
    }
    .header {
      padding: 16px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      :deep(.box) {
        border: none;
        .defaultS {
          padding: 4px 16px;
        }
      }
    }
    // .content {
    //   height: calc(100vh - 65px);
    // }
  }
</style>
