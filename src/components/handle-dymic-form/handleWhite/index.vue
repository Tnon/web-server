<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-26 20:44:50
 * @LastEditTime: 2023-02-22 21:40:30
-->
<template>
  <a-form class="content" :model="formState" ref="formRef">
    <!-- 内容头部  start-->
    <div class="header">
      <div class="leftTitle">
        <div class="title">{{ title }}</div>
        <div class="subtitle">{{ t('arcomn.joinbaisub') }}</div>
      </div>
      <help-tips v-model:openHelp="openHelp" :type="E_WB_Enum.White" />
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

    <!-- 规则配置 start -->
    <div class="ruleConfig">{{ t('arcomn.rulcfg') }}</div>
    <div class="cmtItem">
      <!-- 攻击类型 start -->
      <a-form-item class="formitem" name="attack" :rules="rulesFrom.attack">
        <a-select
          v-model:value="formState.attack"
          allowClear
          optionFilterProp="name"
          show-search
          :fieldNames="{ label: 'name', value: 'id_list' }"
          :placeholder="t('arcomn.sleatty')"
          :options="allAttackOptions"
          @change="changeAttackType"
        />
      </a-form-item>
      <!-- 应用分组 start -->
      <a-form-item class="formitem" name="group" :rules="rulesFrom.group">
        <hostGroupSelect
          v-model:selectedGroupIds="formState.group"
          :placeholder="t('strategy.psleyyfzAll')"
          :multiple="true"
        />
      </a-form-item>
      <!-- 应用分组 end -->
      <!-- 规则类型 start -->
      <a-form-item class="formitem" name="rule_type" :rules="rulesFrom.rule_type">
        <a-select
          v-model:value="formState.rule_type"
          :placeholder="t('arcomn.sleogtut')"
          @change="changeRuleType"
        >
          <a-select-option :value="1">{{ t('arcomn.singrule') }}</a-select-option>
          <a-select-option :value="2" v-if="isHaveMultipleRule">
            {{ t('arcomn.zuhrule') }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <!-- 规则类型 end -->
    </div>

    <!-- 规则配置 end -->

    <!-- 动态表单 start -->
    <white-dymic-form
      :record="record"
      :rulesFrom="rulesFrom"
      :validate="validate"
      :openHelp="openHelp"
      :formState="formState"
    />
    <!-- 动态表单 end -->
  </a-form>
</template>
<script lang="ts" setup>
  import { ref, reactive, unref, PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import helpTips from '../helpTips';
  import hostGroupSelect from '@/components/host-group-select';
  import whiteDymicForm from './cmts/whiteDymicForm';
  import { IFormState } from './type';
  import { getAttackOptions } from '@/api/attack_risk';
  import { MODELTYPE } from '@/enums/attack_risk';
  import { getInitRules } from '.';
  import { E_WB_Enum } from '@/views/strategy/common/types';
  // import { isHavMulRule } from '.';
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    record: {
      type: Object,
      required: true,
    },
    modelType: {
      type: Number as PropType<MODELTYPE>,
      required: true,
    },
    //编辑
    formStateRes: {
      type: Object as PropType<IFormState>,
    },
  });
  const { t } = useI18n();

  //是否打开帮助与提示
  const openHelp = ref(true);
  //是否具有多项规则选项
  const isHaveMultipleRule = ref(false);
  //表单内容
  const formState = reactive<IFormState>({
    remarks: '',
    attack: undefined,
    group: props.record.group_id !== undefined ? props.record.group_id + '' : '',
    rule_type: 1,
    rules_detail: [
      [
        {
          attribute: undefined,
          attr_values: [
            {
              rules: undefined,
              value: undefined,
              logic: 'or', //默认或
              rules_options: [],
              value_options: [],
            },
          ],
        },
      ],
    ],
  });
  // 编辑
  if (props.formStateRes) {
    Object.assign(formState, props.formStateRes);
  }
  //表单正则
  const rulesFrom = reactive({
    //攻击路径
    attack: {
      required: true,
      message: t('arcomn.qisjggks'),
    },
    //规则类型
    rule_type: {
      required: true,
    },
    //应用的分组
    group: {
      required: false,
      message: t('strategy.psleyyfzAll'),
    },
    // 属性
    all_rules: [getInitRules(t)],
  });
  //表单
  const formRef = ref();
  //表单验证方法
  const validate = () => {
    return unref(formRef).validate();
  };
  //改变攻击类型
  const changeAttackType = (_, option) => {
    if (option) {
      isHaveMultipleRule.value = option.is_combination;
      if (!option.is_combination) {
        formState.rule_type = 1;
        changeRuleType(1);
      }
    } else {
      isHaveMultipleRule.value = false;
      formState.rule_type = 1;
      changeRuleType(1);
    }
  };
  //改变规则
  const changeRuleType = (v) => {
    if (v === 2) {
      formState.rules_detail.forEach((ele) => {
        if (ele.length < 2) {
          ele.push({
            attribute: undefined,
            attr_values: [
              {
                rules: undefined,
                value: undefined,
                logic: 'or', //默认或
                rules_options: [],
                value_options: [],
              },
            ],
          });
        }
      });
    } else {
      formState.rules_detail.forEach((ele, index) => {
        formState.rules_detail[index] = ele.slice(0, 1);
      });
    }
  };
  //获取所有攻击类型
  const allAttackOptions = ref();
  const getAllAttackOptions = async () => {
    const { items: attackOptions } = await getAttackOptions({ sec_type: props.modelType });
    allAttackOptions.value = attackOptions;
    //如果dtype在idlist里面，选择id_list
    if (props.record.dtype) {
      allAttackOptions.value.forEach((ele) => {
        if (ele.id_list.split(',').includes(props.record.dtype + '')) {
          formState.attack = ele.id_list;
          isHaveMultipleRule.value = ele.is_combination;
        }
      });
    }
    //编辑
    if (formState.id !== undefined) {
      const currentArrack = allAttackOptions.value.find((ele) => ele.id_list === formState.attack);
      isHaveMultipleRule.value = currentArrack.is_combination;
    }
  };
  getAllAttackOptions();
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
      padding: 0 14px 0 8px;
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
    .ruleConfig {
      font-size: @fz14;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8);
      line-height: 24px;
      margin-bottom: 16px;
    }
    .cmtItem {
      display: flex;
      align-items: center;
      .formitem {
        flex: 1;
        margin-left: 8px;
        margin-right: 8px;
      }
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
