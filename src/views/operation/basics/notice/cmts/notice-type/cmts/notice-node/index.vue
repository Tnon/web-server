<template>
  <div class="node">
    <!-- 左侧图标 start -->
    <custom-icon class="nodeIcon" :type="nodeStatic.icon" />
    <!-- 左侧图标 end -->
    <div class="main">
      <div class="tsw">
        <!-- 标题和提示语 start -->
        <div class="left">
          <div class="text">{{ nodeStatic.title }}</div>
          <a-tooltip v-if="nodeStatic.tips" placement="right" destroyTooltipOnHide>
            <template #title>
              {{ nodeStatic.tips }}
            </template>
            <question-circle-outlined />
          </a-tooltip>
        </div>
        <!-- 标题和提示语 end -->
        <!-- 开关 start -->
        <div class="swts">
          <div class="swt" v-if="nodeStatic.sms">
            <a-switch
              :checked="noticeRes.sms"
              :checkedValue="E_Switch.Open"
              :unCheckedValue="E_Switch.Close"
              :disabled="
                emailSmsResult === E_ValidateResult.Sms || emailSmsResult === E_ValidateResult.None
              "
              @change="changeSwitch($event, 'sms')"
            />
            <div class="label">{{ t('operation.dx') }}</div>
          </div>
          <div class="swt" v-if="nodeStatic.email">
            <a-switch
              :checked="noticeRes.email"
              :checkedValue="E_Switch.Open"
              :unCheckedValue="E_Switch.Close"
              :disabled="
                emailSmsResult === E_ValidateResult.Email ||
                emailSmsResult === E_ValidateResult.None
              "
              @change="changeSwitch($event, 'email')"
            />
            <div class="label">{{ t('operation.yj') }}</div>
          </div>
        </div>
        <!-- 开关 end -->
      </div>
      <div class="line"></div>

      <div class="footer">
        <div class="left">
          <user-outlined class="useroutline" />
          <div class="text">
            {{ t('operation.jsfgtl', [noticeRes.receivers.length]) }}
          </div>
          <div class="perava">
            <template v-for="(item, index) in noticeRes.receivers" :key="item.id">
              <template v-if="index < 10">
                <a-avatar class="avatar">
                  <template #icon>
                    <showAvatar class="avaicon" :name="item.name" />
                  </template>
                </a-avatar>
              </template>
            </template>
            <span v-if="noticeRes.receivers.length > 10">...</span>
          </div>
        </div>
        <!-- 接收人管理 start -->
        <a-button class="btn" type="text" @click="openDraw">
          <template #icon>
            <setting-outlined />
          </template>
          {{ t('operation.fkjsf') }}
        </a-button>
        <!-- 接收人管理 end -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { E_Switch, I_NoticeStatic, I_NoticeRes } from '../../type';
  import { QuestionCircleOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import showAvatar from '@/components/showAvatar';
  import { alarmSwitch, getNotiCfg } from '@/api/operation/notice';
  import useCreatDraw from '@/hooks/use-click-row';
  import drawContent from '../draw-content';
  import { E_ValidateResult } from '../../../notice-head/type';
  const props = defineProps<{
    nodeStatic: I_NoticeStatic;
    emailSmsResult: E_ValidateResult;
  }>();

  const { t } = useI18n();
  const noticeRes = reactive<I_NoticeRes>({
    sms: E_Switch.Close,
    email: E_Switch.Close,
    receivers: [],
  });
  const getSmsEmailCfg = async () => {
    const { code, ...res } = await getNotiCfg({ category: props.nodeStatic.type });
    if (!code) {
      Object.assign(noticeRes, res);
    }
  };
  getSmsEmailCfg();
  //打开当前的接收人
  const openDraw = () => {
    useCreatDraw(
      {
        title: t('operation.jsrsz'),
        width: 680,
        contentProps: {
          drawClass: 'noHeader',
          noticeType: props.nodeStatic.type,
          getSmsEmailCfg,
        },
      },
      drawContent,
    );
  };

  //当前类型的总开关
  const changeSwitch = async (e, type) => {
    const { code } = await alarmSwitch(
      {
        category: props.nodeStatic.type,
        [type]: e,
      },
      e === E_Switch.Open,
    );
    !code && getSmsEmailCfg();
  };

  defineExpose({ getSmsEmailCfg });
</script>

<style scoped lang="less">
  .node {
    border: 1px solid rgba(0, 0, 0, 0.08);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    display: flex;
    align-items: flex-start;
    .nodeIcon {
      width: 40px;
      height: 40px;
      padding: 6px;
      background: rgba(24, 186, 121, 0.1);
      border-radius: 8px;
      color: @primary-color;
      margin-right: 16px;
    }
    .main {
      flex: 1;
      .tsw {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          .text {
            font-size: @fz16;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.8);
            margin-right: 8px;
          }
        }
        .swts {
          display: flex;
          align-items: center;
          .swt {
            display: flex;
            align-items: center;
            .label {
              font-size: @fz14;
              font-weight: 600;
              color: rgba(0, 0, 0, 0.8);
              margin-left: 8px;
              margin-right: 80px;
            }
          }
        }
      }
      .line {
        width: 100%;
        height: 1px;
        background: rgba(0, 0, 0, 0.04);
        margin: 20px 0;
      }

      .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          .useroutline {
            font-size: @fz16;
          }
          .text {
            font-size: @fz12;
            color: rgba(0, 0, 0, 0.8);
            margin: 0 16px 0 8px;
          }
          .perava {
            display: flex;
            align-items: center;
            .avatar {
              margin-right: 8px;
              background-color: @primary-color;
              width: 24px;
              height: 24px;
              font-size: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
  }
</style>
