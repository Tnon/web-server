<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-22 14:50:53
 * @LastEditTime: 2023-08-01 18:08:46
-->
<template>
  <div class="con">
    <div class="formMain">
      <a-form>
        <!-- 规则名 start -->
        <a-form-item v-bind="validateInfos.rule_name">
          <div class="label">{{ t('reinforce.rulena') }}</div>
          <a-input
            :disabled="rule_type === E_Rule_Type.Preset"
            :placeholder="t('reinforce.rulenaPlac')"
            v-model:value="formData.rule_name"
          />
        </a-form-item>
        <!-- 规则名 end -->

        <!-- 告警等级 start -->
        <a-form-item v-bind="validateInfos.alarm_level">
          <div class="label">{{ t('reinforce.gjdj') }}</div>
          <a-select
            style="width: 100%; flex: 1"
            :placeholder="t('reinforce.gjdjplac')"
            optionFilterProp="label"
            allowClear
            v-model:value="formData.alarm_level"
            :options="alarm_levelOptions"
          />
        </a-form-item>
        <!-- 告警等级 end -->

        <!-- 目录创建 start -->
        <a-form-item v-bind="validateInfos.dir_path">
          <rule-textarea-no-form
            v-model:value="formData.dir_path"
            :disabled="rule_type === E_Rule_Type.Preset"
            v-bind="staticConfig['dir_path']"
          >
            <template #title>
              <div class="label">
                <span class="labeltext">{{ t('reinforce.mlcj') }}</span>
                <a-tooltip placement="right" theme="light" color="#fff">
                  <template #title>
                    <span class="tips">
                      {{ t('reinforce.mlcjtooltip') }}
                    </span>
                  </template>
                  <custom-icon class="tipsicon" type="#ax-tips" />
                </a-tooltip>
              </div>
            </template>
            <template #subtitle>
              <div>{{ t('reinforce.mlcjtip') }}</div>
            </template>
          </rule-textarea-no-form>
        </a-form-item>
        <!-- 目录创建 end -->

        <!-- 文件格式 start -->
        <a-form-item v-bind="validateInfos.file_format">
          <rule-textarea-no-form
            v-model:value="formData.file_format"
            :disabled="rule_type === E_Rule_Type.Preset"
            v-bind="staticConfig['file_format']"
          >
            <template #title>
              <div class="label">
                <span class="labeltext">{{ t('reinforce.wjgs') }}</span>
              </div>
            </template>
            <template #subtitle>
              <div>{{ t('reinforce.wjgstip') }}</div>
            </template>
          </rule-textarea-no-form>
        </a-form-item>
        <!-- 文件格式 end -->

        <!-- 文件操作 start -->
        <a-form-item v-bind="validateInfos.probes">
          <div class="label">{{ t('reinforce.gzsz') }}</div>
          <file-actions v-model:value="formData.probes" />
        </a-form-item>
        <!-- 文件操作 end -->

        <!-- 主机范围 start -->
        <a-form-item v-bind="validateInfos.apply_type">
          <div class="label">{{ t('reinforce.zjfw') }}</div>
          <a-select
            style="width: 100%; flex: 1"
            :placeholder="t('reinforce.zjfwplac')"
            optionFilterProp="label"
            allowClear
            v-model:value="formData.apply_type"
            :options="apply_typeOptions"
          />
        </a-form-item>
        <!-- 主机范围 end -->

        <!-- 主机组中选择 start -->
        <a-form-item
          v-bind="validateInfos.host_group"
          v-if="formData.apply_type === E_Host_Range.Group"
        >
          <hostGroupSelect
            :placeholder="t('reinforce.qksngs')"
            v-model:selectedGroupIds="formData.host_group"
            :multiple="true"
          />
        </a-form-item>
        <!-- 主机组中选择 end -->

        <!-- 主机中选择 start -->
        <a-form-item
          v-bind="validateInfos.host_list"
          v-if="formData.apply_type === E_Host_Range.Host"
        >
          <hostSelect v-model:selectedMacs="formData.host_list" />
        </a-form-item>
        <!-- 主机中选择 end -->

        <!-- 监控模式 start -->
        <a-form-item v-bind="validateInfos.monitor_mod">
          <div class="label">{{ t('reinforce.jkms') }}</div>
          <a-radio-group v-model:value="formData.monitor_mod">
            <a-radio :value="E_Bait_Mode.JSB">{{ t('arcomn.SBAOStatus') }}</a-radio>
            <a-radio :value="E_Bait_Mode.AUTO">{{ t('arcomn.zdcz') }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <!-- 监控模式 end -->

        <!-- 备注信息 start -->
        <a-form-item>
          <div class="label">{{ t('reinforce.bzxx') }}</div>
          <a-input :placeholder="t('reinforce.bzxxplac')" v-model:value="formData.desc" />
        </a-form-item>
        <!-- 规则名 end -->
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Form } from 'ant-design-vue';
  import { PropType, reactive, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useStaticOptions } from '@/views/reinforce/file/views/rule/cmts/advanSearch/datasource';
  import { I_Form_Data } from './type';
  import ruleTextareaNoForm from '@/components/ruleTextareaNoForm';
  import { getStaticConfig, validateprobes, validateLength, validateRuleLength } from '.';
  import fileActions from '../fileActions';
  import hostGroupSelect from '@/components/host-group-select';
  import hostSelect from '@/components/hostSelect';
  import { E_Host_Range } from '@/views/reinforce/baseline/cmts/tableContent/type';
  import { ValidateRuleName } from '@/utils/reg';
  import { E_Bait_Mode, E_Rule_Type } from '../../../rule/type';
  const props = defineProps({
    formData: {
      type: Object as PropType<I_Form_Data>,
      required: true,
    },
    rule_type: {
      type: Number as PropType<E_Rule_Type>,
      required: true,
    },
  });
  const { t } = useI18n();
  const { alarm_levelOptions, apply_typeOptions } = useStaticOptions(t);
  const staticConfig = getStaticConfig(t);

  const host_groupRequiredCmp = computed(() => props.formData.apply_type === E_Host_Range.Group);
  const host_listRequiredCmp = computed(() => props.formData.apply_type === E_Host_Range.Host);

  //动态正则初始化
  const rulesRef = reactive({
    rule_name: [
      {
        validator: ValidateRuleName,
        message: t('reinforce.pspgrule'),
      },
    ],
    alarm_level: [
      {
        required: true,
        message: t('reinforce.gjdjplac'),
      },
    ],
    dir_path: [
      {
        validator: validateLength(staticConfig['dir_path'].max),
        message: t('strategy.ccMax'),
      },
      {
        validator: validateRuleLength(t),
      },
    ],
    probes: [
      {
        validator: validateprobes,
        message: t('reinforce.aavdfh'),
      },
    ],
    apply_type: [
      {
        required: true,
        message: t('reinforce.zjfwplac'),
      },
    ],
    host_group: [
      {
        required: host_groupRequiredCmp,
        message: t('reinforce.qksngs'),
      },
    ],

    host_list: [
      {
        required: host_listRequiredCmp,
        message: t('reinforce.hstplac'),
      },
    ],
    monitor_mod: [
      {
        required: true,
        message: t('reinforce.jkmsPlac'),
      },
    ],
  });
  //表单hook
  const useForm = Form.useForm;

  const { validate, validateInfos } = useForm(props.formData, rulesRef);

  //选择fe
  defineExpose({ validate });
</script>

<style scoped lang="less">
  .con {
    display: flex;
    justify-content: center;
    overflow: auto;
    .formMain {
      width: 800px;
      align-self: center;
      height: calc(100vh - 106px);
      background-color: #fff;
      padding: 16px 24px;
      :deep(.container) {
        margin: 0;
        .header {
          padding: 0;
          height: unset;
          .label {
            margin: 0 !important;
          }
        }
        .content {
          padding: 0;
        }
      }
      .label {
        font-size: @fz14;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        margin-bottom: 8px;
        .labeltext {
          margin-right: 8px;
        }
        .tipsicon {
          color: #000 !important;
        }
      }
      :deep(.ant-input) {
        border-radius: 8px;
      }
    }
  }
  .tips {
    color: #000 !important;
    white-space: pre-line;
  }
</style>
