<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-17 18:33:16
 * @LastEditTime: 2023-10-12 18:04:50
-->
<template>
  <div class="exform">
    <!-- 切换模式 start -->
    <div class="tabs">
      <template v-for="(item, key) in tabsState" :key="key">
        <div class="node" :class="{ actived: activedType === key }" @click="switchType(key)">
          <div class="title">{{ item.title }}</div>
          <template v-if="templates[key].id">
            <div class="tips" v-if="bytesLength(templates[key].id) <= 40">
              <CheckCircleFilled />
              <span class="text">{{ t('operation.ysj') }}</span>
            </div>
            <div class="errtips tips" v-else>
              <CloseCircleFilled />
              <span class="text">{{ t('operation.shjt') }}</span>
            </div>
          </template>
          <div class="tips errtips" v-else>
            <exclamation-circle-filled />
            <span class="text">{{ t('operation.mnfhs') }}</span>
          </div>
        </div>
      </template>
    </div>
    <!-- 切换模式 end -->

    <!-- 步骤1 start -->
    <div class="clabel">
      <span class="step">{{ t('operation.stepo') }}</span>
      <a-button type="text" @click="copy">
        <template #icon>
          <copy-outlined />
        </template>
        {{ t('license.copy') }}
      </a-button>
    </div>
    <!-- 步骤1 end -->
    <!-- 表单 start -->
    <a-textarea
      :auto-size="{ minRows: 4, maxRows: 8 }"
      :placeholder="t('operation.templac')"
      v-model:value="templates[activedType].template"
    />
    <div class="tipsone">
      <exclamation-circle-filled />
      <div class="tips">
        <div class="example">{{ tabsState[activedType].example }}</div>
        <div class="extra">{{ tabsState[activedType].extra }}</div>
      </div>
    </div>
    <!-- 表单 end -->

    <!-- 步骤2 start -->
    <div class="clabel">
      <span class="step">{{ t('operation.stept') }}</span>
    </div>
    <!-- 步骤2 end -->

    <!-- 表单 start -->
    <a-input :placeholder="t('operation.idlac')" v-model:value.trim="templates[activedType].id" />
    <div class="tipsone">
      <exclamation-circle-filled />
      <div class="tips">
        <div class="example">
          <span>{{ t('operation.wdlab') }}</span>
          <a
            href="https://support.huaweicloud.com/usermanual-msgsms/sms_03_0015.html"
            target="_blank"
            rel="noopener noreferrer"
            class="outlink"
          >
            https://support.huaweicloud.com/usermanual-msgsms/sms_03_0015.html
          </a>
        </div>

        <div class="extra">{{ t('operation.notis') }}</div>
      </div>
    </div>
    <!-- 表单 end -->

    <!-- 步骤3 start -->
    <div class="clabel">
      <span class="step">{{ t('operation.stepth') }}</span>
    </div>
    <!-- 步骤3 end -->

    <!-- 表单 start -->
    <div class="test">
      <a-input :placeholder="t('operation.mblac')" v-model:value.trim="mobileNum" />
      <a-button class="testBtn" :disabled="!mobileNum || timerSus !== 20" @click="testConfig">
        {{ timerSus !== 20 ? t('operation.intsed', [timerSus]) : t('operation.testm') }}
      </a-button>
    </div>

    <!-- 表单 end -->
  </div>
</template>

<script setup lang="ts">
  import { onUnmounted, reactive, ref } from 'vue';
  import useClipboard from 'vue-clipboard3';
  import { useI18n } from 'vue-i18n';
  import {
    CheckCircleFilled,
    ExclamationCircleFilled,
    CopyOutlined,
    CloseCircleFilled,
  } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import { testSmsConfig } from '@/api/operation/notice';
  import { cloneDeep } from 'lodash';
  import { compileStr } from '@/utils/urlUtils';
  import { bytesLength } from '@/utils/tools';
  const props = defineProps<{
    templates: {
      alarm_single: {
        id: string;
        template: string;
      };
      alarm_group: {
        id: string;
        template: string;
      };
    };
    validate: Function;
    validateField: Function;
    modelRef: any;
  }>();
  const { t } = useI18n();
  const activedType = ref('alarm_single');
  const mobileNum = ref('');
  const tabsState = reactive({
    alarm_single: {
      title: t('operation.simg'),
      example: t('operation.onee'),
      extra: t('operation.oneex', ['', '{1}', '{2}']),
    },
    alarm_group: {
      title: t('operation.gosu'),
      example: t('operation.twoe'),
      extra: t('operation.twoex', ['', '{1}', '{2}', '{3}', '{4}', '{5}']),
    },
  });
  //切换
  const switchType = (type) => {
    activedType.value = type;
  };
  //复制
  const { toClipboard } = useClipboard();
  const copy = async () => {
    try {
      await toClipboard(props.templates[activedType.value].template);
      message.success(t('setting.copClid'));
    } catch (e) {}
  };
  const timerSus = ref(20);
  let timer: any = 0;
  // modelRef.templates.alarm_group.id &&
  //       modelRef.templates.alarm_single.id &&
  //       bytesLength(modelRef.templates.alarm_single.id) <= 40 &&
  //       bytesLength(modelRef.templates.alarm_group.id) <= 40
  //验证手机
  const testConfig = async () => {
    try {
      await props.validate();
      if (
        props.modelRef.templates[activedType.value].id &&
        bytesLength(props.modelRef.templates[activedType.value].id) <= 40
      ) {
        const sendObj: any = cloneDeep(props.modelRef);
        sendObj.templates = { [activedType.value]: props.modelRef.templates[activedType.value] };
        sendObj.mobile = mobileNum.value;
        sendObj.appsecret = compileStr(sendObj.appsecret);
        const { code } = await testSmsConfig(sendObj);
        if (!code) {
          timer = setInterval(() => {
            timerSus.value = timerSus.value - 1;
            if (timerSus.value === 0) {
              clearInterval(timer);
              timerSus.value = 20;
            }
          }, 1000);
        }
      }
    } catch {}
  };
  onUnmounted(() => {
    clearInterval(timer);
  });
</script>

<style scoped lang="less">
  .exform {
    padding: 0 16px;
    :deep(.ant-input) {
      border-radius: 8px;
    }
    .tabs {
      display: flex;
      align-items: center;
      .node {
        padding: 8px 12px;
        border-radius: 8px;
        margin-right: 4px;
        min-width: 180px;
        cursor: pointer;

        .title {
          font-size: @fz13;
          font-weight: 600;
          color: #000000;
          margin-bottom: 4px;
        }
        .tips {
          color: @primary-color;
          display: flex;
          align-items: center;
          .text {
            margin-left: 4px;
          }
        }

        .errtips {
          color: @danger-color;
        }
      }
      .actived {
        background: rgba(0, 0, 0, 0.08);
      }
    }
    .clabel {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      .step {
        font-size: @fz13;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        margin-top: 24px;
      }
    }
    .tipsone {
      display: flex;
      font-size: @fz12;
      color: rgba(0, 0, 0, 0.3);
      margin-top: 8px;
      align-items: baseline;
      .tips {
        margin-left: 8px;
        .example {
          margin-bottom: 8px;
        }
      }
    }
    .test {
      display: flex;
      align-items: center;
      .testBtn {
        margin-left: 16px;
      }
    }
  }
</style>
