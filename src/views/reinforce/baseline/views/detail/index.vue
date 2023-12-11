<!--
 * @Author: Delevin.TnT
 * @LastEditors: dailuxin
 * @Date: 2023-02-23 16:23:04
 * @LastEditTime: 2023-04-14 18:02:04
-->
<template>
  <div class="container">
    <div class="header" @click="goback">
      <customIcon type="#ax-arrow-left" size="24" />
      <span class="title">{{ state.task_name }}</span>
    </div>
    <div class="content">
      <div class="left">
        <!-- 检查主机 start -->
        <div class="item">
          <div class="node">
            <div class="label">{{ t('reinforce.jczj') }}</div>
            <countTo class="count" :endVal="state.total_host_num" />
          </div>
        </div>
        <!-- 检查主机 end -->
        <div class="line"></div>
        <!-- 成功start -->
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
        <div class="line"></div>
        <!-- 通过率/通过项 start -->
        <div class="item">
          <div class="node">
            <div class="label">{{ t('reinforce.tgl') }}</div>
            <div class="count success">{{ state.pass_percent }}</div>
          </div>
          <div class="node">
            <div class="label">{{ t('reinforce.tgx') }}</div>
            <countTo class="count success" :endVal="state.pass_check_num" />
          </div>
        </div>
        <!-- 成功/失败主机 end -->
        <!-- 未通过项/失败项 start -->
        <div class="item">
          <div class="node">
            <div class="label">{{ t('reinforce.wtog') }}</div>
            <countTo class="count error" :endVal="state.not_passed_check_num" />
          </div>
          <div class="node">
            <div class="label">{{ t('reinforce.sbx') }}</div>
            <countTo class="count warn" :endVal="state.fail_check_num" />
          </div>
        </div>
        <!-- 未通过项/失败项 end -->
        <div class="line"></div>

        <!-- 任务名称 start -->
        <div>
          <div class="infotitle">{{ t('reinforce.rwmc') }}</div>
          <div class="infovalue">{{ state.task_name }}</div>
        </div>
        <!-- 任务名称 end -->

        <!-- 基线规则 start -->
        <div>
          <div class="infotitle">{{ t('reinforce.rule_count') }}</div>
          <div class="infovalue">{{ state.rule_name }}</div>
        </div>
        <!-- 基线规则 end -->

        <!-- 任务创建人 start -->
        <div>
          <div class="infotitle">{{ t('reinforce.rwcjs') }}</div>
          <div class="infovalue">{{ state.create_user }}</div>
        </div>
        <!-- 任务创建人 end -->

        <!-- 基线检查项 start -->
        <div>
          <div class="infotitle">{{ t('reinforce.check_count') }}</div>
          <div class="infovalue">{{ state.check_num }}</div>
        </div>
        <!-- 基线检查项 end -->

        <!-- 任务创建时间 start -->
        <div>
          <div class="infotitle">{{ t('reinforce.wucjsj') }}</div>
          <div class="infovalue">{{ state.create_time }}</div>
        </div>
        <!-- 任务创建时间 end -->

        <!-- 任务执行时间 start -->
        <div>
          <div class="infotitle">{{ t('reinforce.refg') }}</div>
          <div class="infovalue">{{ state.execute_time }}</div>
        </div>
        <!-- 任务执行时间 end -->
      </div>
      <div class="right">
        <component
          :is="isCheckView ? checkTable : ipTable"
          :session_id="~~id"
          :rule_code="rule_code"
          :rule_name="state.rule_name"
        >
          <template #switch>
            <a-button @click="switchView">{{ t('operation.viswic') }}</a-button>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import ipTable from './cmts/ipTable';
  import checkTable from './cmts/checkTable';
  import { getTaskDetail } from '@/api/reinforce';

  // 总览跳转携带参数
  const {
    query: { id, type, rule_code },
  } = useRoute() as any;
  const { t } = useI18n();
  const router = useRouter();
  const goback = () => {
    router.go(-1);
  };
  //初始化视图
  const isCheckView = ref(type === 'check');

  const state = reactive({
    //任务名称
    task_name: '',
    //检查主机
    total_host_num: 0,
    //成功主机
    success_host_num: 0,
    //不匹配主机
    incompatible_host_num: 0,
    //通过率
    pass_percent: '',
    //通过项
    pass_check_num: 0,
    //失败主机
    fail_host_num: 0,
    //未通过项
    not_passed_check_num: 0,
    //失败项
    fail_check_num: 0,
    //规则名称
    rule_name: '',
    //创建人
    create_user: '',
    //基线检查项
    check_num: 0,
    //任务创建时间
    create_time: '',
    //任务执行时间
    execute_time: '',
  });

  // 切换视图
  const switchView = () => {
    isCheckView.value = !isCheckView.value;
  };
  //获取数据
  const getStaticData = async () => {
    const { code, ...res } = await getTaskDetail({ session_id: ~~id });
    if (!code) {
      Object.assign(state, res);
    }
  };
  getStaticData();
</script>

<style scoped lang="less">
  .container {
    background: #f6f6f6;
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 0 16px;
    .header {
      display: flex;
      flex: 48px 0 0;
      align-items: center;
      cursor: pointer;
      .title {
        font-size: @fz16;
        font-weight: 600;
        margin-left: 8px;
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .content {
      flex: 1;
      display: flex;
      .left {
        display: inline-block;
        width: 20%;
        padding: 32px;
        height: calc(100vh - 48px);
        overflow: auto;
        .line {
          width: 100%;
          margin: 8px 0 32px 0;
          height: 1px;
          background: rgba(0, 0, 0, 0.04);
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
        .infotitle {
          font-size: @fz12;
          /* 文字/黑0.55 */
          color: rgba(0, 0, 0, 0.5);
        }
        .infovalue {
          font-size: @fz13;
          font-weight: 600;
          /* 文字/黑1 */
          color: #000000;
          margin: 4px 0 24px;
        }
      }
      .right {
        display: inline-block;
        width: 80%;
        background-color: #fff;
      }
    }
  }
</style>
