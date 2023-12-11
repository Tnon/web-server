<template>
  <a-form layout="vertical">
    <!-- 任务名称 start -->
    <a-form-item v-bind="validateInfos.name">
      <template #label> {{ t('reinforce.rwmc') }} </template>
      <a-input
        class="radiipt"
        v-model:value="modelRef.name"
        :placeholder="t('reinforce.rwmcplac')"
      />
    </a-form-item>
    <!-- 任务名称 end  -->
    <div class="sameRow">
      <!-- 检查范围 start -->
      <a-form-item v-bind="validateInfos.scope" class="itemrow">
        <template #label> {{ t('reinforce.jcfw') }} </template>
        <a-select
          style="width: 100%; flex: 1"
          :placeholder="t('reinforce.jcfwolac')"
          optionFilterProp="label"
          allowClear
          v-model:value="modelRef.scope"
          :options="apply_typeOptions"
          @change="initRuleCode"
        />
      </a-form-item>
      <!-- 检查范围 end  -->
      <!-- 主机组中选择 start -->
      <a-form-item
        v-bind="validateInfos.host_group"
        class="itemrow sufix"
        v-if="modelRef.scope === E_Host_Range.Group"
      >
        <template #label> {{ t('operation.hostg') }} </template>
        <hostGroupSelect
          v-model:selectedGroupIds="modelRef.host_group"
          :placeholder="t('reinforce.qksngs')"
          :multiple="true"
          @change="initRuleCode"
        />
      </a-form-item>
      <!-- 主机组中选择 end -->

      <!-- 主机中选择 start -->
      <a-form-item
        class="itemrow sufix"
        v-bind="validateInfos.host_list"
        v-if="modelRef.scope === E_Host_Range.Host"
      >
        <template #label> {{ t('reinforce.zdzj') }} </template>
        <hostSelect v-model:selectedMacs="modelRef.host_list" @change="initRuleCode" />
      </a-form-item>
      <!-- 主机中选择 end -->
    </div>

    <!-- 基线规则 start -->
    <a-form-item v-bind="validateInfos.rule_codes">
      <template #label> {{ t('reinforce.rule_count') }} </template>
      <a-select
        style="width: 100%"
        :placeholder="t('reinforce.rule_countPlac')"
        :maxTagCount="5"
        allowClear
        optionFilterProp="label"
        show-search
        mode="multiple"
        :autoClearSearchValue="false"
        v-model:value="rule_codesCmp"
        :options="rule_codesOptions"
        @dropdownVisibleChange="dropdownVisibleChange"
      >
        <template #tagRender="{ label, onClose }">
          <a-tag class="ruleTag" closable @close="onClose">
            {{ label }}
          </a-tag>
        </template>
      </a-select>
    </a-form-item>
    <!-- 任务名称 end  -->

    <!-- 任务类型 start -->
    <a-form-item v-bind="validateInfos.exec_type">
      <template #label> {{ t('reinforce.rwlx') }} </template>
      <a-select
        style="width: 100%"
        :disabled="id !== undefined"
        :placeholder="t('reinforce.rwlxplac')"
        allowClear
        optionFilterProp="label"
        show-search
        v-model:value="modelRef.exec_type"
        :options="task_typeOptions"
      />
    </a-form-item>
    <!-- 任务类型 end  -->
    <template v-if="modelRef.exec_type === E_Task_Type.Regular">
      <div class="sameRow">
        <!-- 周期类型 start -->
        <a-form-item v-bind="validateInfos.exec_cycle" class="itemrow">
          <template #label> {{ t('reinforce.rwuzi') }} </template>
          <a-select
            style="width: 100%; flex: 1"
            :placeholder="t('reinforce.fpjdhgg')"
            allowClear
            optionFilterProp="label"
            show-search
            v-model:value="modelRef.exec_cycle"
            :options="round_typeOptions"
          />
        </a-form-item>
        <!-- 周期类型 end  -->
        <!-- 星期 start -->
        <a-form-item
          v-bind="validateInfos.week"
          v-if="modelRef.exec_cycle === E_Round_Type.Week"
          class="itemrow sufix"
        >
          <template #label> {{ t('setting.weekly') }} </template>
          <a-select
            style="width: 100%; flex: 1"
            :placeholder="t('reinforce.fpjdhgg')"
            allowClear
            optionFilterProp="label"
            show-search
            v-model:value="modelRef.week"
            :options="week"
          />
        </a-form-item>
        <!-- 周期 end  -->
        <!-- 月 start -->
        <a-form-item
          class="itemrow sufix"
          v-bind="validateInfos.month"
          v-if="modelRef.exec_cycle === E_Round_Type.Month"
        >
          <template #label> {{ t('setting.monthly') }} </template>
          <a-select
            style="width: 100%"
            :placeholder="t('reinforce.fpjdhgg')"
            allowClear
            optionFilterProp="label"
            show-search
            v-model:value="modelRef.month"
            :options="month"
          />
        </a-form-item>
        <!-- 月 end  -->

        <!-- 时间 start -->
        <a-form-item v-bind="validateInfos.time" class="sufix">
          <template #label> {{ t('asset.zxsj') }} </template>
          <a-time-picker class="radiipt" v-model:value="modelRef.time" value-format="HH:mm:ss" />
        </a-form-item>
        <!-- 时间 end  -->
      </div>
    </template>

    <!-- 超时时间 start -->
    <a-form-item v-bind="validateInfos.exceed">
      <template #label> {{ t('reinforce.sdfs') }} </template>
      <a-select
        style="width: 100%"
        :placeholder="t('reinforce.sdfsplac')"
        allowClear
        optionFilterProp="label"
        show-search
        v-model:value="modelRef.exceed"
        :options="overtimeOptions"
      />
    </a-form-item>
    <!-- 周期类型 end  -->
    <!-- 备注信息 start -->
    <a-form-item v-bind="validateInfos.description">
      <template #label> {{ t('reinforce.bzxx') }}</template>
      <a-input
        class="radiipt"
        :placeholder="t('reinforce.bzxxplac')"
        v-model:value="modelRef.description"
      />
    </a-form-item>
    <!-- 规则名 end -->
  </a-form>
</template>

<script setup lang="ts">
  import { E_Host_Range } from '@/views/reinforce/baseline/cmts/tableContent/type';
  import { Form } from 'ant-design-vue';
  import { computed, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useStaticOptions, ValidateRuleName } from '.';
  import { I_Task_Form, E_Round_Type, E_Task_Type } from './type';
  import hostGroupSelect from '@/components/host-group-select';
  import hostSelect from '@/components/hostSelect';
  import { getTaskFormDetail, getRules } from '@/api/reinforce';
  const props = defineProps({
    id: {
      type: Number,
    },
  });
  const { t } = useI18n();
  const useForm = Form.useForm;

  const modelRef = reactive<I_Task_Form>({
    name: '',
    scope: undefined,
    host_group: '',
    host_list: [],
    rule_codes: undefined,
    exec_type: undefined,
    exec_cycle: undefined,
    week: undefined,
    time: '08:00:00',
    month: undefined,
    exceed: undefined,
    description: '',
  });

  //主机组required
  const host_groupRequired = computed(() => modelRef.scope === E_Host_Range.Group);
  //主机required
  const host_listRequired = computed(() => modelRef.scope === E_Host_Range.Host);
  //任务周期required
  const exec_cycleRequired = computed(() => modelRef.exec_type === E_Task_Type.Regular);
  //周required
  const weekRequired = computed(
    () => modelRef.exec_type === E_Task_Type.Regular && modelRef.exec_cycle === E_Round_Type.Week,
  );
  //月required
  const monthRequired = computed(
    () => modelRef.exec_type === E_Task_Type.Regular && modelRef.exec_cycle === E_Round_Type.Month,
  );
  const rulesRef = reactive({
    name: [
      {
        validator: ValidateRuleName,
        message: t('reinforce.rwmcplaca'),
      },
    ],
    scope: [
      {
        required: true,
        message: t('reinforce.jcfwolac'),
      },
    ],
    host_group: [
      {
        required: host_groupRequired,
        message: t('reinforce.qksngs'),
      },
    ],
    host_list: [
      {
        required: host_listRequired,
        message: t('reinforce.hstplac'),
      },
    ],
    rule_codes: [
      {
        required: true,
        message: t('reinforce.rule_countPlac'),
      },
    ],
    exec_type: [
      {
        required: true,
        message: t('reinforce.rwlxplac'),
      },
    ],
    exec_cycle: [
      {
        required: exec_cycleRequired,
        message: t('reinforce.fpjdhgg'),
      },
    ],
    week: [
      {
        required: weekRequired,
        message: t('reinforce.fpjdhgg'),
      },
    ],
    month: [
      {
        required: monthRequired,
        message: t('reinforce.fpjdhgg'),
      },
    ],
    time: [
      {
        required: true,
        message: t('reinforce.skfjg'),
      },
    ],
    exceed: [
      {
        required: true,
        message: t('reinforce.sdfsplac'),
      },
    ],
    description: [
      {
        required: false,
      },
    ],
  });
  //基线规则的选项
  const rule_codesOptions = ref<any>([]);
  // 上次选择的选项，主要是为了处理主机组中主机移动/删除后，主机对应的基线规则依然被应用的情况
  const lastSelectRule = ref<any>([]);

  //处理状态 计算属性
  const rule_codesCmp = computed({
    get: () => (modelRef.rule_codes ? modelRef.rule_codes.split(',') : []),
    set: (val) => {
      modelRef.rule_codes = val.join(',');
    },
  });
  const { validate, validateInfos } = useForm(modelRef, rulesRef);
  //获取静态的下拉框
  const { apply_typeOptions, task_typeOptions, round_typeOptions, week, month, overtimeOptions } =
    useStaticOptions(t);

  //基线规则根据主机范围等控制
  // watch([() => modelRef.scope, () => modelRef.host_group, () => modelRef.host_group], () => {
  //   modelRef.rule_codes = undefined;
  // });
  const initRuleCode = () => {
    modelRef.rule_codes = undefined;
  };
  //展开基线规则
  const dropdownVisibleChange = async (v) => {
    if (v) {
      if (modelRef.scope) {
        if (
          modelRef.scope === E_Host_Range.All ||
          (modelRef.scope === E_Host_Range.Group && modelRef.host_group) ||
          (modelRef.scope === E_Host_Range.Host && modelRef.host_list)
        ) {
          const { code, ...res } = await getRules({
            scope: modelRef.scope,
            host_group: modelRef.host_group,
            host_list: modelRef.host_list,
          });
          if (!code) {
            rule_codesOptions.value = res.items.map((ele) => ({
              label: ele.rule_name,
              value: ele.rule_code,
            }));
            // 处理主机组中主机移动/删除后，主机对应的基线规则依然被应用的情况
            for (let i = 0; i < lastSelectRule.value.length; i++) {
              let flag = true;
              for (let j = 0; j < res.items.length; j++) {
                if (lastSelectRule.value[i].value === res.items[j].rule_code) {
                  flag = false;
                  break;
                }
              }
              if (flag) {
                // 修改方案：若出现主机组中主机移动/删除后，主机对应的基线规则依然被应用的情况
                // 此选择项正确展示，可删除，但是选项置灰不可选；
                rule_codesOptions.value.push({
                  label: lastSelectRule.value[i].label,
                  value: lastSelectRule.value[i].value,
                  disabled: true,
                });
              }
            }
          }
        }
      }
    }
  };

  //如果是编辑，获取详情
  const getTaskDetail = async () => {
    if (props.id) {
      const { code, ...res } = await getTaskFormDetail(props.id + '');
      if (!code) {
        for (let k in modelRef) {
          if (k === 'rule_codes') {
            modelRef[k] = res[k].map((ele) => ele.value).join(',');
            lastSelectRule.value = res[k];
          } else {
            modelRef[k] = res[k];
          }
        }
      }
      await dropdownVisibleChange(true);
    }
  };
  getTaskDetail();
  defineExpose({ modelRef, validate });
</script>

<style scoped lang="less">
  .sameRow {
    display: flex;
    align-items: flex-end;
    .itemrow {
      flex: 1;
    }
    .sufix {
      margin-left: 16px;
    }
  }
  .radiipt {
    border-radius: 8px;
  }
  .ruleTag {
    box-sizing: border-box;
    max-width: 100%;
    height: 20.8px;
    margin-top: 3px;
    margin-bottom: 3px;
    line-height: 18.8px;
    background: #f5f5f5;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    cursor: default;
  }
</style>
