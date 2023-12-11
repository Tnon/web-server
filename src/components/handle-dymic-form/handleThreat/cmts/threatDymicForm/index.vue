<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-09 10:51:48
 * @LastEditTime: 2023-10-26 15:16:22
-->
<template>
  <div class="container">
    <div class="selfForm">
      <template v-for="(state, indexRecord) in formState.rules_detail" :key="indexRecord">
        <div class="formNode">
          <div class="index">{{ t('arcomn.rindex', [indexRecord + 1]) }}</div>
          <div class="rightOptions">
            <div class="firstRow">
              <!-- 处置方式 start -->
              <a-form-item
                class="item"
                :name="['rules_detail', indexRecord, 'methods']"
                :rules="rulesFrom.all_rules[indexRecord].methods"
              >
                <a-select
                  v-model:value="state.methods"
                  allowClear
                  :placeholder="t('arcomn.sxczfs')"
                  :options="handleMethodOptions"
                  @change="changeHandleMethods($event, indexRecord)"
                />
              </a-form-item>
              <!-- 处置方式 end -->

              <!-- 应用分组 start -->
              <a-form-item
                class="item"
                :rules="rulesFrom.all_rules[indexRecord].group"
                :name="['rules_detail', indexRecord, 'group']"
              >
                <hostGroupSelect
                  v-model:selectedGroupIds="state.group"
                  :placeholder="t('strategy.psleyyfzAll')"
                  :multiple="true"
                />
              </a-form-item>
              <!-- 应用分组 end -->

              <!-- 选择属性 start -->
              <a-form-item
                class="item"
                :rules="rulesFrom.all_rules[indexRecord].attribute"
                :name="['rules_detail', indexRecord, 'attribute']"
              >
                <a-select
                  allowClear
                  :placeholder="t('arcomn.pslesx')"
                  v-model:value="state.attribute"
                  @change="changeAttrEvent($event, indexRecord)"
                  :options="dymicAttrs[indexRecord]"
                />
                <!-- <template v-for="item in dymicAttrs" :key="item">
                    <a-select-option :value="item"> {{ t('arcomn.' + item) }}</a-select-option>
                  </template>
                </a-select> -->
              </a-form-item>
              <!-- 选择属性 end -->

              <!-- 增加条数 start -->
              <a-button
                :class="{ notOne: !!indexRecord }"
                type="text"
                class="btn"
                @click="deleteRules(indexRecord)"
              >
                <template #icon><CloseOutlined /></template>
              </a-button>
              <!-- 增加条数 end -->
            </div>
            <template v-for="(item, indexAttr) in state.attr_values" :key="indexAttr">
              <div class="secondRow">
                <!-- 且或 start -->
                <a-form-item
                  v-if="indexAttr"
                  :rules="rulesFrom.all_rules[indexRecord].logic"
                  :placeholder="t('arcomn.pslessx')"
                  class="itemLitt"
                  :name="['rules_detail', indexRecord, 'attr_values', indexAttr, 'logic']"
                >
                  <a-select disabled allowClear v-model:value="item.logic">
                    <a-select-option :value="'and'">{{ t('arcomn.and') }}</a-select-option>
                    <a-select-option :value="'or'">{{ t('arcomn.or') }}</a-select-option>
                  </a-select>
                </a-form-item>
                <div class="fuhe" v-else>{{ t('arcomn.fuhe') }}</div>
                <!-- 且或 end -->
                <!-- 规则 start -->
                <a-form-item
                  class="itemMid"
                  :rules="!indexAttr ? rulesFrom.all_rules[indexRecord].rules : undefined"
                  :name="['rules_detail', indexRecord, 'attr_values', indexAttr, 'rules']"
                >
                  <a-select
                    allowClear
                    :placeholder="t('arcomn.plsjrle')"
                    :disabled="!!indexAttr"
                    v-model:value="item.rules"
                    @change="changeRules($event, indexRecord)"
                  >
                    <template v-for="rule in item.rules_options" :key="rule">
                      <a-select-option :value="rule" :title="t('arcomn.' + AllRules[rule - 1])">
                        {{ t('arcomn.' + AllRules[rule - 1]) }}
                      </a-select-option>
                    </template>
                  </a-select>
                </a-form-item>
                <!-- 规则 end -->
                <!-- 属性值 start -->
                <a-form-item
                  class="item"
                  :rules="rulesFrom.all_rules[indexRecord][state.attribute ?? 'value']"
                  :name="['rules_detail', indexRecord, 'attr_values', indexAttr, 'value']"
                >
                  <a-popover
                    placement="topLeft"
                    :overlayClassName="openHelp ? 'showContent' : 'hideContent'"
                  >
                    <template #content>
                      <div class="toolTips">
                        {{ t('arcomn.' + (state.attribute ?? 'attr') + '_tips') }}
                      </div>
                    </template>
                    <a-auto-complete v-model:value.trim="item.value" :options="item.value_options">
                      <a-input
                        class="selfInput"
                        :placeholder="getDymicAttrPlaceholder(t, state.attribute, item.rules)"
                      />
                    </a-auto-complete>
                  </a-popover>
                </a-form-item>
                <!-- 属性值 end -->
                <!-- 增加属性值 start -->
                <a-button
                  type="text"
                  class="btn"
                  :class="{ plusBtn: !indexAttr }"
                  :disabled="!indexAttr && state.attr_values.length >= 10"
                  @click="addOrDelAttrs(indexRecord, indexAttr)"
                >
                  <template #icon>
                    <CloseOutlined v-if="indexAttr" />
                    <PlusOutlined v-else />
                  </template>
                </a-button>
                <!-- 增加属性值 end -->
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
    <a-button type="text" class="addOne" @click="addRules">
      <PlusOutlined />
      <span> {{ t('arcomn.addone') }}</span>
    </a-button>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, PropType, ref } from 'vue';
  import { CloseOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { IFormState } from '../../type';
  import { useI18n } from 'vue-i18n';
  import {
    getDymicAttrPlaceholder,
    getDymicAttrRegs,
    isHaveSameValue,
    useStaticConfigs,
  } from '@/components/handle-dymic-form/helpTips';
  import hostGroupSelect from '@/components/host-group-select';
  import { getPolicyAttrs, getCzfsMethods, getAttrRuleAndValue } from '@/api/attack_risk';
  import { getInitRules } from '../..';
  import { E_WB_Enum } from '@/views/strategy/common/types';
  const props = defineProps({
    formState: {
      type: Object as PropType<IFormState>,
      required: true,
    },
    rulesFrom: {
      type: Object as PropType<{ all_rules: { [k: string]: any }[] }>,
      required: true,
    },
    openHelp: {
      type: Boolean,
      required: true,
    },
    validate: {
      type: Function,
    },
    //表格行
    record: {
      type: Object,
      required: true,
    },
  });
  const { t } = useI18n();
  //所有的属性和规则
  const { rule: AllRules } = useStaticConfigs(E_WB_Enum.Black);
  //根据表格行记录的获取处置方式下拉框数据(处置方式)
  const handleMethodOptions = ref<any>([]);
  //动态获取属性
  const dymicAttrs = ref<string[][]>([]);
  //增加一条
  const addRules = () => {
    props.formState.rules_detail.push({
      methods: undefined,
      group: '',
      attribute: undefined,
      attr_values: [
        {
          rules: undefined,
          value: undefined,
          logic: 'or',
          rules_options: [],
          value_options: [],
        },
      ],
    });
    dymicAttrs.value.push([]);
    props.rulesFrom.all_rules.push(getInitRules(t, true));
  };

  //删除一条
  const deleteRules = (indexRecord) => {
    if (indexRecord) {
      props.formState.rules_detail.splice(indexRecord, 1);
      dymicAttrs.value.splice(indexRecord, 1);
      props.rulesFrom.all_rules.splice(indexRecord, 1);
    }
  };
  //增加属性或删除属性
  const addOrDelAttrs = (indexRecord, indexAttr) => {
    //删除
    if (indexAttr) {
      props.formState.rules_detail[indexRecord].attr_values.splice(indexAttr, 1);
    } else {
      //增加
      props.formState.rules_detail[indexRecord].attr_values.push({
        rules: props.formState.rules_detail[indexRecord].attr_values[0].rules,
        value: undefined,
        logic: 'or',
        rules_options: props.formState.rules_detail[indexRecord].attr_values[0].rules_options,
        value_options: props.formState.rules_detail[indexRecord].attr_values[0].value_options,
      });
    }
  };
  //改变属性值的正则函数
  const changeAttrValueReg = (attribute, rules, indexRecord) => {
    props.rulesFrom.all_rules[indexRecord][attribute] = [
      {
        validator: getDymicAttrRegs(attribute, rules),
        message: getDymicAttrPlaceholder(t, attribute, rules),
      },
      {
        validator: isHaveSameValue(props.formState.rules_detail[indexRecord].attr_values),
        message: t('strategy.samevav'),
      },
      {
        required: true,
        message: t('strategy.attrvnotem'),
      },
    ];
  };
  //规则改变，全部改变
  const changeRules = (v, indexRecord) => {
    //所有规则跟随第一个变化
    props.formState.rules_detail[indexRecord].attr_values.forEach((ele) => {
      ele.rules = v;
    });
    //规则改变，重生规则
    buildAllRegs(true);
  };
  //处置方式改变，属性的选项也改变
  const changeHandleMethods = (v, indexRecord) => {
    //先将属性清空
    props.formState.rules_detail[indexRecord].attribute = undefined;
    changeAttrEvent(undefined, indexRecord);
    getDymicAttrs(v, indexRecord);
  };
  //获取处置方式
  const getHandleMethOptions = async () => {
    const { items } = await getCzfsMethods({
      risk_type_list: props.record.dtype ? props.record.dtype + '' : undefined,
    });
    handleMethodOptions.value = items.map((ele) => ({ label: ele.name, value: ele.id }));
    //获取属性
    getDymicAttrs(props.formState.rules_detail[0].methods, 0);
  };
  getHandleMethOptions();
  //获取属性
  const getDymicAttrs = async (methods, indexRecord) => {
    const { attribute_filed } = await getPolicyAttrs({
      risk_type_list: props.record.dtype ? props.record.dtype + '' : undefined,
      black: 1, //1黑名单 2白名单
      kind: methods,
    });
    if (attribute_filed) {
      dymicAttrs.value[indexRecord] = attribute_filed.map((ele) => ({
        label: t('arcomn.' + ele),
        value: ele,
      }));
    } else {
      dymicAttrs.value[indexRecord] = [];
    }
  };
  //属性改变，正则也改变
  const changeAttrEvent = async (v, indexRecord) => {
    //先清空属性值，规则和属性值选项、规则选项
    props.formState.rules_detail[indexRecord].attr_values.forEach((ele) => {
      ele.rules_options = [];
      ele.value_options = [];
      ele.rules = undefined;
      ele.value = undefined;
    });

    if (v) {
      //属性改变，动态获取属性的规则和属性值
      const { attribute_rule, attribute_value } = await getAttrRuleAndValue({
        risk_type_list: props.record.dtype ? props.record.dtype + '' : undefined,
        filed: v,
        black: 1,
        mac_risk_key: props.record.mac_risk_key ?? '',
      });
      props.formState.rules_detail[indexRecord].attr_values.forEach((ele, index) => {
        //如果有规则，自动填充第一个 规则
        ele.rules_options = attribute_rule ?? [];
        ele.rules = ele.rules_options[0];
        //规则选项改造
        if (attribute_value && attribute_value.length) {
          ele.value_options = attribute_value.map((ele) => ({
            label: ele,
            value: ele,
          }));
          // 如果自动填充有值，自动填充第一个 属性值
          if (!index) {
            ele.value = ele.value_options[0].value;
          }
        } else {
          ele.value_options = [];
        }
      });
    }
    //属性改变，重生规则
    buildAllRegs(true);

    nextTick(() => {
      props.validate!();
    });
  };
  //生成正则的函数
  const buildAllRegs = (bool) => {
    // 先清空
    props.formState.rules_detail.forEach((ele, indexRecord) => {
      //每一条规则先初始化
      props.rulesFrom.all_rules[indexRecord] = getInitRules(t, bool);
      if (ele.attribute) {
        changeAttrValueReg(ele.attribute, ele.attr_values[0].rules, indexRecord);
      }
    });
  };
</script>

<style scoped lang="less">
  .container {
    position: relative;
    .addOne {
      cursor: pointer;
      background-color: #fff;
      display: inline-block;
      position: absolute;
      right: 10px;
      bottom: -10px;
    }
    .selfForm {
      max-height: 500px;
      overflow: auto;
      :deep(.ant-form-item-explain-connected) {
        height: 0;
        min-height: unset;
      }
      .formNode {
        padding: 16px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        display: flex;
        align-items: stretch;
        .index {
          background: rgba(0, 0, 0, 0.04);
          border-radius: 16px;
          padding: 12px 10px;
          width: 30px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rightOptions {
          flex: 1;
          .firstRow {
            display: flex;
            align-items: center;
            .item {
              flex: 1;
              margin: 0 8px 20px 8px;
            }
            .btn {
              margin-bottom: 20px;
              transform: scale(0);
            }

            &:hover {
              .notOne {
                transform: scale(1);
              }
            }
          }
          .secondRow {
            display: flex;
            align-items: center;
            .item {
              flex: 5;
              margin: 0 8px 20px 8px;
            }
            .itemLitt {
              margin: 0 8px 20px 8px;
              flex: 1;
            }
            .itemMid {
              margin: 0 8px 20px 8px;
              flex: 1.2;
            }
            .btn {
              margin-bottom: 20px;
              transform: scale(0);
            }
            .plusBtn {
              transform: scale(1);
            }
            .fuhe {
              padding-left: 16px;
              flex: 1;
              margin-bottom: 20px;
              font-size: 12px;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.2);
            }
            &:hover {
              .btn {
                transform: scale(1);
              }
            }
          }
        }
      }
    }
  }
  .toolTips {
    white-space: pre-line;
  }
  .selfInput {
    border-radius: 8px;
  }
</style>
