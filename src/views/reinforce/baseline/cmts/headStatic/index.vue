<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 11:10:06
 * @LastEditTime: 2023-03-21 12:03:15
-->
<template>
  <div class="head">
    <div class="title">{{ t('reinforce.bsver') }} {{ state.version }}</div>
    <div class="static">
      <template v-for="(item, key) in state.counts" :key="key">
        <div class="item" @click="jumpto(key)">
          <div class="left">
            <span class="label">{{ t('reinforce.' + key) }}</span>
            <right-outlined v-if="key !== 'result_count'" />
          </div>
          <countTo class="count" :endVal="item" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { createVNode, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { RightOutlined } from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router';
  import { useModal } from '@/hooks';
  import baseDetail from '../tableContent/cmts/baseDetail';
  import { getBaselineStatic, getRuleChecks } from '@/api/reinforce';
  const { t } = useI18n();
  const state = reactive({
    version: '',
    counts: {
      //基线规则数量
      rule_count: 0,
      // 检查项数量
      check_count: 0,
      //基线任务数量
      task_count: 0,
      //基线检查结果数量
      result_count: 0,
    },
  });
  const router = useRouter();
  const jumpto = (key) => {
    if (key === 'rule_count') {
      router.push({
        name: 'reinforce-layout-baseline-rule',
      });
    } else if (key === 'check_count') {
      useModal(
        {
          title: 'reinforce.jxtitle',
          footer: false,
          wrapClassName: 'noheadModal',
          width: 800,
          contentProps: {
            title: t('reinforce.alljxjcx'),
            desc: t('reinforce.alljxjcxdesc'),
            tableApi: getRuleChecks,
          },
        },
        createVNode(baseDetail),
      );
    } else if (key === 'task_count') {
      router.push({
        name: 'reinforce-layout-baseline-task',
      });
    }
  };
  //获取数据
  const getVersionNum = async () => {
    const { code, version, ...counts } = await getBaselineStatic();
    if (!code) {
      state.version = version;
      Object.assign(state.counts, counts);
    }
  };
  getVersionNum();
</script>

<style scoped lang="less">
  .head {
    padding: 0 16px;
    .title {
      font-size: @fz16;
      font-weight: 600;
      /* 文字/黑1 */
      color: #000000;
      padding: 16px 0;
      display: flex;
      align-items: center;
    }
    .static {
      display: flex;
      align-items: center;
      .item {
        flex: 1;
        margin: 0 8px;
        border-radius: 12px;
        justify-content: space-between;
        /* 控件/#000-8 - Select */
        border: 1px solid rgba(0, 0, 0, 0.08);
        // padding:  24px;
        display: flex;
        align-items: center;
        padding: 20px 24px;
        cursor: pointer;
        .left {
          display: flex;
          align-items: center;
          .label {
            margin-right: 12px;
            font-size: @fz14;
            font-weight: 600;
            color: #000000;
            transition: all 0.3s;
          }
        }
        &:hover {
          .label {
            margin-right: 15px;
          }
        }
        .count {
          font-size: @fz20;
          font-weight: 600;
          color: @primary-color;
        }
      }
    }
  }
</style>
