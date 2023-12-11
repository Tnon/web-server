<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-09 10:51:48
 * @LastEditTime: 2023-10-26 15:16:26
-->
<template>
  <div class="container">
    <div class="selfForm">
      <template v-for="(stateRecord, indexRecord) in formState.rules_detail" :key="indexRecord">
        <div class="formNode">
          <div class="index">{{ t('arcomn.rindex', [indexRecord + 1]) }}</div>
          <div class="rightOptionsContainer">
            <template v-for="(state, indexAttr) in stateRecord" :key="state.key">
              <div class="rightOptions" v-if="getRuleTypeResult(indexAttr)">
                <div class="firstRow">
                  <!-- 满足 start -->
                  <div class="fuhe">{{ indexAttr ? t('arcomn.and') : t('arcomn.fuhe') }}</div>
                  <!-- 满足 end -->

                  <!-- 选择属性 start -->
                  <a-form-item
                    class="item"
                    :rules="rulesFrom.all_rules[indexRecord].attribute"
                    :name="['rules_detail', indexRecord, indexAttr, 'attribute']"
                  >
                    <a-select
                      allowClear
                      :placeholder="t('arcomn.pslesx')"
                      v-model:value="state.attribute"
                      optionFilterProp="label"
                      show-search
                      @change="changeAttrEvent($event, indexRecord, indexAttr)"
                      :options="dymicAttrs[indexRecord]"
                    />
                  </a-form-item>
                  <!-- 选择属性 end -->

                  <!-- 增加属性 start -->
                  <a-button
                    type="text"
                    v-if="formState.rule_type === 2"
                    class="btn"
                    :disabled="maxToDisabled(indexRecord, indexAttr)"
                    :class="{ notOT: getCanDelAttr(indexAttr), plusBtn: !indexAttr }"
                    @click="addOrdeleteAttr(indexRecord, indexAttr)"
                  >
                    <template #icon>
                      <PlusOutlined v-if="!indexAttr" />
                      <CloseOutlined v-else />
                    </template>
                  </a-button>
                  <!-- 增加属性 end -->
                </div>
                <template v-for="(item, indexValue) in state.attr_values" :key="indexValue">
                  <div class="secondRow">
                    <!-- 占位 start -->
                    <div class="fuhe"></div>
                    <!-- 占位 end -->
                    <!-- 且或 start -->
                    <a-form-item
                      v-if="indexValue"
                      :rules="rulesFrom.all_rules[indexRecord].logic"
                      :placeholder="t('arcomn.pslessx')"
                      class="itemLitt"
                      :name="[
                        'rules_detail',
                        indexRecord,
                        indexAttr,
                        'attr_values',
                        indexValue,
                        'logic',
                      ]"
                    >
                      <a-select
                        allowClear
                        :disabled="indexValue > 1"
                        v-model:value="item.logic"
                        @change="changeLogic($event, indexRecord, indexAttr)"
                      >
                        <a-select-option :value="'and'">{{ t('arcomn.and') }}</a-select-option>
                        <a-select-option :value="'or'">{{ t('arcomn.or') }}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <div class="fuhe logic" v-else></div>
                    <!-- 且或 end -->
                    <!-- 规则 start -->
                    <a-form-item
                      class="itemMid"
                      :rules="!indexValue ? rulesFrom.all_rules[indexRecord].rules : undefined"
                      :name="[
                        'rules_detail',
                        indexRecord,
                        indexAttr,
                        'attr_values',
                        indexValue,
                        'rules',
                      ]"
                    >
                      <a-select
                        allowClear
                        :placeholder="t('arcomn.plsjrle')"
                        :disabled="!!indexValue"
                        v-model:value="item.rules"
                        @change="changeRules($event, indexRecord, indexAttr)"
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
                      :name="[
                        'rules_detail',
                        indexRecord,
                        indexAttr,
                        'attr_values',
                        indexValue,
                        'value',
                      ]"
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
                        <a-auto-complete
                          v-model:value.trim="item.value"
                          :options="item.value_options"
                        >
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
                      :class="{ plusBtn: !indexValue }"
                      :disabled="!indexValue && stateRecord[indexAttr].attr_values.length >= 10"
                      @click="addOrDelAttrValue(indexRecord, indexAttr, indexValue)"
                    >
                      <template #icon>
                        <CloseOutlined v-if="indexValue" />
                        <PlusOutlined v-else />
                      </template>
                    </a-button>
                    <!-- 增加属性值 end -->
                  </div>
                </template>
              </div>
            </template>
          </div>
          <!-- 删除条数 start -->
          <a-button
            type="text"
            :class="{ notOne: !!indexRecord }"
            class="delbtn"
            @click="deleteRecord(indexRecord)"
          >
            <template #icon>
              <CloseOutlined />
            </template>
          </a-button>
          <!-- 删除条数 end -->
        </div>
      </template>
    </div>
    <a-button type="text" v-if="!formState.id" class="addOne" @click="addRules">
      <PlusOutlined />
      <span> {{ t('arcomn.addone') }}</span>
    </a-button>
  </div>
</template>

<script setup lang="ts">
  import { PropType, ref, watch, watchEffect, nextTick } from 'vue';
  import { CloseOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { IFormState } from '../../type';
  import { useI18n } from 'vue-i18n';
  import {
    getDymicAttrPlaceholder,
    getDymicAttrRegs,
    isHaveSameValue,
    useStaticConfigs,
  } from '@/components/handle-dymic-form/helpTips';
  import { getAttrRuleAndValue, getPolicyAttrs } from '@/api/attack_risk';
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
    record: {
      type: Object,
      required: true,
    },
  });
  const { t } = useI18n();
  //所有的属性和规则
  const { rule: AllRules } = useStaticConfigs(E_WB_Enum.White);
  //动态获取属性
  const dymicAttrs = ref<{ label: string; value: string; disabled: boolean }[][]>([]);
  //增加一条
  const addRules = () => {
    const initFirstDymicAttrs = ref<{ label: string; value: string; disabled: boolean }[]>([]);
    if (dymicAttrs.value.length) {
      dymicAttrs.value[0].forEach((ele) => {
        initFirstDymicAttrs.value.push({
          label: ele.label,
          value: ele.value,
          disabled: false,
        });
      });
      dymicAttrs.value.push(initFirstDymicAttrs.value);
    }
    props.rulesFrom.all_rules.push(getInitRules(t));
    //单项规则
    if (props.formState.rule_type === 1) {
      props.formState.rules_detail.push([
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
      ]);
    } else {
      props.formState.rules_detail.push([
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
      ]);
    }
  };
  //新增或者删除属性
  const addOrdeleteAttr = (indexRecord, indexAttr) => {
    if (indexAttr) {
      props.formState.rules_detail[indexRecord].splice(indexAttr, 1);
    } else {
      props.formState.rules_detail[indexRecord].push({
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
    buildAllRegs();
    judgeAttrCanSelect(indexRecord);
  };
  //
  //增加属性值或删除属性值
  const addOrDelAttrValue = (indexRecord, indexAttr, indexValue) => {
    if (indexValue) {
      props.formState.rules_detail[indexRecord][indexAttr].attr_values.splice(indexValue, 1);
    } else {
      props.formState.rules_detail[indexRecord][indexAttr].attr_values.push({
        rules: props.formState.rules_detail[indexRecord][indexAttr].attr_values[0].rules,
        value: undefined,
        logic: props.formState.rules_detail[indexRecord][indexAttr].attr_values[0].logic ?? 'or',
        rules_options:
          props.formState.rules_detail[indexRecord][indexAttr].attr_values[0].rules_options,
        value_options:
          props.formState.rules_detail[indexRecord][indexAttr].attr_values[0].value_options,
      });
    }
  };
  //改变属性值的正则函数
  const changeAttrValueReg = (indexRecord, indexAttr, attribute, rules) => {
    props.rulesFrom.all_rules[indexRecord][attribute] = [
      {
        validator: getDymicAttrRegs(attribute, rules),
        message: getDymicAttrPlaceholder(
          t,
          props.formState.rules_detail[indexRecord][indexAttr].attribute,
          rules,
        ),
      },
      {
        validator: isHaveSameValue(
          props.formState.rules_detail[indexRecord][indexAttr].attr_values,
        ),
        message: t('strategy.samevav'),
      },
      {
        required: true,
        message: t('strategy.attrvnotem'),
      },
    ];
  };
  // 规则改变，全部改变
  const changeRules = (v, indexRecord, indexAttr) => {
    props.formState.rules_detail[indexRecord][indexAttr].attr_values.forEach((ele) => {
      ele.rules = v;
    });
    //规则改变，重生规则
    buildAllRegs();
  };
  //且或改变，统一改变
  const changeLogic = (v, indexRecord, indexAttr) => {
    props.formState.rules_detail[indexRecord][indexAttr].attr_values.forEach((ele) => {
      ele.logic = v;
    });
    nextTick(() => {
      props.validate!();
    });
  };

  //删除条数
  const deleteRecord = (indexRecord) => {
    props.formState.rules_detail.splice(indexRecord, 1);
    dymicAttrs.value.splice(indexRecord, 1);
    props.rulesFrom.all_rules.splice(indexRecord, 1);
  };
  //计算规则显示
  const getRuleTypeResult = (indexAttr) => {
    if (props.formState.rule_type === 1) {
      if (indexAttr < 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  //计算是否能狗删除属性
  const getCanDelAttr = (indexAttr) => {
    if (props.formState.rule_type === 2) {
      if (indexAttr > 1) {
        return true;
      } else {
        if (indexAttr === 0) {
          return true;
        }
        return false;
      }
    }
  };
  //混合规则2-5条
  const maxToDisabled = (indexRecord, indexAttr) => {
    if (!indexAttr) {
      if (props.formState.rule_type === 2) {
        if (props.formState.rules_detail[indexRecord].length >= 5) {
          return true;
        }
        return false;
      }
    } else {
      return false;
    }
  };
  //动态获取属性
  const getDymicAttrs = async (risk_type_list) => {
    const { attribute_filed } = await getPolicyAttrs({
      risk_type_list,
      black: 2, //1黑名单 2白名单
    });
    if (attribute_filed) {
      // dymicAttrs.value = attribute_filed.map((ele) => ({ label: t('arcomn.' + ele), value: ele }));
      props.formState.rules_detail.forEach(() => {
        dymicAttrs.value.push(
          attribute_filed.map((ele) => ({
            label: t('arcomn.' + ele),
            value: ele,
            disabled: false,
          })),
        );
      });
    }
  };
  watchEffect(async () => {
    if (props.formState.attack) {
      await getDymicAttrs(props.formState.attack);
    }
  });
  //攻击类型改变，自动填充清空
  watch(
    () => props.formState.attack,
    () => {
      //属性和规则清空
      props.formState.rules_detail.forEach((ele) => {
        ele.forEach((record) => {
          //属性清空
          record.attribute = undefined;
          record.attr_values.forEach((rule) => {
            //规则清空
            rule.rules = undefined;
            //规则选项清空
            rule.rules_options = [];
            //属性值清空
            rule.value = undefined;
            //属性自动填充清空
            rule.value_options = [];
          });
        });
      });
      //属性选项清空
      dymicAttrs.value = [];
      //攻击类型变动，重生规则
      buildAllRegs();
      nextTick(() => {
        props.validate!();
      });
    },
  );

  //属性改变，正则也改变
  const changeAttrEvent = async (v, indexRecord, indexAttr) => {
    //属性改变，规则要清空(区分属性改变还是规则改变)
    props.formState.rules_detail[indexRecord][indexAttr].attr_values.forEach((ele) => {
      ele.rules = undefined;
      ele.rules_options = [];
      ele.value = undefined;
      ele.value_options = [];
    });
    if (v) {
      //属性改变，动态获取属性的规则和属性值
      const { attribute_rule, attribute_value } = await getAttrRuleAndValue({
        risk_type_list: props.formState.attack,
        filed: v,
        black: 2,
        mac_risk_key: props.record.mac_risk_key ?? '',
      });
      props.formState.rules_detail[indexRecord][indexAttr].attr_values.forEach((ele, index) => {
        //如果有规则，自动填充第一个 规则
        ele.rules_options = attribute_rule ?? [];
        ele.rules = ele.rules_options[0];
        if (attribute_value && attribute_value.length) {
          ele.value_options = attribute_value.map((ele) => ({
            label: ele,
            value: ele,
          }));

          // 如果自动填充有值，自动填充第一个 属性值
          if (!index) {
            ele.value = ele.value_options[0].value;
          }
        }
      });
    }
    //属性值改变，重生规则
    buildAllRegs();
    judgeAttrCanSelect(indexRecord);

    nextTick(() => {
      props.validate!();
    });
  };
  watch(
    () => props.formState.rule_type,
    () => {
      props.formState.rules_detail.forEach((_, indexRecord) => {
        judgeAttrCanSelect(indexRecord);
      });
      //规则类型改变，重生规则
      buildAllRegs();
    },
  );
  //已经选择的属性 不能再选
  const judgeAttrCanSelect = (indexRecord) => {
    //找出已经选完的属性
    const selectedAttrs = props.formState.rules_detail[indexRecord].map((ele) => {
      return ele.attribute;
    });
    //同一条记录，已经选择的属性，不能重复选
    dymicAttrs.value[indexRecord]?.forEach((ele) => {
      if (selectedAttrs.includes(ele.value)) {
        ele.disabled = true;
      } else {
        // 进程名和进程全路径只能存在一个
        if (
          selectedAttrs.includes('process_name') &&
          ele.value === 'process_all_path' &&
          props.formState.rule_type === 2
        ) {
          ele.disabled = true;
        } else if (
          selectedAttrs.includes('process_all_path') &&
          ele.value === 'process_name' &&
          props.formState.rule_type === 2
        ) {
          ele.disabled = true;
        } else {
          ele.disabled = false;
        }
      }
    });
  };

  //生成正则的函数
  const buildAllRegs = () => {
    // 先清空
    props.formState.rules_detail.forEach((ele, indexRecord) => {
      //每一条规则先初始化
      props.rulesFrom.all_rules[indexRecord] = getInitRules(t);
      ele.forEach((attr, indexAttr) => {
        //如果单选规则和多项规则，生成每个属性的规则，rule取第一个就行
        if (attr.attribute) {
          changeAttrValueReg(indexRecord, indexAttr, attr.attribute, attr.attr_values[0].rules);
        }
      });
    });
  };
  //编辑
  if (props.formState.id !== undefined) {
    //编辑，重生规则
    buildAllRegs();
  }
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
          flex: 30px 0 0;
          text-align: center;
          margin-right: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .delbtn {
          transform: scale(0);
        }
        &:hover {
          .notOne {
            transform: scale(1);
          }
        }

        .rightOptionsContainer {
          flex: 1;
          .rightOptions {
            flex: 1;
            .firstRow {
              display: flex;
              align-items: center;
              .fuhe {
                flex: 60px 0 0;
                padding-left: 12px;
                margin: 0 0 20px 0;
                font-size: @fz12;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.2);
              }
              .item {
                flex: 1;
                margin: 0 8px 20px 8px;
              }
              .btn {
                margin-bottom: 20px;
                transform: scale(0);
              }
              .plusBtn {
                transform: scale(1);
              }
              &:hover {
                .notOT {
                  transform: scale(1);
                }
              }
            }
            .secondRow {
              display: flex;
              align-items: center;
              padding-right: 32px;
              .item {
                flex: 5;
                margin: 0 8px 20px 8px;
              }
              .itemLitt {
                margin: 0 8px 20px 8px;
                flex: 70px 0 0;
              }
              .itemMid {
                margin: 0 8px 20px 8px;
                flex: 2;
              }
              .btn {
                margin-bottom: 20px;
                transform: scale(0);
              }
              .plusBtn {
                transform: scale(1);
              }
              .fuhe {
                flex: 60px 0 0;
                padding-left: 12px;
                margin: 0 0 20px 0;
                font-size: @fz12;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.2);
              }
              .logic {
                margin: 0 8px 20px 8px;
                flex: 70px 0 0;
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
  }

  .toolTips {
    white-space: pre-line;
  }
  .selfInput {
    border-radius: 8px;
  }
</style>
