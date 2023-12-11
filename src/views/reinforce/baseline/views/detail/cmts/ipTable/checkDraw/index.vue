<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 20:28:01
 * @LastEditTime: 2023-03-13 16:24:22
-->
<template>
  <div class="con">
    <div class="left">
      <!-- <div class="line"></div> -->
      <!-- 通过率/通过项 start -->
      <div class="node">
        <div class="label">{{ t('reinforce.tgl') }}</div>
        <div class="count success">{{ state.pass_percent }}</div>
      </div>
      <div class="node">
        <div class="label">{{ t('reinforce.tgx') }}</div>
        <countTo class="count success" :endVal="state.pass_check" />
      </div>
      <!-- 成功/失败主机 end -->
      <!-- 未通过项/失败项 start -->
      <div class="node">
        <div class="label">{{ t('reinforce.wtog') }}</div>
        <countTo class="count error" :endVal="state.not_pass_check" />
      </div>
      <div class="node">
        <div class="label">{{ t('reinforce.sbx') }}</div>
        <countTo class="count warn" :endVal="state.fail_check" />
      </div>
    </div>
    <tableContent :session_id="session_id" :mac="mac" :rule_code="rule_code" />
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import tableContent from './tableContent';
  import { getIpDetailV } from '@/api/reinforce';
  const props = defineProps({
    session_id: {
      type: Number,
      required: true,
    },
    mac: {
      type: String,
      required: true,
    },
    rule_code: {
      type: String,
      required: true,
    },
  });
  const { t } = useI18n();
  const state = reactive({
    // host_total: 300,
    pass_percent: '',
    pass_check: 0,
    not_pass_check: 0,
    fail_check: 0,
  });

  //获取数据
  const getData = async () => {
    const { code, ...res } = await getIpDetailV({
      session_id: props.session_id,
      mac: props.mac,
    });
    if (!code) {
      Object.assign(state, res);
    }
  };
  getData();
</script>

<style scoped lang="less">
  .con {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 110px);
    overflow: hidden;
  }
  .left {
    display: flex;
    width: 100%;
    .line {
      background: rgba(0, 0, 0, 0.04);
      width: 1px;
      margin: 0 16px;
    }

    .node {
      flex: 1;
    }
    .label {
      font-size: @fz13;
      font-weight: normal;
      margin-bottom: 8px;
      /* 文字/黑0.55 */
      color: rgba(0, 0, 0, 0.5);
    }
    .count {
      font-size: @fz20;
      letter-spacing: 0px;
      margin-bottom: 24px;
      display: inline-block; /* 文字/黑1 */
      color: #000000;
    }
    .success {
      color: @primary-color;
    }
    .warn {
      color: @warn-color;
    }
    .error {
      color: @danger-color;
    }
  }
</style>
