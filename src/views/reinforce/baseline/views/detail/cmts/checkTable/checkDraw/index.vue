<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 20:28:01
 * @LastEditTime: 2023-03-13 16:23:29
-->
<template>
  <div class="con">
    <div class="left">
      <div class="blok">
        <!-- 检查主机 start -->
        <div class="item">
          <div class="node">
            <div class="label">{{ t('reinforce.jczj') }}</div>
            <countTo class="count" :endVal="state.total_host_num" />
          </div>
        </div>
        <!-- 检查主机 end -->
      </div>

      <div class="line"></div>
      <div class="blok2">
        <!-- 成功 start -->
        <div class="item">
          <div class="node">
            <div class="label">{{ t('reinforce.szj') }}</div>
            <countTo class="count success" :endVal="state.success_host_num" />
          </div>
        </div>
        <!-- 成功/失败主机 end -->

        <!-- 不匹配主机/失败主机  start -->
        <div class="item">
          <div class="node">
            <div class="label">{{ t('reinforce.bpizj') }}</div>
            <countTo class="count warn" :endVal="state.incompatible_host_num" />
          </div>
          <div class="node">
            <div class="label">{{ t('reinforce.sbzj') }}</div>
            <countTo class="count warn" :endVal="state.fail_host_num" />
          </div>
        </div>
        <!--不匹配主机 end -->
      </div>

      <div class="line"></div>
      <div class="blok2">
        <!-- 通过率/通过项 start -->
        <div class="item">
          <div class="node">
            <div class="label">{{ t('reinforce.tgl') }}</div>
            <div class="count success">{{ state.pass_percent }}</div>
          </div>
          <div class="node">
            <div class="label">{{ t('reinforce.tgx') }}</div>
            <countTo class="count success" :endVal="state.pass_num" />
          </div>
        </div>
        <!-- 成功/失败主机 end -->
        <!-- 未通过项/失败项 start -->
        <div class="item">
          <div class="node">
            <div class="label">{{ t('reinforce.wtog') }}</div>
            <countTo class="count error" :endVal="state.no_pass_num" />
          </div>
          <div class="node">
            <div class="label">{{ t('reinforce.sbx') }}</div>
            <countTo class="count warn" :endVal="state.check_fail_num" />
          </div>
        </div>
      </div>
    </div>
    <tableContent :check_code="check_code" :session_id="session_id" />
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import tableContent from './tableContent';
  import { getCheckDraw } from '@/api/reinforce';
  const props = defineProps({
    check_code: {
      type: String,
      required: true,
    },
    session_id: {
      type: Number,
      required: true,
    },
  });
  const { t } = useI18n();
  const state = reactive({
    total_host_num: 0,
    success_host_num: 0,
    fail_host_num: 0,
    incompatible_host_num: 0,
    pass_percent: '',
    pass_num: 0,
    no_pass_num: 0,
    check_fail_num: 0,
  });
  //获取数据
  const getStatic = async () => {
    const { code, ...statistics } = await getCheckDraw<typeof props>({
      check_code: props.check_code,
      session_id: props.session_id,
    });
    if (!code) {
      Object.assign(state, statistics);
    }
  };
  getStatic();
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
    .line {
      background: rgba(0, 0, 0, 0.04);
      width: 1px;
      margin: 0 16px;
    }
    .blok {
      flex: 2;
    }
    .blok2 {
      flex: 3;
    }
    .item {
      display: flex;
      align-items: center;
      .node {
        flex: 1;
      }
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
