<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-28 10:04:42
 * @LastEditTime: 2023-03-17 17:29:48
-->
<template>
  <div class="container">
    <div class="header">
      {{
        state.result === E_Check_Result.Pass
          ? t('reinforce.pass')
          : state.result === E_Check_Result.NoPass
          ? t('reinforce.npass')
          : t('reinforce.passsb')
      }}
      <span>-</span>
      <span>
        {{ state.title + '-' + state.type }}
      </span>
    </div>
    <div class="main">
      <!-- 检查内容 start -->
      <div class="label first">{{ t('reinforce.jcnr') }}</div>
      <div class="content">{{ state.content }}</div>
      <!-- 检查内容 end -->

      <!-- 检查说明 start -->
      <div class="label">{{ t('reinforce.jcsm') }}</div>
      <div class="content">{{ state.description }}</div>
      <!-- 检查说明 end -->

      <!-- 检查结果 start -->
      <div class="label">{{ t('reinforce.jcjg') }}</div>
      <div class="result">
        <div class="passorno" :class="{ success: state.result === E_Check_Result.Pass }">
          {{
            state.result === E_Check_Result.Pass
              ? t('reinforce.pass')
              : state.result === E_Check_Result.NoPass
              ? t('reinforce.npass')
              : t('reinforce.passsb')
          }}
        </div>
        <div>
          <div class="content">{{ state.failure_reason ? state.failure_reason : '-' }}</div>
          <!-- 详细结果 start -->
          <div class="label sublabel">{{ t('reinforce.xxjg') }}</div>
          <div class="content">{{ state.detail ? state.detail : '-' }}</div>
          <!-- 详细结果 end -->
        </div>
      </div>
      <!-- 检查结果 end -->

      <!-- 修复建议 start -->
      <div class="label">{{ t('reinforce.xfjy') }}</div>
      <div class="content">{{ state.proposal }}</div>
      <!-- 修复建议 end -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { E_Check_Result } from '../checkTable/checkDraw/tableContent/checkResult/type';
  import { getFmDataApi } from '@/api/reinforce';
  const props = defineProps({
    check_code: {
      type: String,
      required: true,
    },
    session_id: {
      type: Number,
      required: true,
    },
    mac: {
      type: String,
      required: true,
    },
  });
  const { t } = useI18n();
  const state = reactive({
    title: '',
    type: '',
    content: '',
    description: '',
    result: E_Check_Result.NoPass,
    failure_reason: '',
    detail: '',
    proposal: '',
  });

  //获取数据
  const getFmData = async () => {
    const { code, ...res } = await getFmDataApi({
      check_code: props.check_code,
      session_id: props.session_id,
      mac: props.mac,
    });
    if (!code) {
      Object.assign(state, res);
    }
  };
  getFmData();
</script>

<style scoped lang="less">
  .container {
    .header {
      height: 48px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      // justify-content: space-between;
      font-size: @fz16;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-right: 16px;
    }
    .main {
      padding: 24px;
    }
    .label {
      font-size: @fz14;
      font-weight: 600;
      color: #000000;
      margin: 24px 0 8px 0;
    }
    .first {
      margin-top: 8px;
    }
    .content {
      font-size: @fz12;
      font-weight: normal;
      word-break: break-word;
      color: rgba(0, 0, 0, 0.5);
    }
    .sublabel {
      font-size: @fz13;
      margin-top: 16px;
    }
    .result {
      padding: 16px;
      background: #fafafa;
      display: flex;
      align-items: flex-start;
      border-radius: 12px;
      .passorno {
        padding: 8px 16px;
        border-radius: 8px;
        font-size: @fz14;
        font-weight: 600;
        /* 文字/白1 */
        color: #ffffff;
        background-color: @danger-color;
        margin-right: 16px;
        word-break: keep-all;
      }
      .success {
        background-color: @primary-color;
      }
    }
  }
</style>
