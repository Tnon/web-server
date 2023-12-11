<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-25 18:14:36
 * @LastEditTime: 2023-08-28 10:59:43
-->
<template>
  <div class="con">
    <div class="formMain">
      <a-form layout="vertical">
        <!-- 规则名 start -->
        <a-form-item v-bind="validateInfos.name">
          <template #label>
            <div class="label">{{
              id === E_Show_Ip.Custom ? t('operation.zdkfycs') : t('operation.zdkfycsn')
            }}</div>
          </template>
          <a-input :placeholder="t('operation.plczdkfycs')" v-model:value="formData.name" />
        </a-form-item>
        <!-- 规则名 end -->

        <!-- 监控文件 start -->
        <a-form-item
          v-bind="validateInfos[props.id === E_Show_Ip.Custom ? 'ip' : 'net']"
          class="customForm"
        >
          <rule-textarea-no-form
            v-model:value="formData[props.id === E_Show_Ip.Custom ? 'ip' : 'net']"
            v-bind="staticConfig"
          >
            <template #title>
              {{ id === E_Show_Ip.Custom ? t('operation.zdhip') : t('operation.dkgs') }}
            </template>
            <template #subtitle>
              {{ t('strategy.ipsubtit') }}
            </template>
          </rule-textarea-no-form>
        </a-form-item>
        <!-- 监控文件 end -->
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ValidateIpName } from '@/utils/reg';
  import { preendTrim } from '@/utils/tools';
  import { Form } from 'ant-design-vue';
  import { reactive } from 'vue';
  import ruleTextareaNoForm, { validateIpDRegs } from '@/components/ruleTextareaNoForm';
  import { useI18n } from 'vue-i18n';
  import { E_Show_Ip } from '../../type';
  const props = defineProps<{
    id: E_Show_Ip;
  }>();
  const { t } = useI18n();
  const formData = reactive<any>({
    name: '',
    [props.id === E_Show_Ip.Custom ? 'ip' : 'net']: [],
  });
  const staticConfig =
    props.id === E_Show_Ip.Network
      ? {
          placeholder: t('strategy.netnmplac') + '\nvirbr \nbond0 \nbond1',
          max: 3000,
          title: t('strategy.netnm'),
          subTitle: t('strategy.netnmsub'),
          fileName: t('operation.zjdkfs2'),
        }
      : {
          placeholder:
            t('strategy.ipsubtitbt') + '\n192.168.1.0 \n192.168.1.0/24 \n192.168.1.0-192.168.1.20',
          max: 3000,
          fileName: t('operation.zdjkfs'),
          subTitle: t('strategy.ipsubtit'),
        };

  //textarea行数正则函数
  const validateRows = () => {
    if (preendTrim(formData[props.id === E_Show_Ip.Custom ? 'ip' : 'net']).length <= 3000) {
      return Promise.resolve();
    }
    return Promise.reject();
  };
  //表单hook
  const useForm = Form.useForm;
  const rulesRef = reactive({
    name: [
      {
        validator: ValidateIpName,
        message: t('operation.sjhfser'),
      },
    ],
    [props.id === E_Show_Ip.Custom ? 'ip' : 'net']: [
      {
        validator: validateRows,
        message: t('strategy.ccMax'),
      },
      props.id === E_Show_Ip.Custom
        ? {
            validator: validateIpDRegs,
            message: t('strategy.pipIpr'),
          }
        : {
            required: false,
          },
    ],
  });
  const { validate, validateInfos } = useForm(formData, rulesRef);
  defineExpose({ validate, formData });
</script>

<style scoped lang="less">
  .customForm {
    :deep(.content) {
      padding: 0;
    }
  }
  .label {
    font-size: @fz13;
    font-weight: 600;
    /* Font/黑0.8 */
    color: rgba(0, 0, 0, 0.8);
  }
</style>
