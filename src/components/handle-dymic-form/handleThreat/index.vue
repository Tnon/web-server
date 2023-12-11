<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-26 20:44:50
 * @LastEditTime: 2023-02-24 16:02:39
-->
<template>
  <a-form class="content" :model="formState" ref="formRef">
    <!-- 内容头部  start-->
    <div class="header">
      <div class="leftTitle">
        <div class="title">{{ t('arcomn.zhwxcz') }}</div>
        <div class="subtitle">{{ t('arcomn.zhwxczsub') }}</div>
      </div>
      <help-tips v-model:openHelp="openHelp" :type="E_WB_Enum.Black" />
    </div>
    <!-- 内容头部  end-->

    <a-form-item name="remarks">
      <!-- 批注信息 start -->
      <a-textarea
        class="mark"
        :auto-size="{ minRows: 4, maxRows: 8 }"
        :placeholder="t('arcomn.marksplac')"
        v-model:value="formState.remarks"
      />
      <!-- 批注信息 end -->
    </a-form-item>

    <!-- 拦截进程 start -->
    <div class="injpro">{{ t('arcomn.lanjpr') }}</div>
    <a-form-item name="pid" :rules="rulesFrom.pid">
      <process-tree :record="record" v-model:pids="formState.pid" />
    </a-form-item>
    <!-- 拦截进程 end -->

    <!-- 后续自动处置 start -->
    <div class="switchContent">
      <a-switch v-model:checked="formState.autoHandle" @change="switchChange" />
      <span class="text">{{ t('arcomn.hxzdcnz') }}</span>
      <span class="subtitle">{{ t('arcomn.hxzdcnzsub') }}</span>
    </div>
    <!-- 后续自动处置 end -->
    <!-- 动态表单 start -->
    <threat-dymic-form
      :record="record"
      :rulesFrom="rulesFrom"
      :openHelp="openHelp"
      v-show="formState.autoHandle"
      :formState="formState"
      :validate="validate"
    />
    <!-- 动态表单 end -->
  </a-form>
</template>
<script lang="ts" setup>
  import { E_WB_Enum } from '@/views/strategy/common/types';
  import { ref, reactive, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { getInitRules } from '.';
  import helpTips from '../helpTips';
  import processTree from './cmts/processTree';
  import threatDymicForm from './cmts/threatDymicForm';
  import { IFormState } from './type';
  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
  });
  const { t } = useI18n();
  //是否打开帮助与提示
  const openHelp = ref(true);
  //表单内容
  const formState = reactive<IFormState>({
    remarks: '',
    pid: undefined,
    autoHandle: false,
    rules_detail: [
      {
        methods: undefined,
        group: props.record.group_id !== undefined ? props.record.group_id + '' : '',
        attribute: undefined,
        attr_values: [
          { rules: undefined, value: undefined, logic: 'or', rules_options: [], value_options: [] },
        ],
      },
    ],
  });
  //表单正则
  const rulesFrom = reactive({
    pid: {
      required: true,
      message: t('arcomn.pidsnot'),
    },
    all_rules: [getInitRules(t, formState.autoHandle)],
  });
  //表单
  const formRef = ref();
  //表单验证方法
  const validate = () => {
    unref(formRef).clearValidate();
    return unref(formRef).validate();
  };

  //自动处置开关
  const switchChange = (v) => {
    // for (let k in rulesFrom.all_rules) {
    //   if (k !== 'remarks') {
    //     rulesFrom[k].required = v;
    //   }
    // }
    rulesFrom.all_rules.forEach((ele) => {
      for (let k in ele) {
        if (k !== 'remarks') {
          ele[k].required = v;
        }
      }
    });
  };
  defineExpose({ validate, formState });
</script>
<style lang="less" scoped>
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    .header {
      flex: 0 0 48px;
      padding: 0 14px 0 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .leftTitle {
        display: flex;
        align-items: center;
        .title {
          font-size: @fz16;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
          margin-right: 16px;
        }
        .subtitle {
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.4);
        }
      }
    }
    .mark {
      margin: 16px 0 0 0;
      border-radius: 10px;
    }
    .injpro {
      font-size: @fz14;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      line-height: 24px;
      margin-bottom: 8px;
    }

    .switchContent {
      display: flex;
      align-items: center;
      margin-top: 8px;
      .text {
        font-size: @fz14;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
        line-height: 24px;
        margin: 0 16px 0 8px;
      }
      .subtitle {
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
</style>
