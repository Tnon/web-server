<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-06-20 11:29:28
 * @LastEditTime: 2023-07-28 10:36:16
-->
<template>
  <div>
    <!-- 标签 start -->
    <div class="riskflag" :style="{ background: color }">
      {{ t('arcomn.' + text) }}
    </div>
    <!-- 标签 end -->
    <div class="line"></div>

    <!-- 风险描述 start -->
    <div class="label">{{ t('arcomn.riskChar') }}</div>
    <div class="value">{{ desc }}</div>
    <!-- 风险描述 end -->
    <template v-if="verify">
      <!-- 风险验证 start -->
      <div class="label">{{ t('arcomn.fxyz') }}</div>
      <div class="value">{{ verify }}</div>
      <!-- 风险验证 end -->
    </template>

    <!-- 修复方法 start -->
    <div class="label">{{ t('arcomn.xfff') }}</div>
    <div class="value">{{ proposal }}</div>
    <!-- 修复方法 end -->

    <!-- 账户 start -->
    <!-- <div class="label">{{ t('arcomn.accountName') }}</div>
    <div class="value">
      <div class="name">aaa</div>
      <div class="name">aaa</div>
    </div> -->
    <!-- 账户 end -->
  </div>
</template>

<script setup lang="ts">
  import { Rlevel } from '@/enums/pstatus';
  import { ref, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    level: number;
    desc: string;
    proposal: string;
    verify: string;
  }>();
  const { t } = useI18n();
  const text = ref<string>(''),
    color = ref<string>('');
  watchEffect(() => {
    [text.value, color.value] = Rlevel[~~props.level!]
      ? Rlevel[~~props.level!].split(',')
      : ['highRisk', '#F05064'];
  });
</script>

<style scoped lang="less">
  .riskflag {
    display: inline-block;
    padding: 8px 12px;
    color: #fff;
    border-radius: 8px;
  }
  .line {
    margin: 24px 0;
    width: 100%;
    height: 1px;
    background-color: #eee;
  }
  .label {
    font-size: @fz14;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 8px;
  }
  .value {
    font-size: @fz14;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 28px;
    word-break: break-all;
    white-space: pre-line;
    .name {
      margin: 0 8px 8px 0;
      padding: 4px 8px;
      background-color: #eee;
    }
  }
</style>
